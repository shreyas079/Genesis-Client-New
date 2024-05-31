import { dataServer } from "./axios.config";

export const getSystemRegion = (pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/SystemRegion", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createSystemRegion = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/SystemRegion", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSystemRegion = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/SystemRegion/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSystemRegionById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/SystemRegion/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
