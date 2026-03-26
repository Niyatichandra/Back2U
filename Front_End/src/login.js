import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css'; 

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
          alert("Login Successful! ✅");
          if (onLoginSuccess) {
            onLoginSuccess(); 
          }
          navigate(from, { replace: true }); 
        } else {
          alert(data.message || "Invalid Credentials");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="profile-icon-container">👤</div>
        <h1>Login</h1>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          
          {/* EMAIL INPUT SECTION */}
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

          {/* PASSWORD INPUT SECTION */}
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
          Don’t have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
        
        <div className="footer-separator"></div>
        
        <Link to="/getstarted" className="back-home">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}