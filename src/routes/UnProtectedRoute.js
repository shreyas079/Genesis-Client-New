import { Navigate, Outlet } from "react-router-dom";
import  {useEffect, useContext} from "react";
import AuthContext from "../context/auth/AuthContext";

export default function UnProtectedRoute({ element: Component, ...rest }) {
  // const { isAuthenticated } = useContext(AuthContext);
  // useEffect(() => {
  //   console.log("isAuthenticated changed:", isAuthenticated);
  // }, [isAuthenticated]); // Add isAuthenticated to the dependency array

  const token = localStorage.getItem('token');
  return token ? <Navigate to="/homepage" /> : <Outlet />;
}
