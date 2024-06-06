// Sponsor. Pages
import Sponsors from "../pages/admin/Sponsors/Sponsors";
import CreateSponsors from "../pages/admin/Sponsors/CreateSponsors";
import EditSponsors from "../pages/admin/Sponsors/EditSponsors";
import ViewSponsors from "../pages/admin/Sponsors/ViewSponsors";
import AllSponsors from "../pages/admin/Sponsors/AllSponsors";

const SponsorsRoutes = [
    {
      path: "/sponsors",
      element: <Layout children={<Sponsors />} />,
    },
    {
      path: "/create-sponsor",
      element: <Layout children={<CreateSponsors />} />,
    },
    {
      path: "/edit-sponsor/",
      element: <Layout children={<EditSponsors />} />,
    },
    {
      path: "/view-sponsor",
      element: <Layout children={<ViewSponsors />} />,
    },
    {
      path: "/all-sponsors",
      element: <Layout children={<AllSponsors />} />,
    },
  ];
  
  export default SponsorsRoutes;
  