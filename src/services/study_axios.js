import axios from "axios";

const studyServer = axios.create({
  baseURL: process.env.REACT_APP_STUDY_API_URL,
  timeout: 100000,
  headers: {
    "X-CSRF": 1,
  },
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
});

// studyServer.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
//   return config
// })
studyServer.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      window.location.replace = "/login";
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);

export { studyServer };
