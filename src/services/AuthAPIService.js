import { AxiosRequestConfig } from "axios";
import CoreAPIService from "./CoreAPIService";
import {
  API_ENDPOINTS,
  BASE_API_URL,
  getQueries,
} from "../utils/api-integration";

const {
  PUBLIC: { LOGIN_API, CHANGE_PASSWORD },
} = API_ENDPOINTS;

class AuthAPIService {
  constructor(baseUrl = BASE_API_URL.GENESIS_CENTRAL_API_URL) {
    this.services = new CoreAPIService(baseUrl);
  }

  getAuthCode = async (data) => {
    const endpoint = `${LOGIN_API}`;
    return this.services.post(endpoint, data);
  };

  changePassword = async (data) => {
    const endpoint = `${CHANGE_PASSWORD}`;
    return this.services.post(endpoint, data);
  };
}

const authApiInstance = new AuthAPIService();

export const authApiInstanceLogin = new AuthAPIService(
  BASE_API_URL.USER_LOGIN_API_URL
);

export default authApiInstance;
