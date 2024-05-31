import { studyServer } from "./study_axios"

export const getAllCaregivers = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/CareGiverType")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getCaregiverById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/CareGiverType/Id?Id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createCaregiver = (data) => {
  const formData = new FormData();
  for (let value in data) {
    formData.append(value, data[value]);
  }
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/CareGiverType`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editCaregiver = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/CareGiverType?Id=${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteCaregiver = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/CareGiverType/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
