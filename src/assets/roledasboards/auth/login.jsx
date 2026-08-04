import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import {roleRedirect} from "../utils/roleRedirect"


const Login = () => {
  const navigate = useNavigate();

  const [phoneNumber,setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        phoneNumber,
        password,        
      });

       
     console.log(res.data);

const token = res.data.token;

localStorage.setItem("token", token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

const role = res.data.user.role;

      navigate(roleRedirect(role));
    } catch (err) {
      setError("Login failed. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-con">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
            Log In
          </h2>

          {error && <p className="error">{error}</p>}
       <label>PHONE NUMBER</label>
          <input
            type="text"
            placeholder="PHONE NUMBER"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label >PASSWORD</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
