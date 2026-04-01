import React, { useState } from 'react';
import './password.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSendLink = async () => {
    if (email.trim() === "") {
      setMessage("Please enter your email!");
      setIsError(true);
      return;
    }

    if (!email.toLowerCase().endsWith("@banasthali.in")) {
      setMessage("Please enter valid Banasthali email");
      setIsError(true);
      return;   
    }

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reset link sent to your email 📧");
        setIsError(false);
        setEmail("");
      } else {
        setMessage(data.message || "Error sending email ❌");
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