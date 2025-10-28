import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.css";
import HRSLogo from "../assets/HRSLogo.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left side with logo */}
        <div className="register-left">
          <img src={HRSLogo} alt="BPC Logo" className="register-logo" />
        </div>

        {/* Right side form */}
        <div className="register-right">
          <h2>BPC HOTEL & RESTAURANT</h2>
          <p className="subtitle">BOOKING AND POS SYSTEM</p>

          <div className="tabs">
            <button className="tab" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="tab active">Sign Up</button>
          </div>

          <form className="register-form">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />

            <label>Username</label>
            <input type="text" placeholder="Enter your username" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" />

            <label>Select Role</label>
            <select>
              <option>Choose your role</option>
              <option>Guest</option>
              <option>User</option>
              <option>Admin</option>
            </select>

            <button type="submit" className="register-btn">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
