import studyMenuRoutes from "./studyMenuRoutes";
import studyManagementRoutes from "./StudyManagementRoutes";
import AuthRoutes from "./AuthRoutes";
import SystemSettingsRoute from "./SystemSettingsRoutes";
import SponsorsRoutes from "./SponsorsRoutes";

const routes = [
  ...AuthRoutes,
  ...identityRoutes,
  ...studyMenuRoutes,
  ...studyManagementRoutes,
  ...SystemSettingsRoute,
  ...SponsorsRoutes,
  ...UserRoutes
];

export default routes;
