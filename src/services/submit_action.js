import { studyServer } from "./study_axios"

export const getAllSubmitActions = () => {
    return new Promise((resolve, reject) => {
        studyServer
            .get("/SubmitAction")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const getSubmitActionById = (id) => {
    return new Promise((resolve, reject) => {
        studyServer
            .get(`/SubmitAction/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const createSubmitAction = (data) => {
    // const formData = new FormData();
    // for (let value in data) {
    //     formData.append(value, data[value]);
    // }
    return new Promise((resolve, reject) => {
        studyServer
            .post(`/SubmitAction`, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const editSubmitAction = (id, data) => {
    return new Promise((resolve, reject) => {
        studyServer
            .put(`/SubmitAction/${id}`, data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const deleteSubmitAction = (id) => {
    return new Promise((resolve, reject) => {
        studyServer
            .delete(`/SubmitAction/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
