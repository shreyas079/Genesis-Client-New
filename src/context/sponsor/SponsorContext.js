import { createContext, useReducer } from "react";
import sponsorReducer from "./SponsorReducer";

import { getAllSponsors, createSponsor } from "../../services/sponsors";

import { toast } from "react-toastify";
import { mapSponsorData } from '../../utils/dataMapping';

// const access_token = localStorage.getItem("accessToken");

const SponsorContext = createContext();

export const SponsorProvider = ({ children }) => {
  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const initialState = {
    sponsorsData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(sponsorReducer, initialState);

const fetchSponsors = async (pageNumber = 1, pageSize = 10) => {
  setLoading();
  try {
    const res = await getAllSponsors(pageNumber, pageSize);
    if (res.status === "Success") {
      const mappedData = mapSponsorData(res.result);
      console.log("Mapped Data:", mappedData);
      dispatch({
        type: "GET_SPONSORS",
        payload: mappedData,
      });
    } else {
      console.error("Failed to fetch sponsors:", res.message);
      requestFailed();
    }
  } catch (err) {
    console.error("Error: ", err.message);
    requestFailed();
  } finally {
    disableLoading();
  }
};


  const sponsorCreation = async (name, fileUrl) => {
    try {
      const res = await createSponsor({
        name,
        fileUrl,
      });

      return res;
    } catch (err) {
      console.log("submit error: ", err);
      requestFailed();
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // useEffect(() => {
  //   fetchSponsors();
  // }, []);

  return (
    <SponsorContext.Provider
      value={{
        sponsorsData: state.sponsorsData,
        load: state.load,
        setLoading,
        sponsorCreation,
        disableLoading,
        fetchSponsors
      }}
    >
      {children}
    </SponsorContext.Provider>
  );
};

export default SponsorContext;
