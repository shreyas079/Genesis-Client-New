import { studyServer } from "./study_axios";

export const getAllSubjectVars = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/StudyVariableType")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};