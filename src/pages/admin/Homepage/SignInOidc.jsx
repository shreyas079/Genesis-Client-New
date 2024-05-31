import React from "react";
import AuthContext from "../../../context/auth/AuthContext";

import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader";

import { getToken } from "../../../services/auth_apis";

const SignInOidc = () => {
  const {
    load,
    loginUser,
    isAuthenticated,
    setLoading,
    disableLoading,
    isAuthState,
    // getTokenDispatch,
  } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [searchparams] = useSearchParams();
  const tokenCode = searchparams.get("code");

  const [tokenInfo, setTokenInfo] = React.useState(null);

  const getIdentityToken = async (tokenCode) => {
    try {
      setLoading();
      const res = await getToken(tokenCode);
      if (res.status === 200) {
        isAuthState();
        // getTokenDispatch(res.data?.access_token);
      }
    } catch (err) {
      console.log("Error: ", err.message);
      disableLoading();
    }
  };

  const getIdentityTokenAfterLoad = async (tokenCode) => {
    try {
      setLoading();
      const res = await getToken(tokenCode);
      if (res.status === 200) {
        isAuthState();
        dispatch({ type: "GET_TOKEN", payload: res.data });
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    getIdentityToken(tokenCode);
  }, [tokenCode]);

  return (
    <>
      {load ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#3661eb" />
          </div>
        </>
      )}
    </>
  );
};

export default SignInOidc;
