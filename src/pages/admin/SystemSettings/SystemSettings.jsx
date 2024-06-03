import React, { useContext } from "react";
import UserContext from "../../../context/user/UserContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  postExportExcel,
  postExportPDF,
  getDownloadReport,
} from "../../../services/sponsors";
import { saveAs } from "file-saver";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MenuItem from "@mui/material/MenuItem";

import { getAllSystemCountries } from "../../../services/system_country";
import { getSystemLanguages } from "../../../services/system_language";
import { getSystemRegion } from "../../../services/system_region";
import { getSystemRoles } from "../../../services/system_roles";

import "../Users/User.css";
import SystemSettingContext from "../../../context/systemSettings/SystemSettings";

const getMuiTheme = createTheme({
  typography: {
    fontSize: 25,
  },
  ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    color: "#000000 !important",
  },
});

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[250],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
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

const SystemSettings = () => {
  const theme = useTheme();
  const { value, setValue } = useContext(UserContext);
  const [pageSize, setPageSize] = React.useState(20);

  const [systemLoad, setSystemLoad] = React.useState(false);

  const [systemCountries, setSystemCountries] = React.useState([]);
  const [systemLanguages, setSystemLanguages] = React.useState([]);
  const [regionsData, setRegionsData] = React.useState([]);
  const [rolesData, setRolesData] = React.useState([]);
  // const { systemData, load, fetchSystemSetting } =
  // useContext(SystemSettingContext);
  // console.log(fetchSystemSetting, 'lklklklk')
  const fetchSystemCountries = async (pageNumber = 1, pageSize = 10) => {
    try {
      const res = await getAllSystemCountries(pageNumber, pageSize);
      console.log(res, 'skjdksjdk')
      if (res.status) {
        setSystemCountries(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchSystemLanguages = async (pageNumber = 1, pageSize = 10) => {
    try {
      const res = await getSystemLanguages(pageNumber, pageSize);
      if (res.status) {
        setSystemLanguages(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchSystemRegion = async () => {
    try {
      const res = await getSystemRegion(pageNumber, pageSize);
      if (res.status) {
        setRegionsData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  
  const fetchSystemRoles = async (pageNumber = 1, pageSize = 10) => {
    try {
      const res = await getSystemRoles(pageNumber, pageSize);
      if (res.status) {
        setRolesData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    setSystemLoad(true);
    fetchSystemCountries();
    fetchSystemLanguages();
    fetchSystemRoles();
    fetchSystemRegion();
  }, []);

  React.useEffect(() => {
    if (
      systemCountries.length >= 0 &&
      systemLanguages.length >= 0 &&
      regionsData.length >= 0 &&
      rolesData.length >= 0
    ) {
      setSystemLoad(false);
    }
  }, [systemCountries, systemLanguages, regionsData, rolesData]);

  // const languagesRows = systemLanguages.map((row) => ({
  //   id: row.id,
  //   cultureName: row.cultureName,
  //   name: row.name,
  //   displayName: row.displayName,
  //   isRightToLeft: row.isRightToLeft,
  //   editId: row?.id,
  //   deleteId: row?.id,
  //   status: row?.isActive,
  // }));
  let languagesRows;
  if (Array.isArray(systemLanguages)) {
    const languagesRows = systemLanguages.map((row) => ({
      id: row.id,
      cultureName: row.cultureName,
      name: row.name,
      displayName: row.displayName,
      isRightToLeft: row.isRightToLeft,
      editId: row?.id,
      deleteId: row?.id,
      status: row?.isActive,
    }));
    // Further processing with languagesRows
  } else {
    console.error("systemLanguages is not an array:", systemLanguages);
  }
  

  const countriesRows = systemCountries.map((row) => ({
    id: row.id,
    name: row.name,
    isoId: row.isoId,
    // notes: row.notes,
    region: row?.systemRegion?.name,
    editId: row?.id,
    status: row?.isActive,
  }));

  const regionRows = regionsData.map((row) => ({
    id: row.id,
    name: row.name,
    editId: row?.id,
    status: row?.isActive,
  }));

  const rolesRows = rolesData.map((row) => ({
    id: row.id,
    name: row.shortName,
    description: row.description,
    isBlinded: row.isBlinded,
    autoAssignNewSites: row?.autoAssignNewSites,
    editId: row?.id,
  }));

  const roleColumns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <div className="grid-id">
            <p>{id}</p>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => {
        const name = params.row.name;

        return (
          <div className="grid-body">
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Description"}</div>,
      renderCell: (params) => {
        const description = params.row.description;

        return (
          <div className="grid-body">
            <p>{description}</p>
          </div>
        );
      },
    },
    {
      field: "isBlinded",
      headerName: "Is Blinded",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Is Blinded"}</div>,
      renderCell: (params) => {
        const isBlinded = params.row.isBlinded;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isBlinded ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
    {
      field: "autoAssignNewSites",
      headerName: "Auto Assign New Sites",
      width: 280,
      renderHeader: () => (
        <div className="grid-heading">{"Auto Assign New Sites"}</div>
      ),
      renderCell: (params) => {
        const autoAssignNewSites = params.row.autoAssignNewSites;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {autoAssignNewSites ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
    {
      field: "status",
      headerName: "Active",
      width: 300,
      renderHeader: () => <div className="grid-heading">{"Active"}</div>,
      renderCell: (params) => {
        const id = params.row.id;
        const blinded = params.row.isBlinded;
        const autoAssign = params.row.autoAssignNewSites;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                navigate(`/system-settings/roles-edit`, {
                  state: {
                    id: id,
                    blinded: blinded,
                    autoAssign: autoAssign,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaEdit
              color="#009129"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
  ];

  const languagesColumns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <div className="grid-id">
            <p>{id}</p>
          </div>
        );
      },
    },
    {
      field: "cultureName",
      headerName: "Culture Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Culture Name"}</div>,
      renderCell: (params) => {
        const cultureName = params.row.cultureName;

        return (
          <div className="grid-body">
            <p>{cultureName}</p>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => {
        const name = params.row.name;

        return (
          <div className="grid-body">
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Display Name"}</div>,
      renderCell: (params) => {
        const displayName = params.row.displayName;

        return (
          <div className="grid-body">
            <p>{displayName}</p>
          </div>
        );
      },
    },
    {
      field: "isRightToLeft",
      headerName: "Right To Left",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Right To Left"}</div>,
      renderCell: (params) => {
        const isRightToLeft = params.row.isRightToLeft;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isRightToLeft ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
    {
      field: "editId",
      headerName: "Edit",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        const id = params.row.id;
        const status = params.row.status;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                navigate(`/system-settings/languages-edit`, {
                  state: {
                    id: id,
                    status: status,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaEdit
              color="#009129"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "status",
      headerName: "Active",
      width: 300,
      renderHeader: () => <div className="grid-heading">{"Active"}</div>,
      renderCell: (params) => {
        const status = params.row.status;
        const id = params.row.id;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {status ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
  ];

  const countriesColumns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <div className="grid-id">
            <p>{id}</p>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => {
        const name = params.row.name;

        return (
          <div className="grid-body">
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      field: "isoId",
      headerName: "ISO Name",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"ISO Name"}</div>,
      renderCell: (params) => {
        const isoId = params.row.isoId;

        return (
          <div className="grid-body">
            <p>{isoId}</p>
          </div>
        );
      },
    },
    {
      field: "region",
      headerName: "Region",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Region"}</div>,
      renderCell: (params) => {
        const region = params.row.region;

        return (
          <div className="grid-body">
            <p>{region}</p>
          </div>
        );
      },
    },
    {
      field: "editId",
      headerName: "Edit",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        const id = params.row.id;
        const status = params.row.status;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                navigate(`/system-settings/countries-edit`, {
                  state: {
                    id: id,
                    status: status,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaEdit
              color="#009129"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "status",
      headerName: "Active",
      width: 300,
      renderHeader: () => <div className="grid-heading">{"Active"}</div>,
      renderCell: (params) => {
        const status = params.row.status;
        const id = params.row.id;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {status ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
  ];

  const regionColumns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <div className="grid-id">
            <p>{id}</p>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => {
        const name = params.row.name;

        return (
          <div className="grid-body">
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      field: "editId",
      headerName: "Edit",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        const id = params.row.id;
        const status = params.row.status;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              try {
                navigate(`/system-settings/regions-edit`, {
                  state: {
                    id: id,
                    status: status,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            <FaEdit
              color="#009129"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "status",
      headerName: "Active",
      width: 250,
      renderHeader: () => <div className="grid-heading">{"Active"}</div>,
      renderCell: (params) => {
        const status = params.row.status;
        const id = params.row.id;

        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {status ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const countriesExportData = systemCountries.map((row) => ({
    Name: row.name,
    "ISO Id": row.isoId,
    Region: row?.systemRegion?.name,
    Status: row?.isActive,
  }));

  const languagesExportData = systemLanguages.map((row) => ({
    "Culture Name": row.cultureName,
    Name: row.name,
    "Display Name": row.displayName,
    "Is Right To Left": row.isRightToLeft,
    Status: row?.isActive,
  }));

  const regionExportData = regionsData.map((row) => ({
    Name: row.name,
    Status: row?.isActive,
  }));

  const rolesExportData = rolesData.map((row) => ({
    Name: row.shortName,
    Description: row.description,
    "Is Blinded": row.isBlinded,
    "Auto Assign New Sites": row?.autoAssignNewSites,
  }));

  const GridExportToPDF = (props) => {
    return (
      <MenuItem
        onClick={async () => {
          try {
            const res = await postExportPDF(props.rows);
            if (res.status === 250) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 250) {
                const blob = new Blob([res2.data], { type: "application/pdf" });
                props.type === "Country"
                  ? saveAs(blob, "System Countries.pdf")
                  : props.type === "Language"
                  ? saveAs(blob, "System Languages.pdf")
                  : props.type === "Role"
                  ? saveAs(blob, "System Roles.pdf")
                  : saveAs(blob, "System Regions.pdf");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            console.log("ERROR: ", err);
          }
        }}
      >
        Export PDF
      </MenuItem>
    );
  };

  const GridExportToExcel = (props) => {
    return (
      <MenuItem
        onClick={async () => {
          try {
            const res = await postExportExcel(props.rows);
            if (res.status === 250) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 250) {
                const blob = new Blob([res2.data], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                props.type === "Country"
                  ? saveAs(blob, "System Countries.xlsx")
                  : props.type === "Language"
                  ? saveAs(blob, "System Languages.xlsx")
                  : props.type === "Role"
                  ? saveAs(blob, "System Roles.xlsx")
                  : saveAs(blob, "System Regions.xlsx");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            console.log("ERROR: ", err);
          }
        }}
      >
        Export Excel
      </MenuItem>
    );
  };

  const CustomExportButtonCountries = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={countriesExportData} type="Country" />
      <GridExportToPDF rows={countriesExportData} type="Country" />
    </GridToolbarExportContainer>
  );

  const CustomToolbarCountries = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButtonCountries />
    </GridToolbarContainer>
  );

  const CustomExportButtonLanguages = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={languagesExportData} type="Language" />
      <GridExportToPDF rows={languagesExportData} type="Language" />
    </GridToolbarExportContainer>
  );

  const CustomToolbarLanguages = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButtonLanguages />
    </GridToolbarContainer>
  );

  const CustomExportButtonRoles = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={rolesExportData} type="Role" />
      <GridExportToPDF rows={rolesExportData} type="Role" />
    </GridToolbarExportContainer>
  );

  const CustomToolbarRoles = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButtonRoles />
    </GridToolbarContainer>
  );

  const CustomExportButtonRegions = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={regionExportData} type="Region" />
      <GridExportToPDF rows={regionExportData} type="Region" />
    </GridToolbarExportContainer>
  );

  const CustomToolbarRegions = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButtonRegions />
    </GridToolbarContainer>
  );

  GridExportToExcel.propTypes = {
    hideMenu: PropTypes.func,
  };

  GridExportToPDF.propTypes = {
    hideMenu: PropTypes.func,
  };

  const tabStyles = {
    fontSize: "12px",
    fontWeight: "700",
  };

  return (
    <>
      {systemLoad ? (
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
          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/system-settings">System Settings</Link>
          </p>

          <Box sx={{ marginTop: "2%" }}>
            <Box sx={{ width: "35%", borderColor: "divider" }}>
              <Tabs
                className="system-tabs"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab sx={tabStyles} label="Countries" {...a11yProps(0)} />
                <Tab sx={tabStyles} label="Languages" {...a11yProps(1)} />
                <Tab sx={tabStyles} label="Roles" {...a11yProps(2)} />
                <Tab sx={tabStyles} label="Regions" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Row>
                <Col md={6}>
                  <p className="sponsor-heading">System Countries</p>
                </Col>
                <Col md={6}>
                  <div className="userButtonContainer">
                    <Link to="/system-settings/countries-add">
                      <button className="addUserButton">+ Add Country</button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Box sx={{ height: 400, width: "100%" }}>
                <ThemeProvider theme={getMuiTheme}>
                  <StripedDataGrid
                    className="allUsers-grid"
                    rows={countriesRows}
                    columns={countriesColumns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{ Toolbar: CustomToolbarCountries }}
                    pagination
                    rowHeight={38}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                  />
                </ThemeProvider>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Row>
                <Col md={6}>
                  <p className="sponsor-heading">System Languages</p>
                </Col>
                <Col md={6}>
                  <div className="userButtonContainer">
                    <Link to="/system-settings/languages-add">
                      <button className="addUserButton">+ Add Language</button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Box sx={{ height: 400, width: "100%" }}>
                <ThemeProvider theme={getMuiTheme}>
                  <StripedDataGrid
                    className="allUsers-grid"
                    rows={languagesRows}
                    columns={languagesColumns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{ Toolbar: CustomToolbarLanguages }}
                    pagination
                    rowHeight={38}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                  />
                </ThemeProvider>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Row>
                <Col md={6}>
                  <p className="sponsor-heading">System Roles</p>
                </Col>
                <Col md={6}>
                  <div className="userButtonContainer">
                    <Link to="/system-settings/roles-add">
                      <button className="addUserButton">+ Add Role</button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Box sx={{ height: 400, width: "100%" }}>
                <ThemeProvider theme={getMuiTheme}>
                  <StripedDataGrid
                    className="allUsers-grid"
                    rows={rolesRows}
                    columns={roleColumns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{ Toolbar: CustomToolbarRoles }}
                    pagination={false}
                    rowHeight={38}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                  />
                </ThemeProvider>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Row>
                <Col md={6}>
                  <p className="sponsor-heading">System Regions</p>
                </Col>
                <Col md={6}>
                  <div className="userButtonContainer">
                    <Link to="/system-settings/regions-add">
                      <button className="addUserButton">+ Add Region</button>
                    </Link>
                  </div>
                </Col>
              </Row>

              <Box sx={{ height: 400, width: "100%" }}>
                <ThemeProvider theme={getMuiTheme}>
                  <StripedDataGrid
                    className="allUsers-grid"
                    rows={regionRows}
                    columns={regionColumns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{ Toolbar: CustomToolbarRegions }}
                    pagination={false}
                    rowHeight={38}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                  />
                </ThemeProvider>
              </Box>
            </TabPanel>
          </Box>
        </div>
      )}
    </>
  );
};

export default SystemSettings;
