const systemSettingReducer = (state, action) => {
    switch (action.type) {
      case "SYSTEM_USERS":
        return {
          ...state,
          systemData: action.payload,
          load: false,
        };
      case "SET_LOADING":
        return {
          ...state,
          load: true,
        };
      case "DISABLE_LOADING":
        return {
          ...state,
          load: false,
        };
      default:
        return state;
    }
  };
  
  export default systemSettingReducer;
  