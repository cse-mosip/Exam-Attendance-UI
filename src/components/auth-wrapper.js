// AuthWrapper.js

import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return children;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;
