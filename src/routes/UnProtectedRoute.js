import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import AuthContext from "../context/auth/AuthContext";

export default function UnProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}
