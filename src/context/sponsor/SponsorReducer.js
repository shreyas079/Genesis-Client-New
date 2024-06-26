const sponsorReducer = (state, action) => {
  switch (action.type) {
    case "GET_SPONSORS":
      return {
        ...state,
        sponsorsData: action.payload,
        load: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        load: true,
      };
    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.payload,
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

export default sponsorReducer;
