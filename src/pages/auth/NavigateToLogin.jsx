import React from "react";
import { Navigate } from "react-router-dom";

const NavigateToLogin = () => {
  return <Navigate to="/login" />;
  // return <Navigate to="/bff/login" />;
};

export default NavigateToLogin;
