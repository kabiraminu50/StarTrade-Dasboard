import React, { useState } from "react";
import "./addShop.css";

const AddShop = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shop Data:", formData);
  };

  return (
    <div className="add-shop-page">
      <div className="add-shop-card">
        <h2 className="title">Add New Shop</h2>
        <p className="subtitle">
          Create a business outlet linked to your wallet
        </p>

        <form onSubmit={handleSubmit} className="shop-form">
          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Shop Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Shop
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
