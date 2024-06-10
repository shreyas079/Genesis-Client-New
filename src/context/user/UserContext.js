import { useState, createContext, useReducer } from "react";
import userReducer from "./UserReducer";

import { getAllUsers } from "../../services/users";

// const access_token = localStorage.getItem('accessToken');

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    usersData: [],
    load: false,
    usersCount: 0
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const [value, setValue] = useState(0);

  const fetchUsers = async () => {
    setLoading();
    try {
      const res = await getAllUsers();

      dispatch({
        type: "GET_USERS",
        payload: res.data.result,
      });
      dispatch({
        type: "GET_USERS_COUNT",
        payload: res.data.result.length
      })
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
    <UserContext.Provider
      value={{
        usersData: state.usersData,
        load: state.load,
        setLoading,
        disableLoading,
        fetchUsers,
        value,
        setValue,
        usersCount: state.usersCount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
