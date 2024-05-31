import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaClone, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";

import "../../StudySetup.css";

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
        // Reset on touch devices, it doesn't add specificity
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

const Reports = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [studyReports, setStudyReports] = React.useState([
    {
      id: 1,
      reportTitle: "Report 1",
      headers: "header 1",
      footers: "footer 1",
      signaturePages: "signature 1",
      edit: 1,
    },
    {
      id: 2,
      reportTitle: "Report 2",
      headers: "header 2",
      footers: "footer 2",
      signaturePages: "signature 2",
      edit: 2,
    },
    {
      id: 3,
      reportTitle: "Report 3",
      headers: "header 3",
      footers: "footer 3",
      signaturePages: "signature 3",
      edit: 3,
    },
  ]);

  const [pageSize, setPageSize] = React.useState(5);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = studyReports.map((row) => ({
    id: row.id,
    reportTitle: row.reportTitle,
    headers: row.headers,
    footers: row.footers,
    signaturePages: row.signaturePages,
    edit: row.edit,
  }));

  const columns = [
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
      field: "reportTitle",
      // hide: true,
      headerName: "Report Title",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Report Title"}</div>,
      renderCell: (params) => {
        const reportTitle = params.row.reportTitle;

        return (
          <div className="grid-body">
            <p>{reportTitle}</p>
          </div>
        );
      },
    },
    {
      field: "headers",
      // hide: true,
      headerName: "Headers",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Headers"}</div>,
      renderCell: (params) => {
        const headers = params.row.headers;

        return (
          <div className="grid-body">
            <p>{headers}</p>
          </div>
        );
      },
    },
    {
      field: "footers",
      // hide: true,
      headerName: "Footers",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Footers"}</div>,
      renderCell: (params) => {
        const footers = params.row.footers;

        return (
          <div className="grid-body">
            <p>{footers}</p>
          </div>
        );
      },
    },
    {
      field: "signaturePages",
      // hide: true,
      headerName: "Signature Pages",
      width: 280,
      renderHeader: () => (
        <div className="grid-heading">{"Signature Pages"}</div>
      ),
      renderCell: (params) => {
        const signaturePages = params.row.signaturePages;

        return (
          <div className="grid-body">
            <p>{signaturePages}</p>
          </div>
        );
      },
    },
    {
      field: "edit",
      // hide: true,
      headerName: "Edit",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        // const id = params.row.id;
        // const name = params.row.name;
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
          // onClick={async () => {
          //   navigate(
          //     `/study-management/care-givers/edit-caregiver`)
          // }}
          >
            <FaEdit
              color="#3661eb"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "delete",
      // hide: true,
      headerName: "Delete",
      renderHeader: () => <strong>{"Delete"}</strong>,
      width: "200",
      renderCell: (params) => {
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
          >
            <FaTrashAlt
              color="rgb(140 140 140)"
              style={{
                fontSize: "15px",
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
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/care-givers">Reports</Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Reports</p>
              </div>
            </Col>
            <Col md={6}>
              {/* <Link to="/study-management/care-givers/create-caregiver">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Add New
                  </button>
                </div>
              </Link> */}
            </Col>
          </Row>

          <Box sx={{ height: 400, width: "100%", display: "flex" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allQuestionnaire-grid"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                components={{ Toolbar: GridToolbar }}
                pagination
                rowHeight={38}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
              />
            </ThemeProvider>
          </Box>

          <Row style={{ marginTop: "2%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <Link to="/study-management">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-lg">
                    Back To Create Study
                  </button>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Reports;
