// src/components/AllStudy.js
import React, { useContext, useEffect } from "react";
import StudyContext from "../../../context/study/StudyContext";
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
import { toast } from "react-toastify";
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
import "./Study.css";
import { mapExportData, mapStudyData } from "../../../utils/dataMapping";

const getMuiTheme = createTheme({
  typography: {
    fontSize: 25,
  },
  ".MuiDataGrid-toolbarContainer": {
    float: "right !important",
  },
  ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
    color: "#000000 !important",
  },
});
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGridPro)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
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

const AllStudy = () => {
  const theme = useTheme();
  const { studyData, load, fetchStudies } = useContext(StudyContext);
  const [pageSize, setPageSize] = React.useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudies();
  }, []);

  // useEffect(() => {
  //   console.log("Study Data: ", studyData);
  // }, [studyData]);

  const exportData = mapExportData(studyData);

  const GridExportToPDF = (props) => {
    return (
      <MenuItem
        onClick={async () => {
          try {
            const res = await postExportPDF(props.rows);
            if (res.status === 200) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 200) {
                const blob = new Blob([res2.data], { type: "application/pdf" });
                saveAs(blob, "Studies.pdf");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            toast.error("Failed to export PDF");
            console.log("Error exporting PDF: ", err.message);
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
            if (res.status === 200) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 200) {
                const blob = new Blob([res2.data], {
                  type: "application/vnd.ms-excel",
                });
                saveAs(blob, "Studies.xlsx");
              }
            }
            props.hideMenu?.();
          } catch (err) {
            toast.error("Failed to export Excel");
            console.log("Error exporting Excel: ", err.message);
          }
        }}
      >
        Export Excel
      </MenuItem>
    );
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExportContainer>
          <GridExportToExcel rows={exportData} />
          <GridExportToPDF rows={exportData} />
        </GridToolbarExportContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => (
        <div className="grid-id">
          <p>{params?.row?.id}</p>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.name}</p>
        </div>
      ),
    },
    {
      field: "portalUrl",
      headerName: "Portal URL",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Portal URL"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.portalUrl}</p>
        </div>
      ),
    },
    {
      field: "apiUrl",
      headerName: "API URL",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"API URL"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.apiUrl}</p>
        </div>
      ),
    },
    {
      field: "questionnaireBuilderUrl",
      headerName: "Questionnaire URL",
      width: 220,
      renderHeader: () => (
        <div className="grid-heading">{"Questionnaire URL"}</div>
      ),
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.questionnaireBuilderUrl}</p>
        </div>
      ),
    },
    {
      field: "sponsorName",
      headerName: "Sponsor Name",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Sponsor Name"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.sponsorName}</p>
        </div>
      ),
    },
    {
      field: "studyType",
      headerName: "Study Type",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Study Type"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.studyType}</p>
        </div>
      ),
    },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        params.value === "Active" ? (
          <FaCheck color="green" />
        ) : (
          <FaTimes color="red" />
        ),
    },
    {
      field: "projectManagers",
      headerName: "Project Managers",
      width: 220,
      renderHeader: () => (
        <div className="grid-heading">{"Project Managers"}</div>
      ),
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.projectManagers}</p>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderHeader: () => <div className="grid-heading">{"Actions"}</div>,
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      // renderCell: (params) => (
      //   <Link to={`/edit-study/${params.row.id}`}>
      //     <FaEdit color="blue" />
      //   </Link>
      // ),
      renderCell: (params) => (
        <Link
          to={{
            pathname: `/edit-study/${params.row.id}`,
            state: {
              sponsorName: params.row.sponsorName,
              sponsorId: params.row.sponsorId,
              studyname: params.row.name,
            },
          }}
        >
          <FaEdit color="blue" />
        </Link>
      ),
    },
  ];

  if (load) {
    return (
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
    );
  }

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        <Link to="/homepage">Home</Link> |{" "}
        <Link to="/all-studies">All Study</Link>
      </p>
      <Row>
        <Col md={6}>
          <p className="sponsor-heading">All Studies</p>
        </Col>
        <Col md={6}>
          <div className="userButtonContainer">
            <Link to="/study/add">
              <button className="addUserButton">+ Add Study</button>
            </Link>
          </div>
        </Col>
      </Row>
      <Box sx={{ height: 400, width: "100%" }}>
        <ThemeProvider theme={getMuiTheme}>
          <StripedDataGrid
            rows={studyData}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableSelectionOnClick
            components={{
              Toolbar: CustomToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default AllStudy;
