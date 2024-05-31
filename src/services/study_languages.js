import { studyServer } from "./study_axios";

export const getStudyLanguages = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Language")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getStudyLanguageById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/Language/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addLanguages = (data) => {
  const formData = new FormData();
  for (let value in data) {
    formData.append(value, data[value]);
  }
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/Language/add-languages`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const selectStudyLanguages = (data) => {
  console.log("selectStudyLanguages .... ", data);
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Language/select-languages/`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addLanguagesFromConfig = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Language/add-languages/`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
