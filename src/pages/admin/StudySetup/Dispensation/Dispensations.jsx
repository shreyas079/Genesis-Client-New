import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import {
  getAllDispensations,
  deleteDispensation,
} from "../../../../services/dispensations";
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";

import "../StudySetup.css";

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

const Dispensations = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  const [pageSize, setPageSize] = React.useState(5);

  const [dispensationData, setDispensationData] = React.useState([]);

  const fetchDispensations = async () => {
    try {
      setLoad(true);
      const res = await getAllDispensations();
      if (res.status) {
        setLoad(false);
        setDispensationData(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  React.useEffect(() => {
    fetchDispensations();
  }, []);

  const notifyDelete = () =>
    toast.success("Dispensation Deleted Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const rows = dispensationData.map((row) => ({
    id: row.id,
    visits: row.visit?.name,
    treatment: row.treatment?.description,
    isRequired: row.isRequired,
    details: row.dispensationDetails,
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
      field: "visits",
      // hide: true,
      headerName: "Visits",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Visits"}</div>,
      renderCell: (params) => {
        const visits = params.row.visits;

        return (
          <div className="grid-body">
            <p>{visits}</p>
          </div>
        );
      },
    },
    {
      field: "treatment",
      // hide: true,
      headerName: "Treatment",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Treatment"}</div>,
      renderCell: (params) => {
        const treatment = params.row.treatment;

        return (
          <div className="grid-body">
            <p>{treatment}</p>
          </div>
        );
      },
    },
    {
      field: "isRequired",
      // hide: true,
      headerName: "Is Required",
      width: 280,
      renderHeader: () => <div className="grid-heading">{"Is Required"}</div>,
      renderCell: (params) => {
        const isRequired = params.row.isRequired;

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
            {isRequired ? (
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
      field: "edit",
      // hide: true,
      headerName: "Edit",
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      width: "280",
      renderCell: (params) => {
        const id = params.row.id;

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
              navigate(`/study-management/dispensations/edit`, {
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
      width: "280",
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <button
            onClick={async () => {
              try {
                setLoad(true);
                const res = await deleteDispensation(id);

                if (res.status) {
                  setLoad(false);
                  fetchDispensations();
                  notifyDelete();
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
            <Link to="/study-management/dispensations">Dispensations</Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Dispensations</p>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/study-management/dispensations/create">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Create Dispensation
                  </button>
                </div>
              </Link>
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

export default Dispensations;
