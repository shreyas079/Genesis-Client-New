import axios from "axios";
import qs from "qs";

const accessToken = localStorage.getItem("accessToken");

export const getAuthCode = () => {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: `${process.env.REACT_APP_IDENTITY_URL}/connect/authorize?response_type=code&code_challenge_method=S256&client_id=genesis&scope=genesis openid profile&state=openid profile email genesis&code_challenge=0MOh0oV48hFxLpXTH4U4_QDxEbrWJxT-eeTNTHRsBKA&redirect_uri=${process.env.REACT_APP_FRONT_URL}/get-token`,
        method: "get",
        baseURL: `${process.env.REACT_APP_IDENTITY_URL}/`,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getToken = (data) => {
  var newData = qs.stringify({
    grant_type: "authorization_code",
    client_id: "genesis",
    code: `${data}`,
    redirect_uri: `${process.env.REACT_APP_FRONT_URL}/get-token`,
    client_secret: "secret",
    code_verifier: "myserver123myserver123myserver123myserver123",
  });

  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "connect/token",
        method: "post",
        baseURL: `${process.env.REACT_APP_IDENTITY_URL}/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: newData,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getUserInfo = () => {
  const token = localStorage.getItem("accessToken");
  var newData = qs.stringify({
    scope: "openid",
  });
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "connect/userinfo",
        method: "get",
        baseURL: `${process.env.REACT_APP_IDENTITY_URL}/`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: newData,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const logoutUser = () => {
  const token = localStorage.getItem("accessToken");
  // var newData = qs.stringify({
  //   id_token_hint: token,
  //   post_logout_redirect_uri: "https://localhost:3000/signout-callback-oidc",
  // });
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "connect/endsession",
        method: "get",
        baseURL: `${process.env.REACT_APP_IDENTITY_URL}/`,
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        // data: newData,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
