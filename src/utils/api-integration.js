export const API_ENDPOINTS = {
  AUTH: {
    LOGIN_API: "/api/Authenticate/login",
    CHANGE_PASSWORD:"/api/Authenticate/ChangePassword"
  },
  PRIVATE: {
    SPONSOR_IMAGE: "/app/Sponsor/image",
  },
  PUBLIC: {
    LOGIN_API: "/api/Authenticate/login",
    CHANGE_PASSWORD:"/api/Authenticate/ChangePassword"
  },
};
export const QUERIES = {
  AUTH: {},
  CATEGORY: {},
  PRIVATE: {
    SPONSOR_IMAGE: "/app/Sponsor/image",
  },
  PUBLIC: {
    LOGIN_API: "/api/Authenticate/login",
    CHANGE_PASSWORD:"/api/Authenticate/ChangePassword"
  },
};

export const getQueries = (obj) => {
  return Object.keys(obj ?? {}).reduce(
    (val, key, idx) =>
      obj[key]
        ? `${val}${key}=${obj[key]}${
            Object.keys(obj).length - 1 !== idx ? "&" : ""
          }`
        : val,
    ""
  );
};

export const BASE_API_URL = {
  GENESIS_CENTRAL_API_URL: "https://genesisapi.augursapps.com",
};
