import { dataServer } from "./axios.config";

export const getFormBuilder = () => {
    return new Promise((resolve, reject) => {
        dataServer
            .get("/Form")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const getFormById = (id) => {
    return new Promise((resolve, reject) => {
        dataServer
            .get(`/Form/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const postFormName = (formName) => {
    return new Promise((resolve, reject) => {
        dataServer
            .post(`/Form/setform-name?formName=${formName}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const deleteFormData = (id) => {
    return new Promise((resolve, reject) => {
        dataServer
            .delete(`/Form/id=${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const cloneFormData = (id, name) => {
    return new Promise((resolve, reject) => {
        dataServer
            .post(`/Form/clone-form?id=${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};

export const changeFormStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        dataServer
            .patch(`/Form/form-status?id=${id}&status=${status}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
};
