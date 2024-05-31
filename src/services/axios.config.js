import axios from "axios";

const dataServer = axios.create({
  baseURL: process.env.REACT_APP_IDENTITY_URL,
  timeout: 100000,
  headers: {
    "X-CSRF": 1,
  },
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
});

// dataServer.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
//   return config
// })
dataServer.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("AXIOS CONFIG ERROR ... ", error);
    const { status } = error.response;
    if (status === 401) {
      document.cookie = "idsrv.session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.replace("/login");
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export { dataServer };
