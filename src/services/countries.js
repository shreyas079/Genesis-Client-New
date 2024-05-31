import { dataServer } from "./axios.config";

export const getAllCountries = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/Country/get-countries")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getCountryById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/Country/getcountry-byid?Id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateCountry = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/Country/update-country?Id=${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createNewCountry = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/Country/create-country", data)
      .then((res) => resolve(err))
      .catch((err) => reject(err));
  });
};
