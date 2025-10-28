import React from "react";
import "../styles/Login.css";
import BPCLogo from "../assets/BPCLogo.png";
import HRSLogo from "../assets/HRSLogo.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
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

          <form className="login-form">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
