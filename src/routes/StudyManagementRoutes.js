/* Study Management. Pages*/
import StudyBuilderLayout from "../components/StudyBuilderLayout/StudyBuilderLayout";

import StudyManagement from "../pages/admin/StudyManagement/StudyManagement";
import ManageInfo from "../pages/admin/StudyManagement/ManageInfo";
import LanguageStudy from "../pages/admin/StudyManagement/LanguageStudy";
import Languages from "../pages/admin/StudySetup/Languages/Languages";
// import AddLanguages from "../pages/admin/StudySetup/Languages/AddLanguage";
// import Countries from "../pages/admin/StudySetup/Countries/Countries";
import ManageCountries from "../pages/admin/StudySetup/Countries/ManageCountries";
import Countries from "../pages/admin/StudySetup/Countries/Countries";
import SubjectAttributes from "../pages/admin/StudySetup/SubjectAttributes/SubjectAttributes";

// Caregiver. Pages
import Caregivers from "../pages/admin/StudySetup/Caregivers/Caregivers";
import CreateCareGiver from "../pages/admin/StudySetup/Caregivers/CreateCaregiver";
import EditCareGiver from "../pages/admin/StudySetup/Caregivers/EditCaregiver";

import DrugTypes from "../pages/admin/StudySetup/DrugTypes";

// Dosage Level. Pages
import DoseLevels from "../pages/admin/StudySetup/DoseageLevels/DoseLevels";
import CreateDoseLevels from "../pages/admin/StudySetup/DoseageLevels/CreateDoseLevels";
import EditDoseLevels from "../pages/admin/StudySetup/DoseageLevels/EditDoseLevels";

// Treatment. Pages
import Treatment from "../pages/admin/StudySetup/Treatment/Treatment";
import CreateTreatment from "../pages/admin/StudySetup/Treatment/CreateTreatment";
import EditTreatment from "../pages/admin/StudySetup/Treatment/EditTreatment";

// Visit. Pages
import Visits from "../pages/admin/StudySetup/Visits/Visits";
import CreateVisit from "../pages/admin/StudySetup/Visits/CreateVisit";
import EditVisit from "../pages/admin/StudySetup/Visits/EditVisit";

// Questionnaire
import Questionnaire from "../pages/admin/StudySetup/Questionaire";

// Dispensations
import Dispensations from "../pages/admin/StudySetup/Dispensation/Dispensations";
import CreateDispensation from "../pages/admin/StudySetup/Dispensation/CreateDispensation";
import EditDispensation from "../pages/admin/StudySetup/Dispensation/EditDispensation";

// Drug Return Config
import DrugReturnConfig from "../pages/admin/StudySetup/DrugReturn/DrugReturnConfig";
import ApproveQuarantine from "../pages/admin/StudySetup/DrugReturn/ApproveQuarantine";
import CraRecociliation from "../pages/admin/StudySetup/DrugReturn/CraRecociliation";
import CS_SiteKit from "../pages/admin/StudySetup/DrugReturn/CS_SiteKit";
import DepotKit from "../pages/admin/StudySetup/DrugReturn/DepotKit";
import DepotReconciliation from "../pages/admin/StudySetup/DrugReturn/DepotReconciliation";
import DepotAcknowledgement from "../pages/admin/StudySetup/DrugReturn/DepotAcknowledgement";
import DepotToSite from "../pages/admin/StudySetup/DrugReturn/DepotToSite";
import ReplaceDrug from "../pages/admin/StudySetup/DrugReturn/ReplaceDrug";
import SiteToDepot from "../pages/admin/StudySetup/DrugReturn/SiteToDepot";
import SubjectToSite from "../pages/admin/StudySetup/DrugReturn/SubjectToSite";

// Study Settings
import StudySettings from "../pages/admin/StudySetup/StudySettings/StudySettings";
import AlertVariable from "../pages/admin/StudySetup/StudySettings/AlertVariable";
import DrugVariable from "../pages/admin/StudySetup/StudySettings/DrugVariable";
import EcoaVariable from "../pages/admin/StudySetup/StudySettings/EcoaVariable";
import EcoaSiteVar from "../pages/admin/StudySetup/StudySettings/EcoaSiteVar";
import EcoaHandHeldVar from "../pages/admin/StudySetup/StudySettings/EcoaHandledVar";
import StudyVariable from "../pages/admin/StudySetup/StudySettings/StudyVariable";
import SubjectVariable from "../pages/admin/StudySetup/StudySettings/SubjectVariable";

// Main Sidebar Links
import Alarms from "../pages/admin/StudySetup/MainSidebar/Alarms/Alarms";

// Business Rules CRUD
import BusinessRules from "../pages/admin/StudySetup/MainSidebar/BusinessRules/BusinessRules";
import CreateBusinessRules from "../pages/admin/StudySetup/MainSidebar/BusinessRules/CreateBusinessRules";
import EditBusinessRules from "../pages/admin/StudySetup/MainSidebar/BusinessRules/EditBusinessRules";

import CountriesOfSystem from "../pages/admin/StudySetup/MainSidebar/CountriesOfSystem/CountriesOfSystem";
import DCFWorkFlow from "../pages/admin/StudySetup/MainSidebar/DCFWorkFlow/DCFWorkFlow";

// Email Builder CRUD
import EmailBuilder from "../pages/admin/StudySetup/MainSidebar/EmailBuilder/EmailBuilder";
import CreateEmail from "../pages/admin/StudySetup/MainSidebar/EmailBuilder/CreateEmail";
import EditEmail from "../pages/admin/StudySetup/MainSidebar/EmailBuilder/EditEmail";

import LanguagesOfSystem from "../pages/admin/StudySetup/MainSidebar/LanguagesOfSystem/LanguagesOfSystem";
import Reports from "../pages/admin/StudySetup/MainSidebar/Reports/Reports";
import StudyFiles from "../pages/admin/StudySetup/MainSidebar/StudyFiles/StudyFiles";

// Submit Actions CRUD
import SubmitActions from "../pages/admin/StudySetup/MainSidebar/SubmitActions/SubmitActions";
import CreateActions from "../pages/admin/StudySetup/MainSidebar/SubmitActions/CreateActions";
import EditActions from "../pages/admin/StudySetup/MainSidebar/SubmitActions/EditActions";

import Translations from "../pages/admin/StudySetup/MainSidebar/Translations/Translations";
import Import from "../pages/admin/StudySetup/MainSidebar/Translations/Import";
import Export from "../pages/admin/StudySetup/MainSidebar/Translations/Export";

import Widgets from "../pages/admin/StudySetup/MainSidebar/Widgets/Widgets";
import AddWidget from "../pages/admin/StudySetup/MainSidebar/Widgets/AddWidget";
import EditWidget from "../pages/admin/StudySetup/MainSidebar/Widgets/EditWidget";

//TESTING
import TestLanguages from "../pages/admin/StudySetup/Languages/TestLanguages";

const studyManagementRoutes = [
    {
      path: "/study-management",
      element: <StudyBuilderLayout children={<StudyManagement />} />,
    },
    {
      path: "/manage-info",
      element: <Layout children={<ManageInfo />} />,
    },
    {
      path: "/language-study",
      element: <Layout children={<LanguageStudy />} />,
    },
    {
      path: "/study-management/languages",
      element: <Layout children={<Languages />} />,
    },
    {
      path: "/study-management/countries",
      element: <Layout children={<Countries />} />,
    },
    {
      path: "/study-management/subject-attributes",
      element: <Layout children={<SubjectAttributes />} />,
    },
    {
      path: "/study-management/care-givers",
      element: <Layout children={<Caregivers />} />,
    },
    {
      path: "/study-management/care-givers/create-caregiver",
      element: <Layout children={<CreateCareGiver />} />,
    },
    {
      path: "/study-management/care-givers/edit-caregiver",
      element: <Layout children={<EditCareGiver />} />,
    },
    {
      path: "/study-management/drug-types",
      element: <Layout children={<DrugTypes />} />,
    },
    {
      path: "/study-management/dose-levels",
      element: <Layout children={<DoseLevels />} />,
    },
    {
      path: "/study-management/dose-levels/create-dose",
      element: <Layout children={<CreateDoseLevels />} />,
    },
    {
      path: "/study-management/dose-levels/edit-dose",
      element: <Layout children={<EditDoseLevels />} />,
    },
    {
      path: "/study-management/treatment",
      element: <Layout children={<Treatment />} />,
    },
    {
      path: "/study-management/treatment/create-treatment",
      element: <Layout children={<CreateTreatment />} />,
    },
    {
      path: "/study-management/treatment/edit-treatment",
      element: <Layout children={<EditTreatment />} />,
    },
    {
      path: "/study-management/visits",
      element: <Layout children={<Visits />} />,
    },
    {
      path: "/study-management/visits/create",
      element: <Layout children={<CreateVisit />} />,
    },
    {
      path: "/study-management/visits/edit",
      element: <Layout children={<EditVisit />} />,
    },
    {
      path: "/study-management/questionnaire",
      element: <Layout children={<Questionnaire />} />,
    },
    {
      path: "/study-management/dispensations",
      element: <Layout children={<Dispensations />} />,
    },
    {
      path: "/study-management/dispensations/create",
      element: <Layout children={<CreateDispensation />} />,
    },
    {
      path: "/study-management/dispensations/edit",
      element: <Layout children={<EditDispensation />} />,
    },
    {
      path: "/study-management/drug-return",
      element: <Layout children={<DrugReturnConfig />} />,
    },
    {
      path: "/study-management/drug-return/approve",
      element: <Layout children={<ApproveQuarantine />} />,
    },
    {
      path: "/study-management/drug-return/reconciliation",
      element: <Layout children={<CraRecociliation />} />,
    },
    {
      path: "/study-management/drug-return/cssitekit",
      element: <Layout children={<CS_SiteKit />} />,
    },
    {
      path: "/study-management/drug-return/depotkit",
      element: <Layout children={<DepotKit />} />,
    },
    {
      path: "/study-management/drug-return/depot-reconciliation",
      element: <Layout children={<DepotReconciliation />} />,
    },
    {
      path: "/study-management/drug-return/depot-acknowledgement",
      element: <Layout children={<DepotAcknowledgement />} />,
    },
    {
      path: "/study-management/drug-return/depot-site",
      element: <Layout children={<DepotToSite />} />,
    },
    {
      path: "/study-management/drug-return/replace-drug",
      element: <Layout children={<ReplaceDrug />} />,
    },
    {
      path: "/study-management/drug-return/site-depot",
      element: <Layout children={<SiteToDepot />} />,
    },
    {
      path: "/study-management/drug-return/subject-site",
      element: <Layout children={<SubjectToSite />} />,
    },
    {
      path: "/study-management/study-settings/alert-variable",
      element: (
        <Layout children={<StudySettings children={<AlertVariable />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/drug-variable",
      element: (
        <Layout children={<StudySettings children={<DrugVariable />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/ecoa-variable",
      element: (
        <Layout children={<StudySettings children={<EcoaVariable />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/ecoa-handheld-var",
      element: (
        <Layout children={<StudySettings children={<EcoaHandHeldVar />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/ecoa-site-var",
      element: (
        <Layout children={<StudySettings children={<EcoaSiteVar />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/study-variable",
      element: (
        <Layout children={<StudySettings children={<StudyVariable />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/subject-variable",
      element: (
        <Layout children={<StudySettings children={<SubjectVariable />} />} />
      ),
    },
    {
      path: "/study-management/study-settings/alarms",
      element: <Layout children={<Alarms />} />,
    },
    {
      path: "/study-management/study-settings/business-rules",
      element: <Layout children={<BusinessRules />} />,
    },
    {
      path: "/study-management/study-settings/create-business-rules",
      element: <Layout children={<CreateBusinessRules />} />,
    },
    {
      path: "/study-management/study-settings/edit-business-rules",
      element: <Layout children={<EditBusinessRules />} />,
    },
    {
      path: "/study-management/study-settings/countries-of-system",
      element: <Layout children={<CountriesOfSystem />} />,
    },
    {
      path: "/study-management/study-settings/dcf-workflow",
      element: <Layout children={<DCFWorkFlow />} />,
    },
    {
      path: "/study-management/study-settings/email-builder",
      element: <Layout children={<EmailBuilder />} />,
    },
    {
      path: "/study-management/study-settings/email-builder/create",
      element: <Layout children={<CreateEmail />} />,
    },
    {
      path: "/study-management/study-settings/email-builder/edit",
      element: <Layout children={<EditEmail />} />,
    },
    {
      path: "/study-management/study-settings/languages-of-system",
      element: <Layout children={<LanguagesOfSystem />} />,
    },
    {
      path: "/study-management/study-settings/reports",
      element: <Layout children={<Reports />} />,
    },
    {
      path: "/study-management/study-settings/study-files",
      element: <Layout children={<StudyFiles />} />,
    },
    {
      path: "/study-management/study-settings/submit-actions",
      element: <Layout children={<SubmitActions />} />,
    },
    {
      path: "/study-management/study-settings/submit-actions/create",
      element: <Layout children={<CreateActions />} />,
    },
    {
      path: "/study-management/study-settings/submit-actions/edit",
      element: <Layout children={<EditActions />} />,
    },
    {
      path: "/study-management/study-settings/translations",
      element: <Layout children={<Translations />} />,
    },
    {
      path: "/study-management/study-settings/translations/import",
      element: <Layout children={<Import />} />,
    },
    {
      path: "/study-management/study-settings/translations/export",
      element: <Layout children={<Export />} />,
    },
    {
      path: "/study-management/study-settings/widgets",
      element: <Layout children={<Widgets />} />,
    },
    {
      path: "/study-management/study-settings/widgets/add",
      element: <Layout children={<AddWidget />} />,
    },
    {
      path: "/study-management/study-settings/widgets/edit",
      element: <Layout children={<EditWidget />} />,
    },
    {
      path: "/study-management/study-settings/test-lang",
      element: <Layout children={<TestLanguages />} />,
    },
  ];
  
  export default studyManagementRoutes;
  