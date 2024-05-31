import { studyServer } from "./study_axios"

export const getAllVisits = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Visit")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createNewVisit = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post("/Visit", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getVisitById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/Visit/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editVisit = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Visit/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteVisit = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/Visit/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllBusinessRules = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/BusinessRules")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
