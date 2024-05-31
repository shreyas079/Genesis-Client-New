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
import {
  getAllSubmitActions,
  deleteSubmitAction,
} from "../../../../../services/submit_action";

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

const SubmitActions = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [submitActionsData, setSubmitActionsData] = React.useState([]);

  const [pageSize, setPageSize] = React.useState(5);

  const open = Boolean(anchorEl);

  const deleteNotify = () =>
    toast.success("Submit Action Deleted Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const fetchSubmitActions = async () => {
    try {
      setLoad(true);
      const res = await getAllSubmitActions();
      if (res.status) {
        setLoad(false);
        setSubmitActionsData(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchSubmitActions();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitActionRows = submitActionsData.map((row) => ({
    id: row.id,
    displayName: row.displayName,
    typeName: row.typeName,
    successPatientStatusTypeId: row.successPatientStatusTypeId,
    failurePatientStatusTypeId: row.failurePatientStatusTypeId,
    edit: row.id,
    delete: row.id,
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
      field: "displayName",
      // hide: true,
      headerName: "Display Name",
      width: 220,
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
      field: "typeName",
      // hide: true,
      headerName: "Type Name",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Type Name"}</div>,
      renderCell: (params) => {
        const typeName = params.row.typeName;

        return (
          <div className="grid-body">
            <p>{typeName}</p>
          </div>
        );
      },
    },
    {
      field: "successPatientStatusTypeId",
      // hide: true,
      headerName: "Success Patient ID",
      width: 220,
      renderHeader: () => (
        <div className="grid-heading">{"Success Patient ID"}</div>
      ),
      renderCell: (params) => {
        const successPatientStatusTypeId =
          params.row.successPatientStatusTypeId;

        return (
          <div className="grid-body">
            <p>{successPatientStatusTypeId}</p>
          </div>
        );
      },
    },
    {
      field: "failurePatientStatusTypeId",
      // hide: true,
      headerName: "Failure Patient ID",
      width: 220,
      renderHeader: () => (
        <div className="grid-heading">{"Failure Patient ID"}</div>
      ),
      renderCell: (params) => {
        const failurePatientStatusTypeId =
          params.row.failurePatientStatusTypeId;

        return (
          <div className="grid-body">
            <p>{failurePatientStatusTypeId}</p>
          </div>
        );
      },
    },
    {
      field: "edit",
      // hide: true,
      headerName: "Edit",
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      width: "220",
      renderCell: (params) => {
        const id = params.row.id;
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
            onClick={async () => {
              // try {
              navigate(`/study-management/study-settings/submit-actions/edit`, {
                state: {
                  id: id,
                  // name: name,
                },
              });
              // } catch (err) {
              //   setLoad(false);
              //   console.log("Error: ", err.message);
              // }
            }}
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
      renderHeader: () => <div className="grid-heading">{"Delete"}</div>,
      width: "200",
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <button
            onClick={async () => {
              try {
                setLoad(true);
                const res = await deleteSubmitAction(id);

                if (res.status) {
                  setLoad(false);
                  fetchSubmitActions();
                  deleteNotify();
                }
              } catch (err) {
                console.log("Error: ", err.message);
                setLoad(false);
                requestFailed(err.message);
              }
            }}
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
            <Link to="/study-management/study-settings/submit-actions">
              Submit Actions
            </Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Submit Actions</p>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/study-management/study-settings/submit-actions/create">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Create Submit Action
                  </button>
                </div>
              </Link>
            </Col>
          </Row>

          <Box sx={{ height: 400, width: "100%", display: "flex" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allQuestionnaire-grid"
                rows={submitActionRows}
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

export default SubmitActions;
