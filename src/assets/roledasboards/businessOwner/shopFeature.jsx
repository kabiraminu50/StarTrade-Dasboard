import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shopfeature.css";

export default function ShopFeature() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    unitType: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingShops, setFetchingShops] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (!token) return;

        const res = await axios.get("http://localhost:8000/api/v1/shop/getshopbyuserid", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setShops(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingShops(false);
      }
    };

    fetchShops();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedShop) {
      return alert("Please select a shop");
    }

    if (!image) {
      return alert("Please upload an image");
    }

    setLoading(true);

    try {
     const formData = new FormData();

formData.append("itemName", form.name);
formData.append("price", form.price);
formData.append("stock", form.stock);
formData.append("description", form.description);
formData.append("shopId", selectedShop);
formData.append("image", image);
formData.append("unitType", form.unitType);
      await axios.post("http://localhost:8000/api/v1/item/additem", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        
      });

      alert("Item added successfully");

      setForm({ name: "", price: "", stock: "", description: "",unitType:"" });
      setImage(null);
      setPreview(null);
      setSelectedShop("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Add Item</h2>

        {fetchingShops ? (
          <p>Loading shops...</p>
        ) : shops.length === 0 ? (
          <p>You don’t have any shops yet.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <select
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
              required
            >
              <option value="">Select Shop</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.ShopName}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <select
          name="unitType"
          value={form.unitType}
          onChange={handleChange}
          className="option-btn"
        >
          <option value="">Select Unit</option>
          <option value="piece">piece</option>
          <option value="carton">carton</option>
          <option value="kg">Kg</option>
          <option value="Yard">yard</option>
          <option value="meter">meter</option>
          <option value="Pack">pack</option>
        </select>


            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              />
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}