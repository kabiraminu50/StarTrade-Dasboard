import React, { useEffect, useState } from "react";
import "./UpdateItem.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateItem() {
  const { id } = useParams(); // ✅ get item ID from URL

  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    stock: "",
    unitType: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ✅ Fetch item data
  useEffect(() => {
    if (!id) return;
    fetchItemById();
  }, [id]);

  const fetchItemById = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/api/v1/item/findoneitem/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      

      // adjust depending on backend response structure
      const item = res.data.item

      setFormData({
        itemName: item.itemName || "",
        price: item.price || "",
        description: item.description || "",
        stock: item.stock || "",
        unitType: item.unitType || "",
      });

      setPreview(item.image);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await axios.put(
        `http://localhost:8000/api/v1/item/updateitem/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Item updated successfully");
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="mainCon-updateItem">
      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Item Name"
        />

        {/* ✅ FIXED: NO MORE item.map ERROR */}
        <label>Unit Type</label>
        <select
          name="unitType"
          value={formData.unitType}
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

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <label>Item Image</label>
        <input type="file" onChange={handleImageChange} />

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

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Item Description"
        />

        <button disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateItem;