import { studyServer } from "./study_axios"

export const getAllDoseLevels = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/DosageLevel")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createNewDoseLevel = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post("/DosageLevel", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDoseLevelById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/DosageLevel/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editDoseLevels = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/DosageLevel/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteDoseLevels = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/DosageLevel/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
