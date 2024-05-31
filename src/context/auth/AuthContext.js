import { createContext, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";

import Cookies from "js-cookie";

import { getUserInfo } from "../../services/auth_apis";
import { logoutUser } from "../../services/auth_apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    loginUser: [],
    getToken: [],
    userInfo: [],
    isAuthenticated: false,
    load: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // Set Is Auth
  const isAuthState = () => dispatch({ type: "SET_AUTH" });

  const setAuthenticationTrue = () => {
    // isAuthState();
    const checkCookie = Cookies.get("idsrv.session");
    if (checkCookie) {
      isAuthState();
    }
  };

  const getUserLoggedIn = async () => {
    try {
      setLoading();
      const res = await getUserInfo();
      if (res.status) {
        dispatch({ type: "SET_USER_INFO", payload: res.data });
        disableLoading();
      }
    } catch (err) {
      console.log("Error: ", err);
      disableLoading();
    }
  };

  const setLogoutUser = async () => {
    try {
      setLoading();
      const res = await logoutUser();
      if (res.status === 200) {
        Cookies.remove(".AspNetCore.Antiforgery.iGiImT82Iso");
        Cookies.remove(".AspNetCore.Identity.Application");
        Cookies.remove(".AspNetCore.Session");
        Cookies.remove("idsrv.session");
        localStorage.removeItem("accessToken");
        dispatch({ type: "LOGOUT_USER" });
        disableLoading();
      }
    } catch (err) {
      console.log("Error: ", err.message);
      disableLoading();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        load: state.load,
        loginUser: state.loginUser,
        getToken: state.getToken,
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
        setLoading,
        disableLoading,
        isAuthState,
        setLogoutUser,
        getUserLoggedIn,
        setAuthenticationTrue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
