import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import AuthContext from "../context/auth/AuthContext";

export default function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import AuthContext from '../context/auth/AuthContext';

// const ProtectedRoute = () => {
//   const { isAuthenticated } = React.useContext(AuthContext);
// console.log(isAuthenticated, 'djfsdfjk')
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
