import React from "react";
import { Route } from "react-router-dom";
import ResetPassword from "../pages/auth/ResetPassword";
import Notification from "../pages/auth/Notification";
import RegisterPhone from "../pages/auth/RegisterPhone";
import IdentityLogin from "../pages/auth/IdentityLogin";
import PrivacyPolicy from "../pages/auth/PrivacyPolicy";
import SignInOidc from "../pages/admin/Homepage/SignInOidc";
import LoginResponse from "../pages/auth/LoginResponse";
import Login from "../pages/auth/Login"

const AuthRoutes = [
  //   { path: "/login", element: <IdentityLogin /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/password-sent", element: <Notification /> },
  { path: "/register-phone", element: <RegisterPhone /> },
  //   { path: "/get-token", element: <SignInOidc /> },
  { path: "/privacy-profile", element: <PrivacyPolicy showLogo={true} /> },
  //   { path: "/res/callback", element: <LoginResponse /> },
];

export default AuthRoutes;
