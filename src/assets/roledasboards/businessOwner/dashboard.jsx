import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchProf = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/prof",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.profile.reservedAccount);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProf();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      {/* ================= TOP NAVBAR ================= */}
      <header className="navbar">
        <h1 className="logo">RamsaPay</h1>

        <button
          className="wallet-btn"
          onClick={() => navigate("/add-shop")}
        >
          Order
        </button>
      </header>

      {/* ================= BALANCE CARD ================= */}
      <section className="balance-card">
        <div className="walletdetails">
          <section className="balance-part">
            <p className="balance-label">Total Balance</p>
            <h2 className="balance-amount">
              ₦{data?.availableBalance}
            </h2>
          </section>

          <section className="account-num-part">
            <p className="account-number">{data?.accountNumber}</p>
            <h2 className="bank-name">{data?.bankName}</h2>
            <h2 className="account-name">{data?.accountName}</h2>
          </section>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="actions">
          <button
            className="action-btn"
            onClick={() => navigate("/transfer")}
          >
            Transfer
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="market">
        <h3>Services</h3>

        <div className="market-cards">
          <div className="market-card">
            <div className="card-header">
              <span className="card-icon">🏪</span>
              <h4>BO Shop</h4>
            </div>
            <p className="card-desc">
              Manage your business outlet, track sales and payments.
            </p>
            <button
              className="card-btn"
              onClick={() => navigate("/shop-feature")}
            >
              Shop
            </button>
          </div>

          <div className="market-card">
            <div className="card-header">
              <span className="card-icon">📦</span>
              <h4>Goods</h4>
            </div>
            <p className="card-desc">
              View available goods, pricing, and inventory records.
            </p>
            <button
              className="card-btn"
              onClick={() => navigate("/view-all-goods")}
            >
              View Goods
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
