import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import adminLogo from "../../assets/svgs/admin_logo.svg";
import arrowDown from "../../assets/svgs/arrow_down.svg";
import useClaims from "../../pages/auth/claims";
import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { Box, AppBar, Modal } from "@mui/material"; // Import Modal from MUI
import ChangePasswordForm from "./ChangePasswordForm";
import Avatar from "@mui/material/Avatar";

const tempImg = "https://xsgames.co/randomusers/assets/avatars/male/5.jpg";

const styles = {
  adminImg: {
    backgroundImage: `url(${tempImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};
function Layout(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [logoutUrl, setLogoutUrl] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const {getUserLoggedIn} = useContext(AuthContext)
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login"); // Navigate to the login page
    toast.success("Logged out successfully!");
  };

  const { data: claims, isLoading } = useClaims();
  let nameDict =
    claims?.find((claim) => claim.type === "name") ||
    claims?.find((claim) => claim.type === "sub");
  let username = nameDict?.value;

  let state = useParams();

  return (
    <>
      <div className="layout-body">
        <div className="layout-header">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                height: "110px",
                boxShadow: "none",
              }}
            >
              <div className="nav-content">
                <Row>
                  <Col
                    xs={3}
                    sm={3}
                    md={2}
                    lg={2}
                    xl={2}
                    className="flexCenterAlign"
                  >
                    <Link to="/">
                      <img
                        className="admin-logo"
                        src={adminLogo}
                        alt="Genesis Logo"
                      />
                    </Link>
                  </Col>

                  <Col
                    xs={3}
                    sm={3}
                    md={7}
                    lg={7}
                    xl={7}
                    className="flexCenterAlign"
                  ></Col>

                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <div className="admin-info">
                      <div className="adminProfileDropDown">
                        <div className="admin-username">
                          <p className="admin-name">{userName}</p>
                          <p className="admin-role">{userRole}</p>
                        </div>

                        {/* <div
                          style={styles.adminImg}
                          className="admin-img"
                          onClick={handleClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        ></div> */}
                        <Avatar src="/broken-image.jpg" />

                        <div
                          className="arrow"
                          onClick={handleClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          {/* <FaAngleDown color="black" fontSize={"20"} /> */}
                          <img
                            className="admin-arrow"
                            src={arrowDown}
                            alt="Arrow Down"
                          />
                        </div>
                      </div>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <div className="dropdown-body">
                          <div className="dropdown-head">
                            <Row
                              className="d-flex justify-content-center align-items-center"
                              style={{ padding: "5%" }}
                            >
                              <Col md={5}>
                                <div className="profileimg-body">
                                  {/* <img
                                    className="profile-img"
                                    src={tempImg}
                                    alt="Profile Image"
                                  /> */}
                                  <Avatar src="/broken-image.jpg" />
                                </div>
                              </Col>
                              <Col md={7}>
                                <div className="profile-info">
                                  <p className="profile-name">{userName}</p>
                                  <p className="profile-role">{userRole}</p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="dropdown-content">
                            <button className="dropdownBtn">
                              Privacy Policy
                            </button>
                            <button
                              className="dropdownBtn"
                              onClick={handleOpenModal}
                            >
                              Change Password
                            </button>

                            <Modal
                              open={openModal}
                              onClose={handleCloseModal}
                              aria-labelledby="change-password-modal"
                              aria-describedby="change-password-form"
                            >
                              <div
                                style={{
                                  padding: "27px",
                                  backgroundColor: "white",
                                  margin: "150px auto",
                                  width: "35%",
                                  borderRadius:"10px"
                                }}
                              >
                                <ChangePasswordForm />
                              </div>
                            </Modal>
                            <button
                              className="dropdownBtn"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </Menu>
                    </div>
                  </Col>
                </Row>
              </div>
            </AppBar>
          </Box>
        </div>
        <div className="body-wrapper">
          <Row>
            <Col md={12}>{props.children}</Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Layout;
