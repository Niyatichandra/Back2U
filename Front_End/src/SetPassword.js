import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './password.css';

function App() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);//modal control state 
  const [showPassword, setShowPassword] = useState(false); //Toggle Password visibility state

  const handleUpdatePassword = async () => {
    // 1. Check if fields are empty
    if (password === "" || confirmPassword === "") {
      setMessage("Please fill all fields!");
      setIsError(true);
      return;
    }

    // 2. Comprehensive Password Validation (8+ chars, upper, lower, digit, special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setMessage("Password must be 8+ chars with uppercase, lowercase, number, and special char!");
      setIsError(true);
      return;
    }

    // 3. Match passwords logic
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    } 

    try {
      const res = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage("");
        setShowSuccessModal(true);

        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Error ❌");
        setIsError(true);
      }

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong ❌");
      setIsError(true);
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <h2 style={{ marginTop: "-10px", marginBottom: "20px" }}>SET NEW PASSWORD</h2>
        
        {/* New Password Input */}
        <div className="input-group">
          <label htmlFor="password">Enter New Password</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} // Type toggle karein
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="eye-toggle-btn"
              onClick={() => setShowPassword(!showPassword)} // Toggle function
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Confirm Password Input Group */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="send-btn" onClick={handleUpdatePassword}>
          Update Password
        </button>

        {message && (
          <p className={`status-message ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}
      </div>
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <FontAwesomeIcon icon={faCheckCircle} className="success-check-icon" />
            <h2>Success!</h2>
            <p>Your password has been updated successfully.</p>
            <button 
              className="modal-ok-btn" 
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/login");   
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
