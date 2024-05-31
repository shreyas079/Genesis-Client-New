import { studyServer } from "./study_axios"

export const getAllWidgets = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Widgets")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllWidgetTypes = () => {
  return new Promise((resolve, reject) => {
    studyServer
      .get("/Widgets/widget-types")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getWidgetById = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .get(`/Widgets/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createNewWidget = (data) => {
  //   const formData = new FormData();
  //   for (let value in data) {
  //     formData.append(value, data[value]);
  //   }
  return new Promise((resolve, reject) => {
    studyServer
      .post(`/Widgets/create-widget`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editWidget = (id, data) => {
  return new Promise((resolve, reject) => {
    studyServer
      .put(`/Widgets/update-widget?id=${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteWidget = (id) => {
  return new Promise((resolve, reject) => {
    studyServer
      .delete(`/Widgets/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
