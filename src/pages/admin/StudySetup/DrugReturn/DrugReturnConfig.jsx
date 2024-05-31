import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Box, TextField } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
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

const DrugReturnConfig = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [returnDrugData, setReturnDrugData] = React.useState([
    {
      id: 1,
      name: "ApproveQuarantine",
      edit: 1,
      link: "/study-management/drug-return/approve",
    },
    {
      id: 2,
      name: "CRARecociliation",
      edit: 2,
      link: "/study-management/drug-return/reconciliation",
    },
    {
      id: 3,
      name: "CS_SiteKitStatusManagement",
      edit: 3,
      link: "/study-management/drug-return/cssitekit",
    },
    {
      id: 4,
      name: "DepotKitManagement",
      edit: 4,
      link: "/study-management/drug-return/depotkit",
    },
    {
      id: 5,
      name: "DepotReconciliation",
      edit: 5,
      link: "/study-management/drug-return/depot-reconciliation",
    },
    {
      id: 6,
      name: "DepotToDepotAcknowledgement",
      edit: 6,
      link: "/study-management/drug-return/depot-acknowledgement",
    },
    {
      id: 7,
      name: "DepotToSiteAcknowledgement",
      edit: 7,
      link: "/study-management/drug-return/depot-site",
    },
    {
      id: 8,
      name: "ReplaceDrug",
      edit: 8,
      link: "/study-management/drug-return/replace-drug",
    },
    {
      id: 9,
      name: "SiteToDepot",
      edit: 9,
      link: "/study-management/drug-return/site-depot",
    },
    {
      id: 10,
      name: "SubjectToSite",
      edit: 10,
      link: "/study-management/drug-return/subject-site",
    },
  ]);

  const [pageSize, setPageSize] = React.useState(5);

  const rows = returnDrugData.map((row) => ({
    id: row.id,
    name: row.name,
    edit: row.edit,
    link: row.link,
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
      headerName: "Name",
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      width: "1100",
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
      field: "edit",
      headerName: "Edit",
      renderHeader: () => <strong>{"Edit"}</strong>,
      width: "240",
      renderCell: (params) => {
        const link = params.row.link;
        return (
          <button
            // className="editButton"
            style={{
              cursor: "pointer",
              textAlign: "center",
              background: "none",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={async () => {
              // try {
              navigate(
                `${link}`
                // ,{
                //   state: {
                //     id: id,
                //     name: name,
                //   },}
              );
              // } catch (err) {
              //   setLoad(false);
              //   console.log("Error: ", err.message);
              // }
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
      field: "link",
      hide: true,
      headerName: "Link",
      renderHeader: () => <strong>{"Link"}</strong>,
      width: "240",
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
            <Link to="/study-management/drug-return">Drug Return</Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">
                  Drug Return control configuration
                </p>
              </div>
            </Col>
            <Col md={6}>
              {/* <Link to="/study-management/dispensations/create">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-md">
                    Create Dispensation
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

export default DrugReturnConfig;
