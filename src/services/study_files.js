import { studyServer } from "./study_axios"

export const getStudyFileById = (id) => {
    return new Promise((resolve, reject) => {
        studyServer
            .get(`/StudyFile?id=${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const createStudyFile = (data) => {
    const formData = new FormData();
    for (let value in data) {
      formData.append(value, data[value]);
    }
    return new Promise((resolve, reject) => {
        studyServer
            .post(`/StudyFile`, formData)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const getAllLanguages = () => {
    return new Promise((resolve, reject) => {
        studyServer
            .get("/Language")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
