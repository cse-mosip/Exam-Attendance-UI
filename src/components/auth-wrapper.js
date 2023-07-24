// AuthWrapper.js

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Assuming you have a library like jwt-decode to decode JWT tokens
import { Box, CircularProgress } from "@mui/material";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the token is available in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Perform client-side validation checks on the token
      try {
        const decodedToken = jwt_decode(token); // Decode JWT token
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
        } else {
          // Token is valid and not expired
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token is invalid
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false); // Token validation is complete, set isLoading to false
  }, []);

  if (isLoading) {
    // You can show a loading spinner or some other loading indicator while checking the token validity
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return children;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;
