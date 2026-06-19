import { useEffect, useState } from "react";
import axios from "axios";
import "./viewAllGoods.css";
import { useNavigate } from "react-router-dom";

const ViewAllGoods = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navigate = useNavigate();

 
  const fetchGoods = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const res = await axios.get(
        "http://localhost:8000/api/v1/item/getallitems",
        config
      );

      setGoods(res.data?.items || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load goods. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoods();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Loading goods...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

// comfirm delete






//delete item logic 
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  // stop if user clicks Cancel
  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8000/api/v1/item/deleteitem/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // remove deleted item from UI
    setGoods(prev =>
      prev.filter(item => item._id !== id)
    );

    alert("Item deleted successfully");

  } catch (err) {
    console.log(err);
    alert("Failed to delete item");
  }
};



  return (
    <div className="goods-page">
      <div className="goods-header">
        <h2>Available Goods</h2>
        <p>Browse items from different shops</p>
      </div>

      {goods.length === 0 ? (
        <p style={{ color: "#fff" }}>No goods available</p>
      ) : (
        <div className="goods-grid">
          {goods.map((item) => (
            <div className="goods-card" key={item._id}>
              <img
                src={item.image}
                alt={item.itemName}
                className="goods-image"
              />

              <div className="goods-info">
                <h3 className="goods-name">{item.itemName}</h3>
                <p className="unitType">{item.unitType}</p>
              
                <p className="goods-shop">
                  {item?.shop?.ShopName || "Shop"}
                </p>
                <p className="goods-description">{item?.description.toLowerCase()}</p>
              </div>

              <div className="goods-footer">
                <span className="goods-price">₦{item.price.toLocaleString('en-US')}</span>
                <button className="delete-btn"
                onClick={() => handleDelete(item._id)}
                disabled={loading}
                >delete</button>

                <button className="edit-btn" onClick={()=>(navigate(`/update-item/${item._id}`))}>Edit</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllGoods;