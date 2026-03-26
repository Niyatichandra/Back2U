import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();

  // Console log lagayein check karne ke liye ki render ho raha hai ya nahi
  console.log("Checking Protection - LoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    // User logged in nahi hai, toh login page pe bhejo
    // 'state' pass karne se login ke baad wapas isi page par aa payenge
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;