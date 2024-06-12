import React, { useState, useContext } from "react";
import UserContext from "../../../context/user/UserContext";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import {
  postExportExcel,
  postExportPDF,
  getDownloadReport,
} from "../../../services/sponsors";
import { toast } from "react-toastify";
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
  GridToolbar,
  GridToolbarContainer,
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MenuItem from "@mui/material/MenuItem";

import "./User.css";

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

const AllUsers = () => {
  const theme = useTheme();
  const { usersData, load, fetchUsers } = useContext(UserContext);
  const [pageSize, setPageSize] = React.useState(5);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchUsers();
    // disableLoading();
  }, []);

  const notify = () =>
    toast.success("User Status Changed Successfully", {
      // theme: "colored",
      toastId: "deleteUsersSuccessToast",
    });

  const rows = usersData.map((row, index) => ({
    id: row?.id || index,
    email: row?.email,
    firstName: row?.firstName,
    lastName: row?.lastName,
    phoneNumber: row?.phoneNumber || "-",
    role: row?.role,
    lockoutEnd: row.lockoutEnd === null ? "Active" : "Inactive",
    studies: row?.studies,
  }));

  const exportData = usersData.map((row) => ({
    Email: row?.email,
    "First Name": row.firstName,
    "Last Name": row.lastName,
    "Phone Number": row.phoneNumber,
    Role: row.role,
    "Is Active": row.lockoutEnd === null ? "Active" : "Inactive",
    // Studies: row.studies.length === 0 ? "No Studies" : row.studies,
  }));

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      width: 0,
      renderHeader: () => <div className="grid-heading-id">{"ID"}</div>,
      renderCell: (params) => {
        const id = params?.row?.id;

        return (
          <div className="grid-id">
            <p>{id}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Email"}</div>,
      renderCell: (params) => {
        const email = params?.row?.email;

        return (
          <div className="grid-body">
            <p>{email}</p>
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"First Name"}</div>,
      renderCell: (params) => {
        const firstName = params?.row?.firstName;

        return (
          <div className="grid-body">
            <p>{firstName}</p>
          </div>
        );
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Last Name"}</div>,
      renderCell: (params) => {
        const lastName = params?.row?.lastName;

        return (
          <div className="grid-body">
            <p>{lastName}</p>
          </div>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Phone"}</div>,
      renderCell: (params) => {
        const phoneNumber = params?.row?.phoneNumber;

        return (
          <div className="grid-body">
            <p>{phoneNumber}</p>
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Role"}</div>,
      renderCell: (params) => {
        const role = params?.row?.role;

        return (
          <div className="grid-body">
            <p>{role}</p>
          </div>
        );
      },
    },
    {
      field: "studies",
      headerName: "Edit",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Edit"}</div>,
      renderCell: (params) => {
        const id = params?.row?.id;
        const email = params.row.email;
        const firstName = params.row.firstName;
        const lastName = params.row.lastName;
        const phone = params.row.phoneNumber;
        const role = params.row.role;
        const status = params.row.lockoutEnd === null ? "Active" : "Inactive";

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
              try {
                navigate(`/edit-user/`, {
                  state: {
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    role: role,
                    status: status,
                  },
                });
              } catch (err) {
                console.log("Error: ", err.message);
              }
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
      field: "status",
      headerName: "Status",
      width: 220,
      renderHeader: () => <div className="grid-heading">{"Status"}</div>,
      renderCell: (params) => {
        const status = params.row.lockoutEnd === "Active" ? true : false;

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
            {status ? (
              <FaCheck
                color="#3661eb"
                style={{
                  fontSize: "15px",
                }}
              />
            ) : (
              <FaTimes
                style={{
                  fontSize: "15px",
                }}
              />
            )}
          </button>
        );
      },
    },
  ];

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
                saveAs(blob, "Users.pdf");
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
                saveAs(blob, "Users.xlsx");
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

  GridExportToExcel.propTypes = {
    hideMenu: PropTypes.func,
  };

  GridExportToPDF.propTypes = {
    hideMenu: PropTypes.func,
  };

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
          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/all-users">All Users</Link>
          </p>

          <Row>
            <Col md={6}>
              <p className="sponsor-heading">All Users</p>
            </Col>
            <Col md={6}>
              <div className="userButtonContainer">
                <Link to="/add-user">
                  <button className="addUserButton">+ Add New User</button>
                </Link>
              </div>
            </Col>
          </Row>

          <Box sx={{ height: 400, width: "100%" }}>
            <ThemeProvider theme={getMuiTheme}>
              <StripedDataGrid
                className="allUsers-grid"
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
        </div>
      )}
    </>
  );
};

export default AllUsers;
