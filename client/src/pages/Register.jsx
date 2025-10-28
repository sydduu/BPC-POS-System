import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.css";
import HRSLogo from "../assets/HRSLogo.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.password) {
      setError("Please fill required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      // Some responses may be empty (no JSON). Safely parse if possible.
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }

      if (!res.ok)
        throw new Error(
          data.error || `Registration failed (status ${res.status})`
        );
      // success: redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <img src={HRSLogo} alt="BPC Logo" className="register-logo" />
        </div>

        <div className="register-right">
          <h2>BPC HOTEL & RESTAURANT</h2>
          <p className="subtitle">BOOKING AND POS SYSTEM</p>

          <div className="tabs">
            <button className="tab" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="tab active">Sign Up</button>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
            />

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

            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Re-enter your password"
            />

            <label>Select Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
