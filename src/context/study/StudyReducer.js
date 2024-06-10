const studyReducer = (state, action) => {
  switch (action.type) {
    case "GET_STUDIES":
      return {
        ...state,
        studyData: action.payload,
        load: false,
      };
    case "GET_STUDY_BY_ID":
      return {
        ...state,
        studyByIdData: action.payload,
        load: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        load: true,
      };
    case "SET_TOTAL_STUDY_COUNT":
      return {
        ...state,
        totalStudyCount: action.payload,
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

export default studyReducer;
