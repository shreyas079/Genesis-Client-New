import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaArrowRight, FaArrowDown } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import {
  getStudyRoles,
  getStudyRoleById,
  assignStudyRoles,
} from "../../../services/study_roles";
import { createTheme } from "@mui/material/styles";
import {
  DataGridPro,
  gridTabIndexColumnHeaderSelector,
  GridToolbar,
} from "@mui/x-data-grid-pro";
import { Container, Row, Col } from "react-bootstrap";
import jeep from "../../../assets/sponsors/jeep.png";
import arrowDown from "../../../assets/svgs/arrow_down.svg";
import "./User.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  width: "80%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const getMuiTheme = createTheme({
  typography: {
    fontSize: 20,
  },
  ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    color: "#000000 !important",
  },
});

function BasicCard({ siteName }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Site
        </Typography>
        <Typography color="text.secondary">{siteName}</Typography>
      </CardContent>
    </Card>
  );
}

const RolesSites = ({
  study,
  key1,
  roleUserId,
  sponsorName,
  sponsorImage,
  showRolesActive,
  showRolesAndSites,
  activeArrow,
}) => {
  const [load, setLoad] = React.useState(true);
  const [studyRoles, setStudyRoles] = React.useState([
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
  const [pageSize, setPageSize] = React.useState(5);

  const navigate = useNavigate();

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

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [roleBtnDisabled, setRoleBtnDisabled] = React.useState(true);
  const [assignStudyData, setAssignStudyData] = React.useState({});

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const open1 = Boolean(anchorEl1);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const fetchStudyRoles = async () => {
    try {
      setLoad(true);
      const res = await getStudyRoles();

      setStudyRoles(res.data);

      if (res.status === 200) {
        setLoad(false);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  const roleIdRequired = () =>
    toast.warn("Role id is not found", {
      // theme: "colored",
      toastId: "roleIdRequired",
    });

  const roleAssigned = () =>
    toast.success("Role assigned successfully", {
      // theme: "colored",
      toastId: "roleAssigned",
    });

  const roleAlreadyAssigned = () =>
    toast.warn("Study role is already assigned", {
      // theme: "colored",
      toastId: "roleAssigned",
    });

  const studyIdNotFound = () =>
    toast.warn("Study id not found", {
      // theme: "colored",
      toastId: "studyIdRequired",
    });

  const userIdNotFound = () =>
    toast.warn("User id not found", {
      // theme: "colored",
      toastId: "userIdRequired",
    });

  React.useEffect(() => {
    setLoad(true);

    fetchStudyRoles();
  }, []);

  const handleRole1Click = (event) => {
    setAnchorEl1(event.currentTarget);
    setModalData(study);
    setModalOpen(true);
  };

  const handleRole1Close = () => {
    setAnchorEl1(null);
  };

  const handleRoleId = async (item, studyId, roleUserId) => {
    // setSelectedIndex(key2);
    if (!item) {
      roleIdRequired();
    } else if (!studyId) {
      studyIdNotFound();
    } else if (!roleUserId) {
      userIdNotFound();
    } else {
      const data = {
        studyRoleId: item,
        studiesId: studyId,
        userId: roleUserId,
      };

      setAssignStudyData(data);
      setRoleBtnDisabled(false);
    }
  };

  // const handleActiveArrow = (e, studyId) => {
  //   e.preventDefault();
  //   setActiveArrow(studyId);
  // };

  // const handleAssignRole = async (assignStudyData) => {
  //   setAnchorEl1(null);
  //   const filterId = assignStudyData.studyRoleId;
  //   console.log("Assign Study Data ===> ", assignStudyData);
  //   setLoad(true);
  //   try {
  //     const res = await assignStudyRoles(assignStudyData);
  //     console.log("ASSIGN RESSS ===> ", res);
  //     if (res.status === 200) {
  //       setLoad(false);
  //       let filterRoles = studyRoles.filter((item) => item.id !== filterId);
  //       setStudyRoles(filterRoles);
  //       roleAssigned();
  //     }
  //   } catch (err) {
  //     setLoad(false);
  //     roleAlreadyAssigned();
  //     console.log("Error: ", err);
  //   }
  // };

  const rows = staticStudyRoles.map((row) => ({
    id: row.id,
    name: row.description,
    concurrencyStamp: row.concurrencyStamp,
  }));

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Roles",
      width: 250,
    },
    {
      field: "concurrencyStamp",
      headerName: "Select",
      width: 250,
      renderCell: (params) => {
        const roleId = params.row.id;
        const studyId = study.id;
        const userId = roleUserId;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              // color: "white",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => handleRoleId(roleId, studyId, userId)}
          >
            <FaCheck
              style={{
                fontSize: "20px",
                color: "red !important",
                // marginLeft: "60px",
              }}
            />
          </button>
        );
      },
    },
  ];

  const rows2 = studySites.map((row) => ({
    id: row.id,
    name: row.name,
    editId: row.editId,
  }));

  const columns2 = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Sites",
      width: 250,
    },
    {
      field: "editId",
      headerName: "Select",
      width: 250,
      renderCell: (params) => {
        const siteId = params.row.id;
        const studyId = study.id;
        const userId = roleUserId;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              // color: "white",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          // onClick={() => handleRoleId(roleId, studyId, userId)}
          >
            <FaCheck
              style={{
                fontSize: "20px",
                color: "red !important",
                // marginLeft: "60px",
              }}
            />
          </button>
        );
      },
    },
  ];

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
        <div className="sponsorBodyUserContainer" key={key1}>
          <div
            className="sponsorBodyUser"
            onClick={(e) =>
              showRolesAndSites(e, sponsorName, study?.name, study?.id)
            }
          >
            <img src={sponsorImage} className="sponsorImageUser" />
            <div className="userTextContainer">
              <p className="sponsorSubUser">
                {sponsorName} - {study?.name}
              </p>
              <p className="sponsorSubUser">
                Role & Sites
                {activeArrow === study?.id ? (
                  <FaArrowDown className="arrowIcon" />
                ) : (
                  <FaArrowRight className="arrowIcon" />
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RolesSites;
