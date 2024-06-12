export const LOCAL_ACCESS_TOKEN_KEY = 'access-token';
export const LOCAL_USER_DETAILS_KEY = 'user-details';
export const LOCAL_THEME = 'user-theme';
export const LOCAL_INFO = 'genesis';

// ****LocalStorage Services****

export const setItemLocalStorage = (key, value) => {
  return typeof window !== 'undefined' && localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key) => {
  return typeof window !== 'undefined' && localStorage.getItem(key);
};

export const removeItemLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

export const disableAccessToken = () => {
  localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY);
};

export const disableUserDetails = () => {
  localStorage.removeItem(LOCAL_USER_DETAILS_KEY);
};

export const checkAccessToken = () => {
  const item = localStorage.getItem(LOCAL_INFO);
  return item ? JSON.parse(item).token : null;
};

export const cardColors = ["#F5F6FE", "#F5F6FE", "#F5F6FE", "#F5F6FE"];
