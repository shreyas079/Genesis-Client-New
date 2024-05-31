// import axios from "axios";
import { dataServer } from "./axios.config";

export const getSystemLanguages = (pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/SystemLanguage",{
        params:{
          pageNumber: pageNumber,
          pageSize: pageSize,
        }
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createSystemLanaguage = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/SystemLanguage", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSystemLanguageById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/SystemLanguage/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSystemLanguage = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/SystemLanguage/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteSystemLanguage = (id) => {
    return new Promise((resolve, reject) => {
        dataServer
            .delete(`/SystemLanguage/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
