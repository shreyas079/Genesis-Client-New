export const initialValues = {
  isAuthenticated: false,
  token: null,
  email: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        email: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("genesis");
      return {
        ...state,
        data: initialValues.data,
        isAuthenticated: false,
        email: action.payload,
      };
    case "SET_TOKEN":
      return { ...state, token: action.payload, email: action.payload };
    default:
      return state;
  }
};

export default authReducer;
