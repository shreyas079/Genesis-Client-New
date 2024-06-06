import * as React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import adminLogo from "../../assets/svgs/admin_logo.svg";
import arrowDown from "../../assets/svgs/arrow_down.svg";
import profile from "../../assets/admin/profile.png";

let BASE_URL = "https://localhost:44447";

function TestLayout(props) {
  const [userSessionInfo, setUserSessionInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [logoutUrl, setLogoutUrl] = React.useState("/bff/logout");
  const [userLogInInfo, setUserLogInInfo] = React.useState([]);

  const { setLogoutUser, getUserLoggedIn, load, userInfo } =
    React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getUserLoggedIn();
  }, []);

  // const fetchUserSessionInfo = async () => {
  //   const response = await fetch(`${BASE_URL}/bff/user`, {
  //     headers: {
  //       "X-CSRF": 1,
  //     },
  //   });

  //   const data = await response.json();
  //   setUserSessionInfo(data);
  //   setLoading(false);
  // };

  // const fetchIsUserLoggedIn = async () => {
  //   try {
  //     // const response = axios.get(BASE_URL + '/bff/user', {"Access-Control-Allow-Origin": "https://localhost:3000"}, { withCredentials: true });

  //     // if (response.ok && response.status === 200) {
  //     //   const data = await response.json();
  //     //   console.log('RESSS: ', data);
  //     // }

  //     const response = await fetch(`${BASE_URL}/bff/user`, {
  //       headers: {
  //         "X-CSRF": 1,
  //       },
  //     });


  //     if (response.ok && response.status === 200) {
  //       const data = await response.json();
  //       const logoutUrl =
  //         data.find((claim) => claim.type === "bff:logout_url")?.value ??
  //         logoutUrl;
  //       setIsLoggedIn(true);
  //       setLogoutUrl(logoutUrl);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoggedIn(false);
  //   }
  // };

  // React.useEffect(() => {
  //   (async () => fetchUserSessionInfo())();
  // }, []);

  // const { data: claims, isLoading } = useClaims();
  // let logoutUrl = claims?.find((claim) => claim.type === "bff:logout_url");
  // let nameDict =
  //   claims?.find((claim) => claim.type === "name") ||
  //   claims?.find((claim) => claim.type === "sub");
  //   let username = nameDict?.value;

  //   let state = useParams();

  // console.log('Use Params ===> ', state);

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
                          <p className="admin-name">{userInfo.name}</p>
                          <p className="admin-role">{userInfo.role}</p>
                        </div>

                        <div
                          className="admin-img"
                          onClick={handleClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        ></div>
                        <div
                          className="arrow"
                          onClick={handleClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
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
                                  <img
                                    className="profile-img"
                                    src={profile}
                                    alt="Profile Image"
                                  />
                                </div>
                              </Col>
                              <Col md={7}>
                                <div className="profile-info">
                                  <p className="profile-name">
                                    {userInfo.name}
                                  </p>
                                  <p className="profile-role">
                                    {userInfo.name}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="dropdown-content">
                            <button className="dropdownBtn">
                              Privacy Policy
                            </button>
                            <button className="dropdownBtn">
                              Change Password
                            </button>
                            <button
                              className="dropdownBtn"
                              onClick={(e) => {
                                e.preventDefault();
                                setLogoutUser();
                                // window.href = "https://localhost:3000/signout-callback-oidc"
                              }}
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

export default TestLayout;
