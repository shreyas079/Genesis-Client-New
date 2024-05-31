import { dataServer } from "./axios.config";

export const getStudyRoles = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/StudyRoles/get-studyroles")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getStudyRoleById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/StudyRoles/get-studyrolesbyid")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const assignStudyRoles = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/StudyRoles/assign-studyrole", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

