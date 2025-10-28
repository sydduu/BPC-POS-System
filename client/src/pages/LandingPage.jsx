import React from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-logo" aria-hidden>
          {/* simple hotel/building SVG icon */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-svg"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              fill="currentColor"
            />
            <path
              d="M7 9h2v2H7zM11 9h2v2h-2zM15 9h2v2h-2zM7 13h2v2H7zM11 13h2v2h-2z"
              fill="#fff"
            />
            <path
              d="M9 17h6"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="landing-title">BPC Hotel</h1>

        <p className="landing-subtitle">
          Complete Booking &amp; POS Management System
        </p>

        <div className="landing-actions">
          <a className="btn btn-primary" href="/get-started">
            Get Started
          </a>
          <a className="btn btn-ghost" href="/login">
            Login
          </a>
        </div>

        <p className="landing-credits">
          Bulacan Polytechnic College
          <br />
          Hospitality Industry Department
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
