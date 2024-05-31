import { dataServer } from "./axios.config";

// export const getAllUsers = () => {
//   return new Promise((resolve, reject) => {
//     dataServer
//       .get("app/User/getUsers")
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// };
export const getAllUsers = (pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    dataServer
    .get("/app/User/getUsers", {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/Users/getuser-byid?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/Users/create-user", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const registerAdminNew = (data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .post("/Users/create-user", data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editUser = (id, data) => {
  return new Promise((resolve, reject) => {
    dataServer
      .put(`/Users/update-user?id=${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .delete(`/Users/delete-user?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const editUserStatus = (id, status) => {
  const isActive = status === null ? true : false;

  return new Promise((resolve, reject) => {
    dataServer
      .patch(`/Users/user-status?id=${id}&status=${isActive}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getSponsorBasedStudy = (id) => {
  return new Promise((resolve, reject) => {
    dataServer
      .get(`/Sponsor/getby-id?id=${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
