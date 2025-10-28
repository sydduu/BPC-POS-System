import React, { useState } from "react";
import "../styles/Login.css";
import HRSLogo from "../assets/HRSLogo.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password)
      return setError("Please enter email and password");
    setLoading(true);
    try {
      // Resolve API base in development: prefer VITE_API_BASE if set.
      // Otherwise, when running in Vite dev mode or loading the page from file://,
      // call backend directly at http://localhost:3001 so the dev proxy is not required.
      const isDevMode = import.meta?.env?.MODE === "development";
      const isLocalHostName = ["localhost", "127.0.0.1"].includes(
        window.location.hostname
      );
      const isFileProtocol = window.location.protocol === "file:";
      const API_BASE =
        import.meta?.env?.VITE_API_BASE ||
        (isDevMode || isLocalHostName || isFileProtocol
          ? "http://localhost:3001"
          : "");

      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      if (!res.ok)
        throw new Error(data.error || `Login failed (status ${res.status})`);

      // save token and redirect
      if (data.token) localStorage.setItem("token", data.token);
      // optional: save user
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src={HRSLogo} alt="BPC Logo" className="login-logo" />
        </div>

        <div className="login-right">
          <h2>BPC HOTEL & RESTAURANT</h2>
          <p className="subtitle">BOOKING AND POS SYSTEM</p>

          <div className="tabs">
            <button className="tab active">Login</button>
            <button className="tab" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
