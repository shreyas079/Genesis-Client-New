import { useState, createContext, useReducer } from "react";
import systemSettingReducer from "./SystemSettingsReducer";

import { getAllSystemCountries } from "../../services/system_country";

const SystemSettingContext = createContext();

export const SystemSettingProvider = ({ children }) => {
  const initialState = {
    systemData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(systemSettingReducer, initialState);

  const [value, setValue] = useState(0);

  const fetchSystemCountries = async () => {
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
        fetchSystemCountries,
        value,
        setValue
      }}
    >
      {children}
    </SystemSettingContext.Provider>
  );
};

export default SystemSettingContext;
