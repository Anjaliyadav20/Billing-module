import React, { useState } from 'react';

import google from "../../assets/Images/Google.svg";
import microsoft from "../../assets/Images/microsoft.svg";
import EmailVerificationDemo from './EmailVerification';


const EmailLogin = ({ onNext, onStepComplete }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const isPasswordComplete = password.length > 0;
    
    // const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();
    // Plug in your auth logic here
    console.log("Login submitted:", {
      firstName,
      lastName,
      email,
      password,
    });

    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <EmailVerificationDemo onNext={onNext} onStepComplete={onStepComplete} />
    );
  }
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("https://billing-api-sandbox.quotech.ai/api/auth/google/");
      const data = await response.json();
      if (data?.auth_url) {
        window.location.href = data.auth_url;
      } else {
        console.error("No auth_url returned");
      }
    } catch (err) {
      console.error("Google SSO failed:", err);
    }
  };
  const handlemicrosoftLogin = async () => {
    try {
      const response = await fetch("https://billing-api-sandbox.quotech.ai/api/auth/microsoft/");
      const data = await response.json();
      if (data?.auth_url) {
        window.location.href = data.auth_url;
      } else {
        console.error("No auth_url returned");
      }
    } catch (err) {
      console.error("Google SSO failed:", err);
    }
  };
  
    return (
        <div className="login-container">
            <div className='login-container-inner'>
                <h5 className="step">STEP 1 OF 5</h5>
                <h2 className="title">Login into your account</h2>
                <p className="subtitle">
                Enter your name, email address, and password to log in
                </p>
        
                <div className="social-buttons">
                <button
                    className="social-btn google"
                    onClick={handleGoogleLogin}
                >
                    <img src={google} alt="Google logo" />
                    Continue with Google
                </button>
                <button className="social-btn microsoft" onClick={handlemicrosoftLogin}>
                    <img src={microsoft} alt="Microsoft logo" />
                    Continue with Microsoft
                </button>
                </div>
        
                <div className="divider">OR</div>

                <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>

                <label>First Name</label>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field"
                    required
                />
        
                <label>Last Name</label>
                <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field"
                    required
                />
        
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                />
        
                <label>Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
        
                <button
                    type="submit"
                    className="login-btn"
                    disabled={!isPasswordComplete}
                >
                    Login
                </button>
                </form>
            </div>
      </div>
    );
};

export default EmailLogin;
