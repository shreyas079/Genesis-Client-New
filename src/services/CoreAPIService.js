import axios from 'axios';

// Placeholder for the checkAccessToken function
// const checkAccessToken = () => {
//   // Mock implementation of checkAccessToken function
//   // Replace this with your actual implementation
//   return localStorage.getItem('accessToken');
// };

const setAuthorizationHeader = (config) => {
  if (typeof window !== 'undefined') {
    // const accessToken = checkAccessToken(); // Call the function to get the access token
    // if (accessToken) {
    //   config.headers.Authorization = accessToken;
    // }
  }
  return config;
};

axios.interceptors.request.use(setAuthorizationHeader, (error) => {
  return Promise.reject(error);
});

const responseData = (response) => response.data;

const handleAxiosError = (error) => {
  console.error('An error occurred:', error);
  // Uncomment this block when implementing authentication
  // if (error?.response?.status == 403 || error?.response?.status == 401) {
  //   localStorage.removeItem('tradible');
  //   window.location.href = '/login';
  // }
  throw error;
};

class CoreAPIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get = async (url, params = {}) =>
    axios.get(`${this.baseUrl}${url}`, { params }).then(responseData).catch(handleAxiosError);

  post = async (url, data = {}, config = {}) =>
    axios.post(`${this.baseUrl}${url}`, data, config).then(responseData).catch(handleAxiosError);

  put = async (url, data = {}, config = {}) =>
    axios.put(`${this.baseUrl}${url}`, data, config).then(responseData).catch(handleAxiosError);

  patch = async (url, data = {}) =>
    axios.patch(`${this.baseUrl}${url}`, data).then(responseData).catch(handleAxiosError);

  delete = async (url, data = {}) =>
    axios.delete(`${this.baseUrl}${url}`, { data }).then(responseData).catch(handleAxiosError);
}

export default CoreAPIService;
