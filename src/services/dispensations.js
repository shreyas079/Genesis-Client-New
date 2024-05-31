import { studyServer } from "./study_axios"

export const getAllDispensations = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Dispensation")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createNewDispensation = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post("/Dispensation", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteDispensation = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/Dispensation/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDispensationById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/Dispensation/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editDispensation = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Dispensation/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
