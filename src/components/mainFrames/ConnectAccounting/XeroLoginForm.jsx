import React from "react";
import xero from "../../assets/Images/companies_logo/Xero.svg";

const XeroLoginForm = ({ onClose, onSubmit, softwareName,softwareIcon }) => {
  return (
    <div className="xero-login-overlay">
      <div className="xero-login-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="xero-login-header">
          <img src={softwareIcon} alt="Xero Logo" />
          <h2>Log in to {softwareName}</h2>
        </div>

          <div className="feedback-experience">
          <div className="xero-info-banner">
            <span className="info-text">You're using the new Xero login experience</span>
            <a href="#" className="learn-more">Learn more</a>
          </div>

          <div className="xero-info-banner">
            <span className="info-text">Supporting our customers during Covid-19</span>
            <a href="#" className="learn-more">Learn more</a>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <input type="email" placeholder="email@example.com" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="login-btn">Log in</button>

          <div className="xero-login-footer">
            <a href="#">Forgot password?</a>
            <a href="#">Can’t log in?</a>
          </div>
        </form>

        <div className="xero-footer-nav">
          <a href="#">Security noticeboard</a>
          <a href="#">Terms of use</a>
          <a href="#">Privacy</a>
          <a href="#">Help Center</a>
          <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default XeroLoginForm;
