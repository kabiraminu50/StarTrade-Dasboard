import React, { useState, useEffect } from "react";
import "./addShop.css";
import axios from "axios";

const AddShop = () => {
  // SIMPLE STATES (one per input)
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =============================
     FETCH STATES
  ============================== */
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get(
          "https://nga-states-lga.onrender.com/fetch"
        );
        setStates(res.data);
      } catch (err) {
        console.error("Failed to fetch states", err);
      }
    };

    fetchStates();
  }, []);

  /* =============================
     HANDLE STATE CHANGE
  ============================== */
  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setLga("");
    setLgas([]);

    try {
      const res = await axios.get(
        `https://nga-states-lga.onrender.com/?state=${selectedState}`
      );
      setLgas(res.data);
    } catch (err) {
      console.error("Failed to fetch LGAs", err);
    }
  };

  /* =============================
     SUBMIT SHOP
  ============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      ShopName: shopName,
      businessPhoneNumber: phoneNumber,
      imageUrl,
      ShopAddress: {
        state,
        LGA: lga,
        streetAddress,
      },
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.post(
        "http://localhost:8000/api/v1/shop/addshop",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Shop created successfully!");

      // RESET FORM
      setShopName("");
      setPhoneNumber("");
      setImageUrl("");
      setState("");
      setLga("");
      setStreetAddress("");
      setLgas([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add shop");
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     JSX (STYLES UNCHANGED)
  ============================== */
  return (
    <div className="add-shop-page">
      <div className="add-shop-card">
        <h2 className="title">Add New Shop</h2>
        <p className="subtitle">
          Create a business outlet linked to your wallet
        </p>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit} className="shop-form">
          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <select value={state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>LGA</label>
            <select
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              required
              disabled={!lgas.length}
            >
              <option value="">Select LGA</option>
              {lgas.map((lg) => (
                <option key={lg} value={lg}>
                  {lg}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Shop Image URL (optional)</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShop;
