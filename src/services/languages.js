import { dataServer } from "./axios.config";

export const getAllLanguages = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/Language")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createLanguage = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post(`/Language`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getLanguageById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/Language/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editLanguage = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/Language/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteLanguage = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .delete(`/Language/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDefaultLanguage = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/Language/getdefaultlanguage")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
