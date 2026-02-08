import { useEffect, useState } from "react";
import axios from "axios";
import "./viewAllGoods.css";

const ViewAllGoods = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



    const fetchGoods = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token",token)

        const res = await axios.get(
          "http://localhost:8000/api/v1/item/getallitems",
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                },
              }
            : {}
        );

        setGoods(res.data?.items || []);
        console.log("API-res",res.data)
      } catch (err) {
        console.error(err);
        setError("Failed to load goods. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("token");
console.log("TOKEN FROM STORAGE:", token);



  useEffect(() => {

    fetchGoods();
  }, []);

  if (loading) return <p>Loading goods...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="goods-container">
      <h2>Available Goods</h2>

      {goods.length === 0 ? (
        <p>No goods available</p>
      ) : (
        goods.map((item) => (
          <div className="goods-card" key={item._id}>
            <h3>{item.name}</h3>
            <p>₦{item.price}</p>
            <p>Qty: {item.stock}</p>
            <small>{item.description}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAllGoods;
