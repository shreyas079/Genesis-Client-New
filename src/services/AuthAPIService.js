import { AxiosRequestConfig } from 'axios'
import CoreAPIService from './CoreAPIService'
import { API_ENDPOINTS, BASE_API_URL, getQueries } from "../utils/api-integration";


const {
  PUBLIC: {
    LOGIN_API,
    FORGET_PASSWORD,
    CONFIRM_FORGET_PASSWORD,
    EDIT_PROFILE,
  },
} = API_ENDPOINTS;

class AuthAPIService {
  constructor(baseUrl = BASE_API_URL.GENESIS_CENTRAL_API_URL) {
    this.services = new CoreAPIService(baseUrl);
  }

//   signUp = async (data) => {
//     const endpoint = `${SIGN_UP}`;
//     return this.services.post(endpoint, data);
//   }

  getAuthCode = async (data) => {
    const endpoint = `${LOGIN_API}`;
    return this.services.post(endpoint, data)
      .then((response) => response.data); // Assuming data structure as specified
  }


  forgetPassword = async (data) => {
    const endpoint = `${FORGET_PASSWORD}`;
    return this.services.put(endpoint, data);
  }

  confirmForgetPassword = async (data) => {
    const endpoint = `${CONFIRM_FORGET_PASSWORD}`;
    return this.services.put(endpoint, data);
  }



}

const authApiInstance = new AuthAPIService();

export const authApiInstanceLogin = new AuthAPIService(BASE_API_URL.USER_LOGIN_API_URL);

export default authApiInstance;
