import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();
  console.log("Checking Protection - LoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    //if user is not logged in, then send him to the login page. 'State' helps user return to the desired page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;