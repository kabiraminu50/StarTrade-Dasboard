import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        username,
        password,        
      });

       console.log(res.data);
      const token = res.data.token; // or res.data.accessToken
      localStorage.setItem("token", token);

      navigate("/dashboard");
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

          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
