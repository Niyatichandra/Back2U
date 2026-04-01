import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css'; 

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errors, setErrors] = useState({}); //eg "string is required"
  const [showSuccessModal, setShowSuccessModal] = useState(false); //to show "Login successful" popup
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";
//password validation
  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@banasthali\.in$/.test(email)) {
      newErrors.email = "Only @banasthali.in email allowed";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
      newErrors.password = "Password must be 8+ chars (Upper, Lower, Number, Special)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
//login process
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('userEmail', email);
          setShowSuccessModal(true); 
          
          if (onLoginSuccess) {
            onLoginSuccess(); 
          }
        } else {
          alert(data.message || "Invalid Credentials");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong ❌");
      }
    }
  };
//post login navigation
  const handleModalClose = () => {
    setShowSuccessModal(false);
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      window.location.href = redirect;
    } else {
      navigate("/home"); //default (send to home)
    }
  };

  return (
    <div className="login-container">
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">✅</div>
            <h2>Login Successful!</h2>
            <p>Welcome back! You have logged in successfully.</p>
            <button className="modal-button" onClick={handleModalClose}>
              Go to Homepage
            </button>
          </div>
        </div>
      )}
      <div className="login-card">
        <div className="profile-icon-container">👤</div>
        <h1>Login</h1>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          {/*email input*/}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">👤</span>
              <span className="label-text">USERNAME / EMAIL</span>
            </div>
            <div className="input-box">
              <input
                id="email"
                className="input-field"
                type="text"
                placeholder="username@banasthali.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/*password input*/}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">🔒</span>
              <span className="label-text">PASSWORD</span>
            </div>
            <div className="input-box">
              <input
                id="pass"
                className="input-field"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '45px' }} 
              />
              <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "✕" : "👁"}
              </div>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="forgot-link-container">
            <Link to="/forgot-password" title="Reset your password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button className="login-button" type="submit">Log In</button>
        </form>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup" className="signup-link" title="Register yourself">Sign up</Link>
        </p>
        
        <div className="footer-separator"></div>
        
        <Link to="/getstarted" className="back-home">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}