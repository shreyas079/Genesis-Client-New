import React from "react";
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
import { getAllWidgets, deleteWidget } from "../../../../../services/widgets";

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

const Widgets = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [widgetDataState, setWidgetDataState] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  const open = Boolean(anchorEl);

  const fetchWidgetsData = async () => {
    try {
      const res = await getAllWidgets();
      if (res.status) {
        setWidgetDataState(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchWidgetsData();
  }, []);

  const notifyDelete = () =>
    toast.success("Widget Deleted Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const widgetRows = widgetDataState.map((row) => ({
    id: row.id,
    title: row.name,
    type: row.widgetType.name,
    permission: row.permission,
    edit: row.id,
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
      field: "title",
      headerName: "Title",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Title"}</div>,
      renderCell: (params) => {
        const title = params.row.title;

        return (
          <div className="grid-body">
            <p>{title}</p>
          </div>
        );
      },
    },
    {
      field: "type",
      // hide: true,
      headerName: "Type",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Type"}</div>,
      renderCell: (params) => {
        const type = params.row.type;

        return (
          <div className="grid-body">
            <p>{type}</p>
          </div>
        );
      },
    },
    {
      field: "permission",
      // hide: true,
      headerName: "Permission",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Permission"}</div>,
      renderCell: (params) => {
        const permission = params.row.permission;

        return (
          <div className="grid-body">
            <p>{permission}</p>
          </div>
        );
      },
    },
    {
      field: "edit",
      // hide: true,
      headerName: "Edit",
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      width: "200",
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
              navigate(`/study-management/study-settings/widgets/edit`, {
                state: {
                  id: id,
                },
              });
              // } catch (err) {
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
      width: 220,
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <button
            onClick={async () => {
              try {
                setLoad(true);
                const res = await deleteWidget(id);

                if (res.status) {
                  setLoad(false);
                  fetchWidgetsData();
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
            <Link to="/study-management/study-settings/widgets">Widgets</Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Widgets</p>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/study-management/study-settings/widgets/add">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Add Widget
                  </button>
                </div>
              </Link>
            </Col>
          </Row>

          <Box sx={{ height: 400, width: "100%", display: "flex" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allQuestionnaire-grid"
                rows={widgetRows}
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

export default Widgets;
