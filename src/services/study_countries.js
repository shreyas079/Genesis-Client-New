import { studyServer } from "./study_axios";

export const getStudyCountries = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Country/get-countries")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addStudyCountryFromSystem = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/Country/AddCountries-FromSystem`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getStudyCountryById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/Country/getcountry-byid?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createStudyCountry = (data) => {
  const formData = new FormData();
  for (let value in data) {
    formData.append(value, data[value]);
  }
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/Country/create-country`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editStudyCountry = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Country/update-country?id=${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const assignLanguagesToCountries = (data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put("/Country/AssignLanguages-ToCountries", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDobFormatData = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/DateOfBirthFormat")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
