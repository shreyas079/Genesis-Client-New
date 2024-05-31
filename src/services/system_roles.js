// import axios from "axios";
import { dataServer } from "./axios.config";

export const getSystemRoles = (pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/SystemRoles", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createSystemRole = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/SystemRoles", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSystemRoleById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/SystemRoles/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSystemRole = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/SystemRoles/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
