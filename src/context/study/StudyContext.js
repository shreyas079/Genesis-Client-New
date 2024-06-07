import { createContext, useReducer } from "react";
import studyReducer from "./StudyReducer";
import { getAllStudy, getStudyById } from "../../services/studies";
import { mapStudyData, transformStudyData } from "../../utils/dataMapping";

// const access_token = localStorage.getItem('accessToken');

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const initialState = {
    studyData: [],
    studyByIdData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(studyReducer, initialState);

  const fetchStudies = async () => {
    setLoading();
    try {
      const res = await getAllStudy();
      const mappedData = mapStudyData(res.data.result);
      dispatch({
        type: "GET_STUDIES",
        payload: mappedData,
      });
    } catch (err) {
      disableLoading();
      console.log("Error: ", err.message);
    }
  };

  const fetchStudyById = async (id) => {
    try {
      setLoading();
      const res = await getStudyById(id);
      dispatch({
        type: "GET_STUDY_BY_ID",
        payload: res.data,
      });
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      disableLoading();
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // useEffect(() => {
  //   if (access_token) {
  //     fetchStudies();
  //   }
  // }, [access_token]);

  return (
    <StudyContext.Provider
      value={{
        studyData: state.studyData,
        studyByIdData: state.studyByIdData,
        load: state.load,
        setLoading,
        disableLoading,
        fetchStudies,
        fetchStudyById,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export default StudyContext;
