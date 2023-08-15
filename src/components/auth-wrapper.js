import React, { useEffect, useState } from "react";
import SupervisorLoginPage from "../pages/supervisor-login-page";
import { useAppContext } from "../context/appContext";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { token } = useAppContext();

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  if (isAuthenticated) {
    return children;
  } else {
    return <SupervisorLoginPage />;
  }
};

export default AuthWrapper;
