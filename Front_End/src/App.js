import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './home';
import LostItem from './lostitem';
import FoundItem from './founditem';
import AboutUs from './aboutus'; 
import Help from './help';   
import Login from './login';   
import Signup from './signup'; 
import GetStarted from './getstarted';
import MyProfile from './myprofile'; 
import ForgotPassword from './forgotpassword'; // ADDED THIS IMPORT
import './App.css';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation(); 
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&display=swap');
            body, * { font-family: 'Roboto Slab', serif; margin: 0; padding: 0; box-sizing: border-box; }
          `}
        </style>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* ADDED THIS ROUTE (Accessible to everyone) */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />

          {/* Protected Routes (Require Login) */}
          <Route 
            path="/lost" 
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><LostItem /></ProtectedRoute>} 
          />
          <Route 
            path="/found" 
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><FoundItem /></ProtectedRoute>} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyProfile setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}