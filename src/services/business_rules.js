import { studyServer } from "./study_axios";

export const getBusinessRules = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/BusinessRules")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addNewBusinessRule = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/BusinessRules`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getBusinessRuleById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/BusinessRules/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editBusinessRule = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/BusinessRules/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
