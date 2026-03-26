import React, { useState } from 'react';
import './password.css'; // Make sure this file has the App and App-container styles

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSendLink = () => {
    if (email.trim() === "") {
      setMessage("Please enter your email!");
      setIsError(true);
      return;
    }
  
    if (!email.toLowerCase().endsWith("@banasthali.in")) {
      setMessage("Please Enter Valid mail");
      setIsError(true);
    } else {
      setMessage("Email Sent!");
      setIsError(false);
      setEmail(""); 
    }
  };

  return (
    <div className="App">
        <div className="App-container">
          <h2>RESET PASSWORD</h2>
          
          <div className="input-group">
            <label htmlFor="email">Type your email</label>
            <input 
              type="email" 
              id="email"
              placeholder="example@banasthali.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="send-btn" onClick={handleSendLink}>Send Link</button>

          {message && (
            <p className={`status-message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}
        </div>
    </div>
  );
}

export default ForgotPassword;