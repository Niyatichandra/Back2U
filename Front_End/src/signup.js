import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signup.css'; // Import the corrected CSS file

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@banasthali\.in$/.test(form.email)) {
      newErrors.email = "Only @banasthali.in email allowed";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(form.password)) {
      newErrors.password = "Password must be 8+ chars (Upper, Lower, Number, Special)";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registration Successful! Please login. ✅");
          navigate("/login");
        } else {
          alert(data.message || "Registration Failed ❌");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="avatar-container">
          <img src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png" alt="avatar" />
        </div>
        <h1>Create Account</h1>
        <p className="subtitle">Start your Journey</p>

        <form onSubmit={handleSignup}>
          
          {/* FULL NAME FIELD */}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">👤</span>
              <span className="label-text">Full Name</span>
            </div>
            <div className="input-wrapper">
              <input 
                name="name" 
                placeholder="Ex: Anjali Sharma"
                value={form.name}
                onChange={handleChange} 
              />
            </div>
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* EMAIL FIELD */}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">✉</span>
              <span className="label-text">Banasthali Email</span>
            </div>
            <div className="input-wrapper">
              <input 
                name="email" 
                placeholder="user@banasthali.in"
                value={form.email}
                onChange={handleChange} 
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* PASSWORD FIELD */}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">🔒</span>
              <span className="label-text">Password</span>
            </div>
            <div className="input-wrapper">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? "✕" : "👁"}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="input-group">
            <div className="label-icon-row">
              <span className="input-icon">🔒</span>
              <span className="label-text">Confirm Password</span>
            </div>
            <div className="input-wrapper">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span className="eye-toggle" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                {showConfirmPass ? "✕" : "👁"}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>

        <div className="footer-separator"></div>

        <Link to="/getstarted" className="back-home-footer">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}