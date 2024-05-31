import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaClone, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";
import {
  getAllEmailContent,
  deleteEmailContent,
} from "../../../../../services/email_builder";

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

const EmailBuilder = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emailContentData, setEmailContentData] = React.useState([]);

  const [pageSize, setPageSize] = React.useState(5);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifyDelete = () =>
    toast.success("Email Deleted Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const fetchEmailBuilderData = async () => {
    try {
      const res = await getAllEmailContent();
      if (res.status) {
        setEmailContentData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchEmailBuilderData();
  }, []);

  const emailContentRows = emailContentData.map((row) => ({
    id: row.id,
    name: row.name,
    blinded: row.isBlinded,
    siteSpecific: row.isSiteSpecific,
    notes: row.notes,
    edit: row.id,
    delete: row.delete,
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
      field: "name",
      // hide: true,
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
      field: "blinded",
      // hide: true,
      headerName: "Blinded",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Blinded"}</div>,
      renderCell: (params) => {
        const blinded = params.row.blinded;

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
            {blinded ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                color="rgb(140 140 140)"
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
      field: "siteSpecific",
      // hide: true,
      headerName: "Site Specific",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Site Specific"}</div>,
      renderCell: (params) => {
        const siteSpecific = params.row.siteSpecific;

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
            {siteSpecific ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                color="rgb(140 140 140)"
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
      field: "notes",
      // hide: true,
      headerName: "Notes",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Notes"}</div>,
      renderCell: (params) => {
        const notes = params.row.notes;

        return (
          <div className="grid-body">
            <p>{notes}</p>
          </div>
        );
      },
    },
    {
      field: "edit",
      // hide: true,
      headerName: "Edit",
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      width: 280,
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
              navigate(`/study-management/study-settings/email-builder/edit`, {
                state: {
                  id: id,
                },
              });
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
                const res = await deleteEmailContent(id);

                if (res.status) {
                  setLoad(false);
                  fetchEmailBuilderData();
                  notifyDelete();
                }
              } catch (err) {
                setLoad(false);
                console.log("Error: ", err.message);
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
            <Link to="/study-management/study-settings/email-builder">
              Email Builder
            </Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Edit Email Templates</p>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/study-management/study-settings/email-builder/create">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Create Template
                  </button>
                </div>
              </Link>
            </Col>
          </Row>

          <Box sx={{ height: 400, width: "100%", display: "flex" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allQuestionnaire-grid"
                rows={emailContentRows}
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

export default EmailBuilder;
