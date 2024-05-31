import { useState, createContext, useReducer } from "react";
import systemSettingReducer from "./SystemSettingsReducer";

import { getAllUsers } from "../../services/users";

// const access_token = localStorage.getItem('accessToken');

const SystemSettingContext = createContext();

export const SystemSettingProvider = ({ children }) => {
  const initialState = {
    systemData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(systemSettingReducer, initialState);

  const [value, setValue] = useState(0);

  const fetchSystemSetting = async () => {
    setLoading();
    try {
      const res = await getAllSystemCountries(pageNumber = 1, pageSize = 10);
      console.log(res,'ldsldsdlslds')
      dispatch({
        type: "SYSTEM_USERS",
        payload: res.data.result,
      });
    } catch (err) {
      disableLoading();
      console.log("Error: ", err.message);
    }
  };
//   const fetchSystemCountry = async (pageNumber = 1, pageSize = 10) => {
//     setLoading();
//     try {
//       const res = await getAllSystemCountries(pageNumber, pageSize);
//       if (res.status === "Success") {
//         const mappedData = mapSponsorData(res.result);
//         console.log("Mapped Data:", mappedData);
//         dispatch({
//           type: "GET_SPONSORS",
//           payload: mappedData,
//         });
//       } else {
//         console.error("Failed to fetch sponsors:", res.message);
//         requestFailed();
//       }
//     } catch (err) {
//       console.error("Error: ", err.message);
//       requestFailed();
//     } finally {
//       disableLoading();
//     }
//   };
  

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // useEffect(() => {
  //   if (access_token) {
  //     fetchUsers();
  //   }
  // }, [access_token]);

  return (
    <SystemSettingContext.Provider
      value={{
        systemData: state.systemData,
        load: state.load,
        setLoading,
        disableLoading,
        fetchSystemSetting,
        value,
        setValue
      }}
    >
      {children}
    </SystemSettingContext.Provider>
  );
};

export default SystemSettingContext;
