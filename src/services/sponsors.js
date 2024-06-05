import { dataServer } from "./axios.config";

export const getAllSponsors = (pageNumber = 1, pageSize = 10) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`app/Sponsor/all`, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const deleteSponsor = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .delete(`/Sponsor/delete-sponsor?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createSponsor = (data) => {
  var name = data.name;
  var fileUrl = data.fileUrl;

  const formData = new FormData();

  formData.append("name", name);
  formData.append("fileUrl", fileUrl);

  return new Promise((resolve, reject) => {
    dataServer
      .post("/Sponsor/create-sponsor", formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSponsor = (id, data) => {
  var name = data.name;
  var fileUrl = data.fileUrl;

  const formData = new FormData();

  formData.append("name", name);
  formData.append("fileUrl", fileUrl);

  return new Promise((resolve, reject) => {
    dataServer
      .post(`app/Sponsor/?id=${id}`, formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSponsorImage = (img) => {
  const formData = new FormData();

  formData.append("path", img);

  return new Promise((resolve, reject) => {
    dataServer
      .get(`/app/Sponsor/image?path=${img}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editSponsorStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    dataServer
      .patch(`/app/Sponsor/status?id=${id}&status=${status}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getStudyTypes = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/app/Study/studytypes`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const postExportExcel = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post(`/Export/export-excel`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const postExportPDF = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post(`/Export/export-pdf`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getDownloadReport = (path) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/Export/DownloadReport?FullFilePath=${path}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
