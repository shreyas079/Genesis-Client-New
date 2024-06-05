import { dataServer } from "./axios.config";
import axios from "axios";

export const getAllStudy = (pageNumber = 1, pageSize = 10) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/Study", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getStudyById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/app/Study?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllPms = () => {
  return new Promise((resolve, reject) => {
    dataServer
      .get("/app/ProjectManager")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteStudy = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .delete(`/Study/delete-study?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createStudy = (data) => {
  var Name = data.Name;
  var PortalUrl = data.PortalUrl;
  var ApiUrl = data.ApiUrl;
  var QuestionnaireBuilderUrl = data.questionaireUrl;
  var StudyTypeId = data.StudyTypeId;
  var SponsorId = data.sponsorId;
  var ProjectManagerId = data.ProjectManagerId;
  var isActive = data.isActive;

  const formData = new FormData();

  formData.append("Name", Name);
  formData.append("PortalUrl", PortalUrl);
  formData.append("ApiUrl", ApiUrl);
  formData.append("QuestionnaireBuilderUrl", QuestionnaireBuilderUrl);
  formData.append("StudyTypeId", StudyTypeId);
  formData.append("SponsorId", SponsorId);
  for (var i = 0; i < ProjectManagerId.length; i++) {
    formData.append("ProjectManagerId[]", ProjectManagerId[i]);
  }
  formData.append("isActive", isActive);

  // const newData = { Name, PortalUrl, ApiUrl, QuestionnaireBuilderUrl, StudyTypeId, SponsorId, ProjectManagerId, isActive };

  return new Promise((resolve, reject) => {
    dataServer
      .post("/Study/create-study", formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editStudy = (id, data) => {
  // console.log("EDIT STUDY ===> ", data);
  // console.log("EDIT STUDY ===> ", data.ProjectManagerId);

  var Name = data.Name;
  var PortalUrl = data.PortalUrl;
  var ApiUrl = data.ApiUrl;
  var QuestionnaireBuilderUrl = data.questionaireUrl;
  var StudyTypeId = data.StudyTypeId;
  var SponsorId = data.sponsorId;
  if (data?.ProjectManagerId) {
    var ProjectManagerId = data.ProjectManagerId;
  }

  var isActive = data.isActive;

  const formData = new FormData();

  // console.log('project manager id ==> ', data.ProjectManagerId)

  formData.append("Name", Name);
  formData.append("PortalUrl", PortalUrl);
  formData.append("ApiUrl", ApiUrl);
  formData.append("QuestionnaireBuilderUrl", QuestionnaireBuilderUrl);
  formData.append("StudyTypeId", StudyTypeId);
  formData.append("SponsorId", SponsorId);
  if (data?.ProjectManagerId) {
    // formData.append("ProjectManagerId", ProjectManagerId);
    ProjectManagerId.forEach((projectMgr) =>
      formData.append("ProjectManagerId[]", projectMgr)
    );
  }
  formData.append("isActive", isActive);

  return new Promise((resolve, reject) => {
    dataServer
      .put(`/Study/update-study?id=${id}`, formData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editStudyStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    dataServer
      .patch(`/Study/study-status?id=${id}&status=${status}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
