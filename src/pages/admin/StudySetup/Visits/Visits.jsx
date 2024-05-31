import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";
import { getAllVisits, deleteVisit } from "../../../../services/visits";
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

const Visits = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [visitsData, setVisitsData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  const fetchAllVisitsData = async () => {
    try {
      const res = await getAllVisits();
      setVisitsData(res.data);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useState(() => {
    fetchAllVisitsData();
  }, []);

  const notifyDelete = () =>
    toast.success("Visit Deleted Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const rows = visitsData.map((row) => ({
    id: row.id,
    note: row.notes,
    visitOrder: row.visitOrder,
    daysExpected: row.daysExpected,
    windowAfter: row.windowAfter,
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
      field: "note",
      // hide: true,
      headerName: "Note",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Note"}</div>,
      renderCell: (params) => {
        const note = params.row.note;

        return (
          <div className="grid-body">
            <p>{note}</p>
          </div>
        );
      },
    },
    {
      field: "visitOrder",
      // hide: true,
      headerName: "Visit Order",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Visit Order"}</div>,
      renderCell: (params) => {
        const visitOrder = params.row.visitOrder;

        return (
          <div className="grid-body">
            <p>{visitOrder}</p>
          </div>
        );
      },
    },
    {
      field: "daysExpected",
      // hide: true,
      headerName: "Days Expected",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Days Expected"}</div>,
      renderCell: (params) => {
        const daysExpected = params.row.daysExpected;

        return (
          <div className="grid-body">
            <p>{daysExpected}</p>
          </div>
        );
      },
    },
    {
      field: "windowAfter",
      // hide: true,
      headerName: "Window After",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Window After"}</div>,
      renderCell: (params) => {
        const windowAfter = params.row.windowAfter;

        return (
          <div className="grid-body">
            <p>{windowAfter}</p>
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
              navigate(`/study-management/visits/edit`, {
                state: {
                  id: id,
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
      width: "220",
      renderCell: (params) => {
        const id = params.row.id;

        return (
          <button
            onClick={async () => {
              try {
                setLoad(true);
                const res = await deleteVisit(id);

                if (res.status) {
                  setLoad(false);
                  fetchAllVisitsData();
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
            <Link to="/study-management/visits">Visits</Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Visits</p>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/study-management/visits/create">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Create Visit
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

export default Visits;
