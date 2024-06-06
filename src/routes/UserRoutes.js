// User. Pages
import AddUser from "../pages/admin/Users/AddUser";
import AllUsers from "../pages/admin/Users/AllUsers";
import EditUser from "../pages/admin/Users/EditUser";
import ImportUser from "../pages/admin/Studies/ImportUser";

const UserRoutes = [
    {
      path: "/add-user",
      element: <Layout children={<AddUser />} />,
    },
    {
      path: "/all-users",
      element: <Layout children={<AllUsers />} />,
    },
    {
      path: "/edit-user",
      element: <Layout children={<EditUser />} />,
    },
    {
      path: "/import-study",
      element: <Layout children={<ImportUser />} />,
    },
  ];
  
  export default UserRoutes;
  