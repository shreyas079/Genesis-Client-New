import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

// Auth Pages
import Layout from "./components/Layout/Layout";
import ResetPassword from "./pages/auth/ResetPassword";
import Notification from "./pages/auth/Notification";
import RegisterPhone from "./pages/auth/RegisterPhone";

// Test Login Page
// import IdentityLogin from "./pages/auth/IdentityLogin";
import Login from "./pages/auth/Login"

// Admin Home Page
import Homepage from "./pages/admin/Homepage/Homepage";

// Sponsor Pages
import Sponsors from "./pages/admin/Sponsors/Sponsors";
import CreateSponsors from "./pages/admin/Sponsors/CreateSponsors";
import EditSponsors from "./pages/admin/Sponsors/EditSponsors";
import ViewSponsors from "./pages/admin/Sponsors/ViewSponsors";
import AllSponsors from "./pages/admin/Sponsors/AllSponsors";

// Study Pages
import Study from "./pages/admin/Studies/Study";
import AllStudies from "./pages/admin/Studies/AllStudies";
import ViewStudies from "./pages/admin/Studies/ViewStudies";
import CreateStudy from "./pages/admin/Studies/CreateStudy";
import EditStudy from "./pages/admin/Studies/EditStudy";

// User Pages
import AddUser from "./pages/admin/Users/AddUser";
import AllUsers from "./pages/admin/Users/AllUsers";
import EditUser from "./pages/admin/Users/EditUser";
import ImportUser from "./pages/admin/Studies/ImportUser";

// System Settings
import SystemSettings from "./pages/admin/SystemSettings/SystemSettings";
import AddCountries from "./pages/admin/SystemSettings/Countries/AddCountries";
import EditCountries from "./pages/admin/SystemSettings/Countries/EditCountries";

import AddLanguages from "./pages/admin/SystemSettings/Languages/AddLanguages";
import EditLanguages from "./pages/admin/SystemSettings/Languages/EditLanguages";

import AddRoles from "./pages/admin/SystemSettings/Roles/AddRoles";
import EditRoles from "./pages/admin/SystemSettings/Roles/EditRoles";

import AddRegions from "./pages/admin/SystemSettings/Regions/AddRegions";
import EditRegions from "./pages/admin/SystemSettings/Regions/EditRegions";

// SIGN IN OIDC
import SignInOidc from "./pages/admin/Homepage/SignInOidc";

/* Study Management Pages*/
import StudyBuilderLayout from "./components/StudyBuilderLayout/StudyBuilderLayout";

import StudyManagement from "./pages/admin/StudyManagement/StudyManagement";
import ManageInfo from "./pages/admin/StudyManagement/ManageInfo";
import LanguageStudy from "./pages/admin/StudyManagement/LanguageStudy";
import Languages from "./pages/admin/StudySetup/Languages/Languages";
// import AddLanguages from "./pages/admin/StudySetup/Languages/AddLanguage";
// import Countries from "./pages/admin/StudySetup/Countries/Countries";
import ManageCountries from "./pages/admin/StudySetup/Countries/ManageCountries";
import Countries from "./pages/admin/StudySetup/Countries/Countries";
import SubjectAttributes from "./pages/admin/StudySetup/SubjectAttributes/SubjectAttributes";

// Caregiver Pages
import Caregivers from "./pages/admin/StudySetup/Caregivers/Caregivers";
import CreateCareGiver from "./pages/admin/StudySetup/Caregivers/CreateCaregiver";
import EditCareGiver from "./pages/admin/StudySetup/Caregivers/EditCaregiver";

import DrugTypes from "./pages/admin/StudySetup/DrugTypes";

// Dosage Level Pages
import DoseLevels from "./pages/admin/StudySetup/DoseageLevels/DoseLevels";
import CreateDoseLevels from "./pages/admin/StudySetup/DoseageLevels/CreateDoseLevels";
import EditDoseLevels from "./pages/admin/StudySetup/DoseageLevels/EditDoseLevels";

// Treatment Pages
import Treatment from "./pages/admin/StudySetup/Treatment/Treatment";
import CreateTreatment from "./pages/admin/StudySetup/Treatment/CreateTreatment";
import EditTreatment from "./pages/admin/StudySetup/Treatment/EditTreatment";

// Visit Pages
import Visits from "./pages/admin/StudySetup/Visits/Visits";
import CreateVisit from "./pages/admin/StudySetup/Visits/CreateVisit";
import EditVisit from "./pages/admin/StudySetup/Visits/EditVisit";

// Questionnaire
import Questionnaire from "./pages/admin/StudySetup/Questionaire";

// Dispensations
import Dispensations from "./pages/admin/StudySetup/Dispensation/Dispensations";
import CreateDispensation from "./pages/admin/StudySetup/Dispensation/CreateDispensation";
import EditDispensation from "./pages/admin/StudySetup/Dispensation/EditDispensation";

// Drug Return Config
import DrugReturnConfig from "./pages/admin/StudySetup/DrugReturn/DrugReturnConfig";
import ApproveQuarantine from "./pages/admin/StudySetup/DrugReturn/ApproveQuarantine";
import CraRecociliation from "./pages/admin/StudySetup/DrugReturn/CraRecociliation";
import CS_SiteKit from "./pages/admin/StudySetup/DrugReturn/CS_SiteKit";
import DepotKit from "./pages/admin/StudySetup/DrugReturn/DepotKit";
import DepotReconciliation from "./pages/admin/StudySetup/DrugReturn/DepotReconciliation";
import DepotAcknowledgement from "./pages/admin/StudySetup/DrugReturn/DepotAcknowledgement";
import DepotToSite from "./pages/admin/StudySetup/DrugReturn/DepotToSite";
import ReplaceDrug from "./pages/admin/StudySetup/DrugReturn/ReplaceDrug";
import SiteToDepot from "./pages/admin/StudySetup/DrugReturn/SiteToDepot";
import SubjectToSite from "./pages/admin/StudySetup/DrugReturn/SubjectToSite";

// Study Settings
import StudySettings from "./pages/admin/StudySetup/StudySettings/StudySettings";
import AlertVariable from "./pages/admin/StudySetup/StudySettings/AlertVariable";
import DrugVariable from "./pages/admin/StudySetup/StudySettings/DrugVariable";
import EcoaVariable from "./pages/admin/StudySetup/StudySettings/EcoaVariable";
import EcoaSiteVar from "./pages/admin/StudySetup/StudySettings/EcoaSiteVar";
import EcoaHandHeldVar from "./pages/admin/StudySetup/StudySettings/EcoaHandledVar";
import StudyVariable from "./pages/admin/StudySetup/StudySettings/StudyVariable";
import SubjectVariable from "./pages/admin/StudySetup/StudySettings/SubjectVariable";

// Main Sidebar Links
import Alarms from "./pages/admin/StudySetup/MainSidebar/Alarms/Alarms";

// Business Rules CRUD
import BusinessRules from "./pages/admin/StudySetup/MainSidebar/BusinessRules/BusinessRules";
import CreateBusinessRules from "./pages/admin/StudySetup/MainSidebar/BusinessRules/CreateBusinessRules";
import EditBusinessRules from "./pages/admin/StudySetup/MainSidebar/BusinessRules/EditBusinessRules";

import CountriesOfSystem from "./pages/admin/StudySetup/MainSidebar/CountriesOfSystem/CountriesOfSystem";
import DCFWorkFlow from "./pages/admin/StudySetup/MainSidebar/DCFWorkFlow/DCFWorkFlow";

// Email Builder CRUD
import EmailBuilder from "./pages/admin/StudySetup/MainSidebar/EmailBuilder/EmailBuilder";
import CreateEmail from "./pages/admin/StudySetup/MainSidebar/EmailBuilder/CreateEmail";
import EditEmail from "./pages/admin/StudySetup/MainSidebar/EmailBuilder/EditEmail";

import LanguagesOfSystem from "./pages/admin/StudySetup/MainSidebar/LanguagesOfSystem/LanguagesOfSystem";
import Reports from "./pages/admin/StudySetup/MainSidebar/Reports/Reports";
import StudyFiles from "./pages/admin/StudySetup/MainSidebar/StudyFiles/StudyFiles";

// Submit Actions CRUD
import SubmitActions from "./pages/admin/StudySetup/MainSidebar/SubmitActions/SubmitActions";
import CreateActions from "./pages/admin/StudySetup/MainSidebar/SubmitActions/CreateActions";
import EditActions from "./pages/admin/StudySetup/MainSidebar/SubmitActions/EditActions";

import Translations from "./pages/admin/StudySetup/MainSidebar/Translations/Translations";
import Import from "./pages/admin/StudySetup/MainSidebar/Translations/Import";
import Export from "./pages/admin/StudySetup/MainSidebar/Translations/Export";

import Widgets from "./pages/admin/StudySetup/MainSidebar/Widgets/Widgets";
import AddWidget from "./pages/admin/StudySetup/MainSidebar/Widgets/AddWidget";
import EditWidget from "./pages/admin/StudySetup/MainSidebar/Widgets/EditWidget";

//TESTING
import TestLanguages from "./pages/admin/StudySetup/Languages/TestLanguages";
//TESTING

/* Study Management Pages*/

// Context API
import SponsorContext from "./context/sponsor/SponsorContext";
import StudyContext from "./context/study/StudyContext";
import UserContext from "./context/user/UserContext";
import AuthContext from "./context/auth/AuthContext";

// Toast and css dependencies
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import icon from "./assets/images/favicon.ico";

import ProtectedRoute from "./routes/ProtectedRoute";
import UnProtectedRoute from "./routes/UnProtectedRoute";

// MUI X Grid License Key
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "1aa44b00912d99c636bb4f9d8da8d732Tz01NTAyMixFPTE3MDEwMTIzNjYxODQsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

export default function App() {
  // const { setAuthenticationTrue } = React.useContext(AuthContext);
  // const { fetchSponsors } = React.useContext(SponsorContext);
  // const { fetchStudies } = React.useContext(StudyContext);
  // const { fetchUsers } = React.useContext(UserContext);

  // const checkCookie = Cookies.get("idsrv.session");
  // React.useEffect(() => {
  //   const favicon = document.getElementById("favicon");
  //   favicon.setAttribute("href", icon);
  //   setAuthenticationTrue();
  // }, []);

  // React.useEffect(() => {
  //   if (checkCookie) {
  //     setAuthenticationTrue();
  //     // getTokenDispatch(token);
  //     getUserLoggedIn();
  //     fetchSponsors();
  //     fetchStudies();
  //     fetchUsers();
  //   }
  // }, [checkCookie]);
  const { dispatch, getUserLoggedIn } = useContext(AuthContext);
  const { fetchSponsors } = useContext(SponsorContext);
  const { fetchStudies } = useContext(StudyContext);
  const { fetchUsers } = useContext(UserContext);

  const checkCookie = Cookies.get("idsrv.session");

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href", icon);
    // Assuming that if the app is initialized, you want to fetch the user data if token exists in localStorage
    const data = localStorage.getItem('genesis');
    if (data) {
      const parsedData = JSON.parse(data);
      dispatch({ type: 'LOGIN', data: parsedData });
    }
  }, [dispatch]);

  useEffect(() => {
    if (checkCookie) {
      const data = localStorage.getItem('genesis');
      if (data) {
        const parsedData = JSON.parse(data);
        dispatch({ type: 'LOGIN', data: parsedData });
        getUserLoggedIn()
          .then(() => {
            fetchSponsors();
            fetchStudies();
            fetchUsers();
          })
          .catch((err) => {
            console.error("Failed to log in user:", err);
          });
      }
    }
  }, [checkCookie, dispatch, getUserLoggedIn, fetchSponsors, fetchStudies, fetchUsers]);
  return (
    <div className="App">
      <Routes > 
        <Route element={<UnProtectedRoute />} >  
          {/* <Route path="/" element={<Homepage />} /> */}
          {/* <Route path="/login" element={<IdentityLogin />} /> */}
           <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password-sent" element={<Notification />} />
          <Route path="/register-phone" element={<RegisterPhone />} />
          <Route
            path="/get-token"
            element={<Layout children={<SignInOidc />} />}
          />
        </Route>

        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<ProtectedRoute/>}>
          <Route
            path="/homepage"
            element={<Layout children={<Homepage />} />}
            // exact
          />
          <Route
            path="/"
            element={<Layout children={<Homepage />} />}
            // exact
          />
          <Route
            path="/sponsors"
            element={<Layout children={<Sponsors />} />}
          />
          <Route
            path="/create-sponsor"
            element={<Layout children={<CreateSponsors />} />}
          />
          <Route
            path="/edit-sponsor/"
            element={<Layout children={<EditSponsors />} />}
          />
          <Route
            path="/view-sponsor"
            element={<Layout children={<ViewSponsors />} />}
          />
          <Route
            path="/all-sponsors"
            element={<Layout children={<AllSponsors />} />}
          />
          <Route path="/studies" element={<Layout children={<Study />} />} />
          <Route
            path="/all-studies"
            element={<Layout children={<AllStudies />} />}
          />
          <Route
            path="/edit-study/:id"
            element={<Layout children={<EditStudy />} />}
          />

          <Route path="/add-user" element={<Layout children={<AddUser />} />} />
          <Route
            path="/all-users"
            element={<Layout children={<AllUsers />} />}
          />
          <Route
            path="/edit-user/"
            element={<Layout children={<EditUser />} />}
          />
          <Route
            path="/import-study"
            element={<Layout children={<ImportUser />} />}
          />
          <Route
            path="/view-study"
            element={<Layout children={<ViewStudies />} />}
          />
          <Route
            path="/create-study"
            element={<Layout children={<CreateStudy />} />}
          />

          <Route
            path="/system-settings"
            element={<Layout children={<SystemSettings />} />}
          />

          <Route
            path="/system-settings/countries-add"
            element={<Layout children={<AddCountries />} />}
          />

          <Route
            path="/system-settings/countries-edit"
            element={<Layout children={<EditCountries />} />}
          />

          <Route
            path="/system-settings/languages-add"
            element={<Layout children={<AddLanguages />} />}
          />
          <Route
            path="/system-settings/languages-edit"
            element={<Layout children={<EditLanguages />} />}
          />

          <Route
            path="/system-settings/roles-add"
            element={<Layout children={<AddRoles />} />}
          />

          <Route
            path="/system-settings/roles-edit"
            element={<Layout children={<EditRoles />} />}
          />

          <Route
            path="/system-settings/regions-add"
            element={<Layout children={<AddRegions />} />}
          />
          <Route
            path="/system-settings/regions-edit"
            element={<Layout children={<EditRegions />} />}
          />

          <Route
            path="/study-management"
            element={<StudyBuilderLayout children={<StudyManagement />} />}
          />
          <Route
            path="/manage-info"
            element={<Layout children={<ManageInfo />} />}
          />
          <Route
            path="/language-study"
            element={<Layout children={<LanguageStudy />} />}
          />
          {/* <Route
            path="/study-management/languages"
            element={<Layout children={<Languages />} />}
          /> */}
          <Route
            path="/study-management/languages"
            element={<Layout children={<Languages />} />}
          />
          <Route
            path="/study-management/countries"
            element={<Layout children={<Countries />} />}
          />
          {/* <Route
            path="/study-management/countries"
            element={<Layout children={<ManageCountries />} />}
          /> */}
          <Route
            path="/study-management/subject-attributes"
            element={<Layout children={<SubjectAttributes />} />}
          />
          <Route
            path="/study-management/care-givers"
            element={<Layout children={<Caregivers />} />}
          />
          <Route
            path="/study-management/care-givers/create-caregiver"
            element={<Layout children={<CreateCareGiver />} />}
          />
          <Route
            path="/study-management/care-givers/edit-caregiver"
            element={<Layout children={<EditCareGiver />} />}
          />
          <Route
            path="/study-management/drug-types"
            element={<Layout children={<DrugTypes />} />}
          />
          <Route
            path="/study-management/dose-levels"
            element={<Layout children={<DoseLevels />} />}
          />
          <Route
            path="/study-management/dose-levels/create-dose"
            element={<Layout children={<CreateDoseLevels />} />}
          />
          <Route
            path="/study-management/dose-levels/edit-dose"
            element={<Layout children={<EditDoseLevels />} />}
          />
          <Route
            path="/study-management/treatment"
            element={<Layout children={<Treatment />} />}
          />
          <Route
            path="/study-management/treatment/create-treatment"
            element={<Layout children={<CreateTreatment />} />}
          />
          <Route
            path="/study-management/treatment/edit-treatment"
            element={<Layout children={<EditTreatment />} />}
          />

          <Route
            path="/study-management/visits"
            element={<Layout children={<Visits />} />}
          />

          <Route
            path="/study-management/visits/create"
            element={<Layout children={<CreateVisit />} />}
          />

          <Route
            path="/study-management/visits/edit"
            element={<Layout children={<EditVisit />} />}
          />

          <Route
            path="/study-management/questionnaire"
            element={<Layout children={<Questionnaire />} />}
          />

          <Route
            path="/study-management/dispensations"
            element={<Layout children={<Dispensations />} />}
          />

          <Route
            path="/study-management/dispensations/create"
            element={<Layout children={<CreateDispensation />} />}
          />

          <Route
            path="/study-management/dispensations/edit"
            element={<Layout children={<EditDispensation />} />}
          />

          <Route
            path="/study-management/drug-return"
            element={<Layout children={<DrugReturnConfig />} />}
          />

          <Route
            path="/study-management/drug-return/approve"
            element={<Layout children={<ApproveQuarantine />} />}
          />

          <Route
            path="/study-management/drug-return/reconciliation"
            element={<Layout children={<CraRecociliation />} />}
          />

          <Route
            path="/study-management/drug-return/cssitekit"
            element={<Layout children={<CS_SiteKit />} />}
          />

          <Route
            path="/study-management/drug-return/depotkit"
            element={<Layout children={<DepotKit />} />}
          />

          <Route
            path="/study-management/drug-return/depot-reconciliation"
            element={<Layout children={<DepotReconciliation />} />}
          />

          <Route
            path="/study-management/drug-return/depot-acknowledgement"
            element={<Layout children={<DepotAcknowledgement />} />}
          />

          <Route
            path="/study-management/drug-return/depot-site"
            element={<Layout children={<DepotToSite />} />}
          />

          <Route
            path="/study-management/drug-return/replace-drug"
            element={<Layout children={<ReplaceDrug />} />}
          />

          <Route
            path="/study-management/drug-return/site-depot"
            element={<Layout children={<SiteToDepot />} />}
          />

          <Route
            path="/study-management/drug-return/subject-site"
            element={<Layout children={<SubjectToSite />} />}
          />

          <Route
            path="/study-management/study-settings/alert-variable"
            element={
              <Layout
                children={<StudySettings children={<AlertVariable />} />}
              />
            }
          />

          <Route
            path="/study-management/study-settings/drug-variable"
            element={
              <Layout
                children={<StudySettings children={<DrugVariable />} />}
              />
            }
          />

          <Route
            path="/study-management/study-settings/ecoa-variable"
            element={
              <Layout
                children={<StudySettings children={<EcoaVariable />} />}
              />
            }
          />

          <Route
            path="/study-management/study-settings/ecoa-handheld-var"
            element={
              <Layout
                children={<StudySettings children={<EcoaHandHeldVar />} />}
              />
            }
          />

          <Route
            path="/study-management/study-settings/ecoa-site-var"
            element={
              <Layout children={<StudySettings children={<EcoaSiteVar />} />} />
            }
          />

          <Route
            path="/study-management/study-settings/study-variable"
            element={
              <Layout
                children={<StudySettings children={<StudyVariable />} />}
              />
            }
          />

          <Route
            path="/study-management/study-settings/subject-variable"
            element={
              <Layout
                children={<StudySettings children={<SubjectVariable />} />}
              />
            }
          />

          {/* Main Side Bar */}
          <Route
            path="/study-management/study-settings/alarms"
            element={<Layout children={<Alarms />} />}
          />
          <Route
            path="/study-management/study-settings/business-rules"
            element={<Layout children={<BusinessRules />} />}
          />
          <Route
            path="/study-management/study-settings/create-business-rules"
            element={<Layout children={<CreateBusinessRules />} />}
          />
          <Route
            path="/study-management/study-settings/edit-business-rules"
            element={<Layout children={<EditBusinessRules />} />}
          />
          <Route
            path="/study-management/study-settings/countries-of-system"
            element={<Layout children={<CountriesOfSystem />} />}
          />
          <Route
            path="/study-management/study-settings/dcf-workflow"
            element={<Layout children={<DCFWorkFlow />} />}
          />
          <Route
            path="/study-management/study-settings/email-builder"
            element={<Layout children={<EmailBuilder />} />}
          />
          <Route
            path="/study-management/study-settings/email-builder/create"
            element={<Layout children={<CreateEmail />} />}
          />
          <Route
            path="/study-management/study-settings/email-builder/edit"
            element={<Layout children={<EditEmail />} />}
          />
          <Route
            path="/study-management/study-settings/languages-of-system"
            element={<Layout children={<LanguagesOfSystem />} />}
          />
          <Route
            path="/study-management/study-settings/reports"
            element={<Layout children={<Reports />} />}
          />
          <Route
            path="/study-management/study-settings/study-files"
            element={<Layout children={<StudyFiles />} />}
          />
          <Route
            path="/study-management/study-settings/submit-actions"
            element={<Layout children={<SubmitActions />} />}
          />
          <Route
            path="/study-management/study-settings/submit-actions/create"
            element={<Layout children={<CreateActions />} />}
          />
          <Route
            path="/study-management/study-settings/submit-actions/edit"
            element={<Layout children={<EditActions />} />}
          />
          <Route
            path="/study-management/study-settings/translations"
            element={<Layout children={<Translations />} />}
          />
          <Route
            path="/study-management/study-settings/translations/import"
            element={<Layout children={<Import />} />}
          />
          <Route
            path="/study-management/study-settings/translations/export"
            element={<Layout children={<Export />} />}
          />
          <Route
            path="/study-management/study-settings/widgets"
            element={<Layout children={<Widgets />} />}
          />
          <Route
            path="/study-management/study-settings/widgets/add"
            element={<Layout children={<AddWidget />} />}
          />
          <Route
            path="/study-management/study-settings/widgets/edit"
            element={<Layout children={<EditWidget />} />}
          />

          {/* Main Side Bar */}

          {/* TEST ROUTE */}
          <Route
            path="/study-management/study-settings/test-lang"
            element={<Layout children={<TestLanguages />} />}
          />
          {/* TEST ROUTE */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}
