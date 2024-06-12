import React, { useContext, useEffect, useState } from "react";
import SponsorContext from "../../../context/sponsor/SponsorContext";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
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
import "./Sponsors.css";

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

const AllSponsors = () => {
  const theme = useTheme();

  const { sponsorsData, load, setLoading, fetchSponsors } =
    useContext(SponsorContext);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSponsors();
  }, []);

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => (
        <div className="grid-id">
          <p>{params.row.id}</p>
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
      field: "dateCreatedUtc",
      headerName: "Date Created",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Date Created"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.dateCreatedUtc}</p>
        </div>
      ),
    },
    {
      field: "dateUpdatedUtc",
      headerName: "Date Updated",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Date Updated"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.dateUpdatedUtc}</p>
        </div>
      ),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Created By"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.createdBy}</p>
        </div>
      ),
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Updated By"}</div>,
      renderCell: (params) => (
        <div className="grid-body">
          <p>{params.row.updatedBy}</p>
        </div>
      ),
    },
    {
      field: "imageUrl",
      headerName: "Image URL",
      width: 220,
      hide: true,
      renderHeader: () => <div className="grid-heading-id">{"Image URL"}</div>,
      renderCell: (params) => (
        <div className="grid-id">
          <p>{params.row.imageUrl}</p>
        </div>
      ),
    },
    {
      field: "secret",
      headerName: "Edit",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        const { id, name, imageUrl, isActive } = params.row;
        return (
          <button
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() =>
              navigate(`/edit-sponsor/`, {
                state: {
                  id,
                  name,
                  fileUrl: imageUrl,
                  isactive: isActive === "Active",
                },
              })
            }
          >
            <FaEdit
              color="#009129"
              size={25}
              onClick={() => navigate("/edit-sponsor")}
            />
          </button>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Active"}</div>,
      renderCell: (params) => {
        const isActive = params.row.isActive;
        return (
          <div className="grid-body">
            {isActive === "Active" ? (
              <FaCheck size={20} color="#009129" />
            ) : (
              <FaTimes size={20} color="#d9534f" />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <ThemeProvider theme={getMuiTheme}>
      <div className="content-body">
        <p className="admin-link" style={{ fontWeight: "600" }}>
          <Link to="/homepage">Home</Link> |{" "}
          <Link to="/all-sponsors">All Sponsors</Link>
        </p>
        <Row>
          <Col md={6}>
            <p className="sponsor-heading">All Sponsors</p>
          </Col>
          <Col md={6}></Col>
        </Row>
        {/* <Box
          sx={{
            height: 400,
            width: "100%",
            "& .MuiDataGrid-root": {
              border: "none",
            },
          }}
        > */}
        <Box sx={{ height: 400, width: "100%" }}>
          <ThemeProvider theme={getMuiTheme}>
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
              <StripedDataGrid
                rows={sponsorsData}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                components={{
                  Toolbar: GridToolbarContainer,
                  ColumnSelector: GridToolbarColumnsButton,
                  DensitySelector: GridToolbarDensitySelector,
                  ExportButton: GridToolbarExportContainer,
                  FilterButton: GridToolbarFilterButton,
                }}
              />
            )}
          </ThemeProvider>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AllSponsors;
