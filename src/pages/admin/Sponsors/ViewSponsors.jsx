import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sponsors.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import setting from "../../../assets/sponsors/setting.png";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { MenuItem } from "@mui/material";
import {
  postExportExcel,
  postExportPDF,
  getDownloadReport,
} from "../../../services/sponsors";
import {
  DataGridPro,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";

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

const ViewSponsors = () => {
  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const [sponsorState, setSponsorState] = React.useState(
    location?.state?.sponsor
  );
  const [pageSize, setPageSize] = React.useState(5);

  const rows = sponsorState?.studies?.map((row) => ({
    id: row.id,
    name: row.name,
    studyType: row.studyType?.name,
    settings: row.id,
  }));

  const exportData = sponsorState?.studies?.map((row) => ({
    Name: row.name,
  }));

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
            if (res.status === 200) {
              const res2 = await getDownloadReport(res.data);
              if (res2.status === 200) {
                const blob = new Blob([res2.data], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                saveAs(blob, "Studies.xlsx");
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

  GridExportToExcel.propTypes = {
    hideMenu: PropTypes.func,
  };

  GridExportToPDF.propTypes = {
    hideMenu: PropTypes.func,
  };

  const CustomExportButton = (props) => (
    <GridToolbarExportContainer {...props}>
      <GridExportToExcel rows={exportData} />
      <GridExportToPDF rows={exportData} />
    </GridToolbarExportContainer>
  );

  const CustomToolbar = (props) => (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExportButton />
    </GridToolbarContainer>
  );

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
      width: 220,
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
      field: "studyType",
      headerName: "Study Type",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Name"}</div>,
      renderCell: (params) => {
        const studyType = params.row.studyType;

        return (
          <div className="grid-body">
            <p>{studyType}</p>
          </div>
        );
      },
    },
    {
      field: "settings",
      headerName: "Settings",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Settings"}</div>,
      renderCell: (params) => {
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
            onClick={async () => {
              try {
                navigate(`/study-management`, {
                  state: {
                    id: id,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
            }}
          >
            {/* <Link to={"/study-management"}> */}
            <img src={setting} className="settingImg" />
            {/* </Link> */}
          </button>
        );
      },
    },
  ];

  const numberOfRows = Math.ceil(sponsorState?.studies?.length / 4);

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        <Link to="/homepage">Home</Link> |{" "}
        <Link to="/sponsors">View Sponsors</Link>
      </p>
      <p className="sponsor-heading">All Studies</p>
      <div className="upload-body">
        <img
          src={sponsorState?.previewImg}
          className="uploadImg-view"
          style={{ borderRadius: "50%" }}
        />
        <p className="uploadText-view">{sponsorState?.name}</p>
      </div>
      {/* <div className="viewSponsor-table">
        <Row>
          <Col md={12}>
            {sponsorState?.studies.length > 0 ? (
              <Table bordered className="tableBody">
                <tbody>
                  {Array(numberOfRows)
                    .fill()
                    .map((_, rowIndex) => (
                      <tr>
                        {sponsorState?.studies
                          .slice(rowIndex * 4, rowIndex * 4 + 4)
                          .map((study) => (
                            <td>
                              <Row className="studyRow">
                                <Col md={8}>{study?.name}</Col>
                                <Col md={4}>
                                  <Link
                                    to={"/study-management"}
                                    state={{ study }}
                                  >
                                    <img src={setting} className="settingImg" />
                                  </Link>
                                </Col>
                              </Row>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <>
                <p className="sponsor-heading">No Studies Available</p>
              </>
            )}
          </Col>
        </Row>
      </div> */}

      <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
        <ThemeProvider theme={getMuiTheme}>
          <StripedDataGrid
            className="allStudies-grid"
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            components={{ Toolbar: CustomToolbar }}
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

      <Row style={{ marginTop: "3%" }}>
        <Col md={6}></Col>
        <Col md={6}>
          <Link
            to={"/studies"}
            style={{
              "&hover": {
                textDecoration: "none",
              },
            }}
          >
            <div className="createSponsor-buttons">
              <button className="sponsorBackButton">Back</button>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ViewSponsors;
