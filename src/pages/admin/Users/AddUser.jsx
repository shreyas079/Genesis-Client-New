import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  registerAdminNew,
  registerUser,
  getSponsorBasedStudy,
} from "../../../services/users";
import { getAllSponsors, getSponsorImage } from "../../../services/sponsors";
import { getStudyById } from "../../../services/studies";
import {
  getStudyRoles,
  getStudyRoleById,
  assignStudyRoles,
} from "../../../services/study_roles";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Container, Row, Col } from "react-bootstrap";
import RolesSites from "./RolesSites";
import "./User.css";
import DialogBox from "../../../components/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import arrowDown from "../../../assets/svgs/arrow_down.svg";
import { FaCheckCircle } from "react-icons/fa";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const AddUser = () => {
  const [value, setValue] = React.useState(0);
  const [showRowSite, setShowRowSite] = React.useState("");
  const [load, setLoad] = React.useState(true);
  const [sponsorsData, setSponsorsData] = React.useState([]);
  const [newSponsor, setNewSponsor] = React.useState([]);
  const [sponsorChecked, setSponsorChecked] = React.useState(() =>
    newSponsor.map((i) => false)
  );
  const [checkedSponsorId, setCheckedSponsorId] = React.useState([]);

  const [checkStudy, setCheckStudy] = React.useState([]);
  const [enrolledStudy, setEnrolledStudy] = React.useState([]);

  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [staticPass, setStaticPass] = React.useState("");
  const [isStaticChecked, setIsStaticChecked] = React.useState(false);
  const [isAdminChecked, setIsAdminChecked] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);

  const [adminFirstName, setAdminFirstName] = React.useState("");
  const [adminMiddleName, setAdminMiddleName] = React.useState("");
  const [adminEmail, setAdminEmail] = React.useState("");
  const [adminLastName, setAdminLastName] = React.useState("");
  const [testPhone, setTestPhone] = React.useState("");

  const [testPhoneUser, setTestPhoneUser] = React.useState("");

  const [studyRoles, setStudyRoles] = React.useState([]);
  const [roleUserId, setRoleUserId] = React.useState("");
  const [roleStudyId, setRoleStudyId] = React.useState("");
  const [roleId, setRoleId] = React.useState("");

  const [operationDone, setOperationDone] = React.useState(false);

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [callStudyImageApi, setCallStudyImageApi] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [activeRole, setActiveRole] = React.useState("");
  const [activeSite, setActiveSite] = React.useState("");
  const [activeArrSites, setActiveArrSites] = React.useState([]);
  const [activeArrStudies, setActiveArrStudies] = React.useState([]);

  const [showRolesActive, setShowRolesActive] = React.useState(false);
  const [activeSponsor, setActiveSponsor] = React.useState("");
  const [activeStudy, setActiveStudy] = React.useState("");

  const [activeArrow, setActiveArrow] = React.useState("");

  const open1 = Boolean(anchorEl1);

  const [staticStudyRoles, setStaticStudyRoles] = React.useState([
    {
      description: "BioStats",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "ce84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "BS",
      normalizedName: "BS",
      concurrencyStamp: "95efc3f4-5928-45d1-bef2-3f42c795e300",
    },
    {
      description: "Clinical Research Associate\r\n",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "cf84a2a4-1bf2-e611-80d8-000d3a1029a9\r\n",
      name: "CR",
      normalizedName: "CR",
      concurrencyStamp: "0ff47c6d-bc57-4318-bdb3-6ba978450437\r\n",
    },
    {
      description: "Clinical Supply Manager",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d084a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "CS",
      normalizedName: "CS",
      concurrencyStamp: "2213f213-d093-4381-9e52-08835d84b9aa",
    },
    {
      description: "Depot Vendor",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d184a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "DV",
      normalizedName: "DV",
      concurrencyStamp: "0f9b3ee6-0ee8-4e7d-b1ec-7941d9056e12",
    },
    {
      description: "Investigator",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d284a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "IV",
      normalizedName: "IV",
      concurrencyStamp: "c3310f92-0661-40f8-bc44-7d2038da34e8",
    },
    {
      description: "Medical Monitor",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d384a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "MM",
      normalizedName: "MM",
      concurrencyStamp: "6af24697-82ff-4937-a1e4-966a0ced45b7",
    },
    {
      description: "Pharmacist",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d484a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "PH",
      normalizedName: "PH",
      concurrencyStamp: "dd6c00d0-668e-4722-aa9f-a85ad994e93f",
    },
    {
      description: "Clinical Project Manager",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d584a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "PM",
      normalizedName: "PM",
      concurrencyStamp: "b7878951-67ed-4724-a375-b75657ae4c2a",
    },
    {
      description: "Pharmacovigilence",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d684a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "PV",
      normalizedName: "PV",
      concurrencyStamp: "77c64551-395e-4553-b7c2-5a78eba98584",
    },
    {
      description: "Reports User",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d784a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "RP",
      normalizedName: "RP",
      concurrencyStamp: "8b62e233-de6b-4a87-9d84-b02f4d6f0648",
    },
    {
      description: "Study Coordinator",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d884a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "SC",
      normalizedName: "SC",
      concurrencyStamp: "a62aa0e0-5cad-414e-a120-608986ce2b7b",
    },
    {
      description: "Sub-Investigator",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "d984a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "SI",
      normalizedName: "SI",
      concurrencyStamp: "17ee29b2-8386-4394-a4db-4de59e34e477",
    },
    {
      description: "Sponsor",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "da84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "SP",
      normalizedName: "SP",
      concurrencyStamp: "a6be84c6-6ecd-4144-b59e-9be3eb474dc8",
    },
    {
      description: "Subject",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "db84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "SU",
      normalizedName: "SU",
      concurrencyStamp: "d773a3fe-0bb0-48d7-81d5-ac96e9176f87",
    },
    {
      description: "Trial Manager",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "dc84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "TM",
      normalizedName: "TM",
      concurrencyStamp: "5e3718b1-97f0-424b-8174-b4d6dc522a1f",
    },
    {
      description: "Unblinded System Approver",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "dd84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "UA",
      normalizedName: "UA",
      concurrencyStamp: "ce85c509-f5fe-49c1-8ffd-c03be8b049e3",
    },
    {
      description: "Unblinded CRA",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "de84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "UB",
      normalizedName: "UB",
      concurrencyStamp: "aa7803be-df77-4f19-b072-9fade635b49c",
    },
    {
      description: "Genesis",
      isBlinded: false,
      lastUpdate: "2022-11-16T11:05:09.256",
      autoAssigneNewSites: true,
      id: "df84a2a4-1bf2-e611-80d8-000d3a1029a9",
      name: "ADM",
      normalizedName: "ADM",
      concurrencyStamp: "9c1efc66-20d4-42ae-a853-b37c932e2b92",
    },
  ]);

  const [studySites, setStudySites] = React.useState([
    {
      id: 1,
      name: "Initial Site 1",
      editId: 1,
    },
    {
      id: 2,
      name: "Initial Site 2",
      editId: 2,
    },
    {
      id: 3,
      name: "Initial Site 3",
      editId: 3,
    },
    {
      id: 4,
      name: "Initial Site 4",
      editId: 4,
    },
    {
      id: 5,
      name: "Initial Site 5",
      editId: 5,
    },
    {
      id: 6,
      name: "Initial Site 6",
      editId: 6,
    },
    {
      id: 7,
      name: "Initial Site 7",
      editId: 7,
    },
    {
      id: 8,
      name: "Initial Site 8",
      editId: 8,
    },
    {
      id: 9,
      name: "Initial Site 9",
      editId: 9,
    },
    {
      id: 10,
      name: "Initial Site 10",
      editId: 10,
    },
  ]);

  const [studyRoleSitesObject, setStudyRoleSitesObject] = React.useState([]);
  const [activeStudyRole, setActiveStudyRole] = React.useState(null);
  const rows = staticStudyRoles.map((row) => ({
    id: row.id,
    name: row.name,
    concurrencyStamp: row.concurrencyStamp,
    description: row.description,
  }));

  const rows2 = studySites.map((row) => ({
    id: row.id,
    name: row.name,
    editId: row.editId,
  }));

  const fetchSponsors = async () => {
    try {
      const res = await getAllSponsors();
      let activeSponsors = res.data.filter((item) => item.isActive === true);
      setSponsorsData(activeSponsors);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  const getImage = async () => {
    const temp = [];
    if (sponsorsData.length !== 0) {
      sponsorsData.map(async (item, key) => {
        const res = await getSponsorImage(item.imageUrl);
        const preview = res.data;

        const {
          createdBy,
          dateCreated,
          dateUpdated,
          id,
          imageUrl,
          isActive,
          name,
          secret,
          studies,
          updatedBy,
        } = item;

        temp.push({
          createdBy,
          dateCreated,
          dateUpdated,
          id,
          imageUrl,
          isActive,
          name,
          secret,
          studies,
          updatedBy,
          previewImg: `${preview}`,
        });
      });
      setNewSponsor(temp);
      setLoad(false);
    }
  };

  const handleSelectAllSites = (e, sID) => {
    e.preventDefault();
    const temp = rows2.map((site) => site.name);

    let studyObject = studyRoleSitesObject;
    let studyIndex = studyObject.findIndex((study) => study.studyId === sID);
    if (studyIndex >= 0) {
      studyObject[studyIndex].sites = temp;
      setStudyRoleSitesObject([...studyObject]);
    }
    setActiveStudyRole((study) => ({
      ...study,
      sites: temp,
    }));
    setActiveArrSites(temp);
  };

  const handleActiveSites = (e, siteName, sID) => {
    e.preventDefault();
    let studyObject = studyRoleSitesObject;
    let studyIndex = studyObject.findIndex((study) => study.studyId === sID);
    if (studyIndex >= 0) {
      studyObject[studyIndex].sites = [
        ...studyObject[studyIndex].sites,
        siteName,
      ];
      setStudyRoleSitesObject([...studyObject]);
    }
    setActiveStudyRole((study) => ({
      ...study,
      sites: [...study.sites, siteName],
    }));
  };

  const showRolesAndSites = (e, activeSponsor, activeStudy, sID) => {
    e.preventDefault();

    if (studyRoleSitesObject.some((study) => study.studyId === sID)) {
      setActiveArrow(sID);
      const currentStudyRole = studyRoleSitesObject.find(
        (study) => study.studyId === sID
      );
      if (currentStudyRole && Object.keys(currentStudyRole).length > 0) {
        setActiveStudyRole(currentStudyRole);
      } else {
        setActiveStudyRole({
          studyId: sID,
          study: `${activeSponsor} - ${activeStudy}`,
          roles: activeRole,
          sites: activeArrSites,
        });
      }
    } else {
      setActiveArrStudies([...activeArrStudies, sID]);
      setStudyRoleSitesObject([
        ...studyRoleSitesObject,
        {
          studyId: sID,
          study: `${activeSponsor} - ${activeStudy}`,
          roles: activeRole,
          sites: [],
        },
      ]);
      setActiveStudyRole({
        studyId: sID,
        study: `${activeSponsor} - ${activeStudy}`,
        roles: activeRole,
        sites: [],
      });
      setActiveArrow(sID);
    }
    if (showRowSite === sID) {
      setShowRowSite("");
    } else {
      setShowRowSite(sID);
    }
    setShowRolesActive(true);
    setActiveSponsor(activeSponsor);
    setActiveStudy(activeStudy);
  };

  const getStudyImage = async () => {
    if (checkStudy.length > 0) {
      Promise.allSettled(
        checkStudy.map(async (study) => {
          try {
            const res = await getSponsorImage(study.imageUrl);
            const preview = res.data;

            const {
              createdBy,
              dateCreated,
              dateUpdated,
              id,
              imageUrl,
              isActive,
              name,
              secret,
              studies,
              updatedBy,
            } = study;

            return {
              createdBy,
              dateCreated,
              dateUpdated,
              id,
              imageUrl,
              isActive,
              name,
              secret,
              studies,
              updatedBy,
              previewImg: `${preview}`,
            };
          } catch (err) {
            console.log("Error: ", err);
            return null;
          }
        })
      )
        .then((response) => {
          setEnrolledStudy(response.map(({ value }) => value));
          setCallStudyImageApi(false);
          notifySponsor();
          setValue(2);
          setLoad(false);
        })
        .catch((err) => {
          console.log("Error: ", err);
          setLoad(false);
          setCallStudyImageApi(false);
        });
    } else if (checkStudy.length === 0) {
      setEnrolledStudy([]);
      setLoad(false);
    }
  };

  const roleHandler = (role, sID) => {
    let studyObject = studyRoleSitesObject;
    let studyIndex = studyObject.findIndex((study) => study.studyId === sID);
    if (studyIndex >= 0) {
      studyObject[studyIndex].roles = role;
      setStudyRoleSitesObject([...studyObject]);
    }
    setActiveStudyRole((study) => ({
      ...study,
      roles: role,
    }));
  };
  const fetchStudyRoles = async () => {
    try {
      setLoad(true);
      const res = await getStudyRoles();
      setStudyRoles(res.data);
    } catch (err) {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    setLoad(true);
    fetchSponsors();
    fetchStudyRoles();
  }, []);

  React.useEffect(() => {
    setLoad(true);
    getImage();
  }, [sponsorsData]);

  React.useEffect(() => {
    if (callStudyImageApi === true) {
      setLoad(true);
      getStudyImage();
    }
  }, [callStudyImageApi]);

  // React.useEffect(() => {
  //   console.log("SHOW DIALOG ==> ", showDialog);
  // }, [showDialog]);

  const navigate = useNavigate();

  const validationSchemaUser = yup.object().shape({
    firstName: yup.string().max(255).required("First name is required"),
    middleName: yup.string().max(255).required("Middle name is required"),
    email: yup.string().email().required("User email is required"),
    lastName: yup.string().max(255).required("Last name is required"),
  });

  const validationSchemaAdmin = yup.object().shape({
    adminFirstName: yup.string().max(255).required("First name is required"),
    adminMiddleName: yup.string().max(255).required("Middle name is required"),
    adminEmail: yup.string().email().required("Admin email is required"),
    adminLastName: yup.string().max(255).required("Last name is required"),
  });

  const validationSchemaSponsor = yup.object().shape({
    checkbox: yup.array().min(1),
  });

  const validationSchemaStudy = yup.object().shape({
    checkboxStudy: yup.array(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchemaUser),
  });

  const {
    register: registerAdmin,
    handleSubmit: handleSubmitAdmin,
    watch: watchAdmin,
    control: adminControl,
    formState: { errors: errorsAdmin },
  } = useForm({
    resolver: yupResolver(validationSchemaAdmin),
  });

  const {
    register: registerSponsor,
    handleSubmit: handleSubmitSponsor,
    watch: watchSponsor,
    formState: { errors: errorsSponsor },
  } = useForm({
    resolver: yupResolver(validationSchemaSponsor),
  });

  const {
    register: registerStudy,
    handleSubmit: handleSubmitStudy,
    watch: watchStudy,
    formState: { errors: errorsStudy },
  } = useForm({
    resolver: yupResolver(validationSchemaStudy),
  });

  const generatePassword = () => {
    var length = 8;
    var pass = "Genesis@123";
    setStaticPass(pass);
    return pass;
  };

  const allStudiesRemoved = () =>
    toast.success("Select Study After USer", {
      // theme: "colored",
      toastId: "allStudiesRemoved",
    });

  const studyRemoved = () =>
    toast.success("Study Removed", {
      // theme: "colored",
      toastId: "studyRemoved",
    });

  const notifyPhoneNumber = () =>
    toast.warn("Phone number is required", {
      // theme: "colored",
      toastId: "noPhoneNumber",
    });

  const notifyUserNumber = () =>
    toast.warn("Phone number is required", {
      // theme: "colored",
      toastId: "noUserNumber",
    });

  const notifyStudy = () =>
    toast.success("Study Details Added", {
      // theme: "colored",
      toastId: "createStudyDetailsToast",
    });

  const studyDetailsAdded = () =>
    toast.success("Study Details Added", {
      // theme: "colored",
      toastId: "createStudyDetailsToast",
    });

  const noStudyFound = () =>
    toast.warn("No Study Found", {
      // theme: "colored",
      toastId: "noStudyFound",
    });

  const notifyUser = () =>
    toast.success("User Details Added", {
      // theme: "colored",
      toastId: "createUserSuccessToast",
    });

  const notifyAdmin = () =>
    toast.success("Admin Details Added", {
      // theme: "colored",
      toastId: "createAdminSuccessToast",
    });

  const notifySponsor = () =>
    toast.success("Study Details Added", {
      // theme: "colored",
      toastId: "createSponsorSuccessToast",
    });

  const reqFailed = () =>
    toast.error("Something Went Wrong", {
      // theme: "colored",
      toastId: "reqFailed",
    });

  const cancelAddUser = (e) => {
    e.preventDefault();
    // if (window.confirm("Changes you made will not be saved. Are you sure?")) {
    navigate("/all-users");
    // }
  };

  const cancelUserSponsor = (e) => {
    e.preventDefault();
    // setValue(0);
    // if (window.confirm("Changes you made will not be saved. Are you sure?")) {
    navigate("/all-users");
    // }
  };

  const cancelUserStudy = (e) => {
    e.preventDefault();
    // setValue(1);
    // if (window.confirm("Changes you made will not be saved. Are you sure?")) {
    navigate("/all-users");
    // }
  };

  const onSubmitUser = async (data, e) => {
    setLoad(true);
    e.preventDefault();
    if (testPhoneUser === "") {
      setLoad(false);
      notifyUserNumber();
    } else {
      try {
        const firstName = data.firstName;
        const middleName = data.middleName;
        const email = data.email;
        const lastName = data.lastName;
        const userData = {
          firstName,
          middleName,
          email,
          lastName,
          phoneNumber: testPhoneUser,
          password: "",
          isAdmin: false,
          isActive: isActive,
          staticPass: false,
        };

        setLoad(true);

        const res = await registerUser(userData);

        // setFormValues(data);
        if (res.status) {
          setLoad(false);
          setRoleUserId(res.data.result);
          notifyUser();
          setValue(1);
        } else {
          setLoad(false);
          reqFailed();
        }
      } catch (err) {
        setLoad(false);
        console.log("submit error: ", err);
        reqFailed();
      }
    }
  };

  const onSubmitAdmin = async (data, e) => {
    setLoad(true);
    e.preventDefault();
    if (testPhoneUser === "") {
      setLoad(false);
      notifyPhoneNumber();
    } else {
      try {
        const firstName = data.adminFirstName;
        const middleName = data.adminMiddleName;
        const email = data.adminEmail;
        const lastName = data.adminLastName;
        const adminData = {
          firstName,
          middleName,
          email,
          lastName,
          phoneNumber: testPhoneUser,
          password: "",
          isAdmin: true,
          isActive: isActive,
          staticPass: false,
        };

        const res = await registerAdminNew(adminData);

        if (res.status) {
          setLoad(false);
          setRoleUserId(res.data.result);
          notifyAdmin();
          setValue(1);
        }
      } catch (err) {
        setLoad(false);
        console.log("submit error: ", err);
      }
    }
  };

  const onSubmitSponsor = async (data, e) => {
    e.preventDefault();
    try {
      // setFormValues(data);
      await submitCheckedSponsors();
    } catch (err) {
      console.log("submit error: ", err);
    }
  };

  const onSubmitStudy = (data, e) => {
    e.preventDefault();
    setLoad(true);
    try {
      setShowDialog(false);
      setTimeout(() => {
        setShowDialog(false);
        notifyStudy();
        // navigate("/all-users");
        setLoad(false);
      }, 1000);
    } catch (err) {
      console.log("submit error: ", err);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setShowDialog(true);
  };

  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
    setShowDialog(true);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setShowDialog(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setShowDialog(true);
  };

  const handleAdminFirstNameChange = (event) => {
    setAdminFirstName(event.target.value);
    setShowDialog(true);
  };

  const handleAdminMiddleNameChange = (event) => {
    setAdminMiddleName(event.target.value);
    setShowDialog(true);
  };

  const handleAdminLastNameChange = (event) => {
    setAdminLastName(event.target.value);
    setShowDialog(true);
  };

  const handleAdminEmailChange = (event) => {
    setAdminEmail(event.target.value);
    setShowDialog(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStaticCheck = () => {
    generatePassword();
    setIsStaticChecked(!isStaticChecked);
    setShowDialog(true);
  };

  const handleAdminCheck = () => {
    setIsAdminChecked(!isAdminChecked);
    setShowDialog(true);
  };

  const handleIsActive = () => {
    setIsActive(!isActive);
    setShowDialog(true);
  };

  const onPhoneChange = (value) => {
    setTestPhone(value);
  };

  const onPhoneUserChange = (value) => {
    setTestPhoneUser(value);
    setShowDialog(true);
  };

  const handleSaveCheck = (item, event, index) => {
    if (checkedSponsorId.length === 0) {
      return false;
    } else {
      const array = checkedSponsorId.filter((check) => check === item);
      if (array) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleSponsorId = async (item, event, index) => {
    setShowDialog(true);
    try {
      const isChecked = event.target.checked;
      setSponsorChecked((sponsorChecked) => {
        return sponsorChecked.map((c, i) => {
          if (i === index) return isChecked;
          return c;
        });
      });
      if (isChecked) {
        const id = item;

        if (checkedSponsorId.includes(id)) {
          setCheckedSponsorId(
            checkedSponsorId.filter((sponsor) => sponsor !== id)
          );
          const filterSponsors = checkStudy.filter((study) => study.id !== id);
          setCheckStudy(filterSponsors);
          return true;
        }

        const checkedArray = [];
        checkedArray.push(id);

        setCheckedSponsorId([...checkedSponsorId, ...checkedArray]);
      } else {
        setLoad(true);
        const id = item;

        const filterChecked = checkedSponsorId.filter(
          (sponsor) => sponsor !== id
        );

        setCheckedSponsorId(
          checkedSponsorId.filter((sponsor) => sponsor !== id)
        );
        const filterSponsors = checkStudy.filter((study) => study.id !== id);
        setCheckStudy(filterSponsors);
        setLoad(false);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err);
      noStudyFound();
    }
  };

  const submitCheckedSponsors = async () => {
    try {
      setLoad(true);
      const responses = await Promise.all(
        checkedSponsorId.map(async (id) => {
          const res = await getSponsorBasedStudy(id);
          if (res.status) {
            return res.data;
          } else {
            return null;
          }
        })
      );
      if (responses.length) {
        setCheckStudy(responses);
        setCallStudyImageApi(true);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const isDisabled = (tabIndex) => {
    if (operationDone) {
      return false;
    } else {
      if (value !== tabIndex) {
        return true;
      }
      return false;
    }
  };

  React.useEffect(() => {
    setActiveRole("");
  }, [showRowSite]);

  const tabStyles = {
    fontSize: "12px",
    fontWeight: "700",
  };

  return (
    <>
      {load ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <div className="content-body">
          <DialogBox
            showDialog={showPrompt}
            confirmNavigation={confirmNavigation}
            cancelNavigation={cancelNavigation}
          />

          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/all-users">All Users</Link> |{" "}
            <Link to="/add-user">Add New User</Link>
          </p>
          <Box sx={{ marginTop: "2%" }}>
            <Box sx={{ width: "27%", borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                {/* <Tab label="User" {...a11yProps(0)} />
                <Tab label="Sponsors" {...a11yProps(1)} />
                <Tab label="Studies" {...a11yProps(2)} /> */}
                <Tab
                  sx={tabStyles}
                  label="User"
                  {...a11yProps(0)}
                  disabled={isDisabled(0)}
                />
                <Tab
                  sx={tabStyles}
                  label="Sponsors"
                  {...a11yProps(1)}
                  disabled={isDisabled(1)}
                />
                <Tab
                  sx={tabStyles}
                  label="Studies"
                  {...a11yProps(2)}
                  disabled={isDisabled(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {isAdminChecked ? (
                <>
                  <p className="user-heading">User (Admin)</p>
                  <form onSubmit={handleSubmitAdmin(onSubmitAdmin)}>
                    <div className="userForm-body">
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">First Name</label>

                          <input
                            className="nameField"
                            defaultValue={adminFirstName}
                            type="text"
                            name="adminFirstName"
                            {...registerAdmin("adminFirstName", {
                              required: true,
                            })}
                            onChange={handleAdminFirstNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errorsAdmin.adminFirstName?.message}
                          </span>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}>
                          <label className="userInputLabel">Middle Name</label>

                          <input
                            className="nameField"
                            defaultValue={adminMiddleName}
                            type="text"
                            name="adminMiddleName"
                            {...registerAdmin("adminMiddleName", {
                              required: true,
                            })}
                            onChange={handleMiddleNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errorsAdmin.adminMiddleName?.message}
                          </span>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">Email</label>

                          <input
                            className="nameField"
                            defaultValue={adminEmail}
                            type="email"
                            name="adminEmail"
                            {...registerAdmin("adminEmail", { required: true })}
                            onChange={handleAdminEmailChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errorsAdmin.adminEmail?.message}
                          </span>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}>
                          <label className="userInputLabel">Last Name</label>

                          <input
                            className="nameField"
                            defaultValue={adminLastName}
                            type="text"
                            name="adminLastName"
                            {...registerAdmin("adminLastName", {
                              required: true,
                            })}
                            onChange={handleAdminLastNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errorsAdmin.adminLastName?.message}
                          </span>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">Phone Number</label>
                          <Controller
                            render={({ field }) => (
                              <PhoneInput
                                country={"us"}
                                inputProps={{
                                  name: "testPhoneUser",
                                  required: true,
                                }}
                                name="testPhoneUser"
                                defaultValue={testPhoneUser}
                                onChange={onPhoneUserChange}
                              />
                            )}
                            name="testPhoneUser"
                            control={control}
                          />
                          {/* <span
                  style={{
                    color: "#3661eb",
                    marginTop: "1%",
                    fontSize: "12px",
                  }}
                >
                  {errors.testPhoneUser?.message}
                </span> */}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={4}>
                              <div className="userToggleContainer">
                                <div className="userText">Admin</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isAdminChecked}
                                    onChange={handleAdminCheck}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={4}></Col>
                            <Col md={3}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={4}>
                              <div className="userToggleContainer">
                                <div className="userText">Static Password</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isStaticChecked}
                                    onChange={handleStaticCheck}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={4}></Col>
                            <Col md={3}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={3}>
                              <div className="userToggleContainer">
                                <div className="userText">Active</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isActive}
                                    onChange={handleIsActive}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={9}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={4}>
                          {isStaticChecked ? (
                            <p>Static Password: {staticPass}</p>
                          ) : (
                            <></>
                          )}
                        </Col>
                        <Col md={1}></Col>
                        <Col md={4}></Col>
                        <Col md={3}></Col>
                      </Row>
                      <Row style={{ marginTop: "3%" }}>
                        <Col md={6}></Col>
                        <Col md={6}>
                          <div className="createSponsor-buttons">
                            <button
                              className="sponsorCancelButton"
                              onClick={cancelAddUser}
                            >
                              Cancel
                            </button>
                            <button
                              className="sponsorCreateButton"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <p className="user-heading">User (Non Admin)</p>
                  <form onSubmit={handleSubmit(onSubmitUser)}>
                    <div className="userForm-body">
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">First Name</label>

                          <input
                            className="nameField"
                            defaultValue={firstName}
                            type="text"
                            name="firstName"
                            {...register("firstName", { required: true })}
                            onChange={handleFirstNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errors.firstName?.message}
                          </span>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}>
                          <label className="userInputLabel">Middle Name</label>

                          <input
                            className="nameField"
                            defaultValue={middleName}
                            type="text"
                            name="middleName"
                            {...register("middleName", { required: true })}
                            onChange={handleMiddleNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errors.middleName?.message}
                          </span>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">Email</label>

                          <input
                            className="nameField"
                            defaultValue={email}
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            onChange={handleEmailChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errors.email?.message}
                          </span>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}>
                          <label className="userInputLabel">Last Name</label>

                          <input
                            className="nameField"
                            defaultValue={lastName}
                            type="text"
                            name="lastName"
                            {...register("lastName", { required: true })}
                            onChange={handleLastNameChange}
                          />
                          <span
                            style={{
                              color: "#3661eb",
                              marginTop: "1%",
                              fontSize: "12px",
                            }}
                          >
                            {errors.lastName?.message}
                          </span>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "2%" }}>
                        <Col md={5}>
                          <label className="userInputLabel">Phone Number</label>
                          <Controller
                            render={({ field }) => (
                              <PhoneInput
                                country={"us"}
                                inputProps={{
                                  name: "testPhoneUser",
                                  required: true,
                                }}
                                name="testPhoneUser"
                                onChange={onPhoneUserChange}
                                defaultValue={testPhoneUser}
                              />
                            )}
                            name="testPhoneUser"
                            control={control}
                          />
                          {/* <span
                  style={{
                    color: "#3661eb",
                    marginTop: "1%",
                    fontSize: "12px",
                  }}
                >
                  {errors.testPhoneUser?.message}
                </span> */}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={5}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={4}>
                              <div className="userToggleContainer">
                                <div className="userText">Admin</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isAdminChecked}
                                    onChange={handleAdminCheck}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={4}></Col>
                            <Col md={3}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={4}>
                              <div className="userToggleContainer">
                                <div className="userText">Static Password</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isStaticChecked}
                                    onChange={handleStaticCheck}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={4}></Col>
                            <Col md={3}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={6}>
                          <Row>
                            <Col md={3}>
                              <div className="userToggleContainer">
                                <div className="userText">Active</div>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <AntSwitch
                                    checked={isActive}
                                    onChange={handleIsActive}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </Stack>
                              </div>
                            </Col>
                            <Col md={9}></Col>
                          </Row>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <Row style={{ marginTop: "2%" }}>
                        <Col md={4}>
                          {isStaticChecked ? (
                            <p>Static Password: {staticPass}</p>
                          ) : (
                            <></>
                          )}
                        </Col>
                        <Col md={1}></Col>
                        <Col md={4}></Col>
                        <Col md={3}></Col>
                      </Row>
                      <Row style={{ marginTop: "3%" }}>
                        <Col md={6}></Col>
                        <Col md={6}>
                          <div className="createSponsor-buttons">
                            <button
                              className="sponsorCancelButton"
                              onClick={cancelAddUser}
                            >
                              Cancel
                            </button>
                            <button
                              className="sponsorCreateButton"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </form>
                </>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p className="user-heading">Sponsors (Active)</p>
              {/* {load ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "70vh",
                    }}
                  >
                    <BeatLoader color="#3661eb" />
                  </div>
                </>
              ) : ( */}
              <form onSubmit={handleSubmitSponsor(onSubmitSponsor)}>
                <div className="sponsor-cols">
                  {newSponsor.map((item, index) => (
                    <div className="sponsorSelectBody">
                      <div className="sponsorBodyUser">
                        <Checkbox
                          {...label}
                          checked={checkedSponsorId?.includes(item?.id)}
                          {...registerSponsor("checkbox", { required: true })}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 24,
                              color: "#3661eb",
                            },
                          }}
                          // defaultChecked={(event) => handleSaveCheck(item.id, event, index)}
                          onChange={(event) =>
                            handleSponsorId(item.id, event, index)
                          }
                        />
                        <img
                          src={item.previewImg}
                          className="sponsorImageUser"
                        />
                        <label className="sponsorSubUser">{item.name}</label>
                      </div>
                      <span
                        style={{
                          color: "#3661eb",

                          fontSize: "12px",
                        }}
                      >
                        {errorsSponsor.checkbox?.message
                          ? "Atleast one sponsor is required"
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <Row style={{ marginTop: "3%" }}>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className="createSponsor-buttons">
                      <button
                        className="sponsorCancelButton"
                        onClick={cancelUserSponsor}
                      >
                        Cancel
                      </button>
                      <button className="sponsorCreateButton" type="submit">
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
              {/* )} */}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* <div className="sponsor-cols-studies">
                {enrolledStudy?.map((item, index) => (
                  <div className="sponsorBodyUser">
                    <img src={item?.previewImg} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">{item?.name}</p>
                    </div>
                  </div>
                ))}
              </div> */}
              <p
                className="user-heading"
                style={{ textDecoration: "underline" }}
              >
                Enrolled Studies
              </p>
              <form onSubmit={handleSubmitStudy(onSubmitStudy)}>
                <div
                  className="sponsor-cols-studies"
                  style={{ marginLeft: "18px", display: "flex" }}
                >
                  <Row>
                    <Col md={3}>
                      {enrolledStudy?.map((item, index) => (
                        <Row className="sponsorBodyUserStudy" key={item.id}>
                          <Col>
                            {item.studies.length === 0 ? (
                              <div style={{ fontWeight: "700" }}>
                                {/* {item?.name} Study not found */}
                              </div>
                            ) : (
                              <>
                                {!!item.studies.length &&
                                  item.studies.map((study, key1) => (
                                    <>
                                      <RolesSites
                                        study={study}
                                        key1={key1}
                                        roleUserId={roleUserId}
                                        sponsorName={item?.name}
                                        sponsorImage={item?.previewImg}
                                        showRolesActive={showRowSite}
                                        showRolesAndSites={showRolesAndSites}
                                        activeArrow={activeArrow}
                                      />
                                    </>
                                  ))}
                              </>
                            )}
                          </Col>
                        </Row>
                      ))}
                    </Col>
                    <Col md={1}></Col>
                    {activeStudyRole ? (
                      <>
                        <Col md={3}>
                          <div className="sponsorUserRolesContainer">
                            <div className="sponsorUserRolesHeading">
                              <h4>
                                {activeSponsor} - {activeStudy} Role
                              </h4>
                            </div>
                            {rows.map((role, index) => (
                              <div className="sponsorBodyUserRoles" key={index}>
                                <BootstrapTooltip
                                  title={
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <h5 style={{ color: "#fff" }}>
                                        {role.description}
                                      </h5>
                                    </div>
                                  }
                                  placement="right"
                                >
                                  <div
                                    className={`roleName ${
                                      activeStudyRole.roles === role.name &&
                                      "activeRole"
                                    }`}
                                    onClick={() =>
                                      roleHandler(
                                        role.name,
                                        activeStudyRole.studyId
                                      )
                                    }
                                  >
                                    <p className="rolePTag">{role.name}</p>
                                    {role.name === activeStudyRole.roles && (
                                      <span className="checkIcon">
                                        <FaCheckCircle
                                          style={{
                                            fontSize: "20px",
                                            color: "blue",
                                          }}
                                        />
                                      </span>
                                    )}
                                  </div>
                                </BootstrapTooltip>
                              </div>
                            ))}
                          </div>
                        </Col>
                        <Col md={1}></Col>
                        <Col md={3}>
                          <div className="sponsorUserSitesContainer">
                            <div className="sponsorUserSitesHeading">
                              <h4>
                                {activeSponsor} - {activeStudy} Sites
                              </h4>
                              <div className="selectAllBtnContainer">
                                <button
                                  className="selectAllBtn"
                                  onClick={(e) =>
                                    handleSelectAllSites(
                                      e,
                                      activeStudyRole.studyId
                                    )
                                  }
                                >
                                  Select All Sites
                                </button>
                              </div>
                            </div>
                            {rows2.map((site, index) => (
                              <div className="sponsorBodyUserSites" key={index}>
                                <div
                                  className={`siteName ${
                                    activeStudyRole?.sites?.includes(
                                      site.name
                                    ) && "activeSite"
                                  }`}
                                  onClick={(e) =>
                                    handleActiveSites(
                                      e,
                                      site.name,
                                      activeStudyRole.studyId
                                    )
                                  }
                                >
                                  <p className="sitePTag">{site.name}</p>

                                  {activeStudyRole?.sites?.includes(
                                    site.name
                                  ) && (
                                    <span className="checkIcon">
                                      <FaCheckCircle
                                        style={{
                                          fontSize: "20px",
                                          color: "blue",
                                        }}
                                      />
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Col>
                        <Col md={1}></Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </Row>
                </div>
                <Row style={{ marginTop: "3%" }}>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className="createSponsor-buttons">
                      <button
                        className="sponsorCancelButton"
                        onClick={cancelUserStudy}
                      >
                        Cancel
                      </button>
                      <button className="sponsorCreateButton" type="submit">
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </TabPanel>
          </Box>
        </div>
      )}
    </>
  );
};

export default AddUser;
