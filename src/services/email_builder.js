import { studyServer } from "./study_axios"

export const getAllEmailContent = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/EmailContent")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getEmailContentById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/EmailContent/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createEmailContent = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/EmailContent/create-email`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editEmailContent = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/EmailContent/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteEmailContent = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/EmailContent/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
