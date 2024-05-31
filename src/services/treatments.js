import { studyServer } from "./study_axios"

export const getAllTreatments = () => {
    return new Promise((resolve, reject) => {
        studyServer
            .get("/Treatment")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const createTreatment = (data) => {
    return new Promise((resolve, reject) => {
        studyServer
            .post(`/Treatment`, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const getTreatmentById = (id) => {
    return new Promise((resolve, reject) => {
        studyServer
            .get(`/Treatment/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const editTreatment = (id, data) => {
    return new Promise((resolve, reject) => {
        studyServer
            .put(`/Treatment/${id}`, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const deleteTreatment = (id) => {
    return new Promise((resolve, reject) => {
        studyServer
            .delete(`/Treatment/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
