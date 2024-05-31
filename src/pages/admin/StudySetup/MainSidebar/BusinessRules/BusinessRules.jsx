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
import { getBusinessRules } from "../../../../../services/business_rules";

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

const BusinessRules = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [rulesData, setRulesData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  const fetchRulesData = async () => {
    try {
      const res = await getBusinessRules();
      if (res.status) {
        console.log("RESSS ... ", res);
        setRulesData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const rows = rulesData.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    edit: row.edit,
    delete: row.delete,
  }));

  React.useEffect(() => {
    fetchRulesData();
  }, []);

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">ID</div>,
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
      width: 320,
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
      field: "description",
      headerName: "Description",
      width: 700,
      renderHeader: () => <div className="grid-heading">{"Description"}</div>,
      renderCell: (params) => {
        const description = params.row.description;

        return (
          <div className="grid-body">
            <p>{description}</p>
          </div>
        );
      },
    },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
    //   width: 220,
    //   renderCell: (params) => {
    //     const id = params.row.id;

    //     return (
    //       <button
    //         style={{
    //           cursor: "pointer",
    //           textAlign: "center",
    //           background: "none",
    //           border: "none",
    //           borderRadius: "5px",
    //         }}
    //       >
    //         <FaEdit
    //           color="#3661eb"
    //           style={{
    //             fontSize: "15px",
    //           }}
    //         />
    //       </button>
    //     );
    //   },
    // },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   renderHeader: () => <div className="grid-heading">{"Delete"}</div>,
    //   width: 220,
    //   renderCell: (params) => {
    //     const id = params.row.id;

    //     return (
    //       <button
    //         style={{
    //           cursor: "pointer",
    //           textAlign: "center",
    //           background: "none",
    //           border: "none",
    //           borderRadius: "5px",
    //         }}
    //       >
    //         <FaTrashAlt
    //           color="rgb(140 140 140)"
    //           style={{
    //             fontSize: "15px",
    //           }}
    //         />
    //       </button>
    //     );
    //   },
    // },
  ];

  return (
    <div className="content-body">
      <p className="study-management-link" style={{ fontWeight: "600" }}>
        <Link to="/study-management">Manage Your Study</Link> |{" "}
        <Link to="/study-management/study-settings/business-rules">
          Business Rules
        </Link>
      </p>
      <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Col md={6}>
          <div className="study-management-head-start">
            <p className="study-management-heading">Business Rules</p>
          </div>
        </Col>
        <Col md={6}>
          {/* <Link to="/study-management/study-settings/create-business-rules">
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
    </div>
  );
};

export default BusinessRules;
