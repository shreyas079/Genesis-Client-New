import React, { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import authReducer, { initialValues } from "./AuthReducer";

const AuthContext = createContext({
  state: initialValues,
  dispatch: undefined,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialValues);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedData = JSON.parse(atob(token.split(".")[1]));
      dispatch({
        type: "LOGIN",
        payload: { token, email: parsedData.email },
      });
    }
  }, []);

  useEffect(() => {
    const { token } = state;
    if (token && typeof token === "string") {
      try {
        const decodedJwt = JSON.parse(atob(token.split(".")[1]));
        console.log(decodedJwt, 'atobkdkdkk')
        const leftExp = Math.floor(decodedJwt.exp * 1000 - Date.now());
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch({ type: "LOGOUT" });
        } else {
          setTimeout(() => {
            toast.warning("Session Expired!");
            dispatch({ type: "LOGOUT" });
          }, leftExp);
        }
      } catch (error) {
        console.error("Invalid token format", error);
        dispatch({ type: "LOGOUT" });
      }
    }
  }, [state.token]);

  const isAuthenticated = state.token ? true : false;

  return (
    <AuthContext.Provider value={{ state, dispatch, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
