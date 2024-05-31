import { dataServer } from "./axios.config";

export const getAllSystemCountries = (pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/SystemCountry", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllRegions = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/SystemRegion",{
        params:{
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSystemCountryById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/SystemCountry/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteSystemCountry = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .delete(`/SystemCountry/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createSystemCountry = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/SystemCountry", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSystemCountry = (id, data) => {
  const { isActive } = data;
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/SystemCountry/${id}?IsActive=${isActive}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
