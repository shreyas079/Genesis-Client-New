import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import adminLogo from "../../assets/svgs/admin_logo.svg";
import arrowDown from "../../assets/svgs/arrow_down.svg";
import profile from "../../assets/admin/profile.png";
import { FaAngleDown } from "react-icons/fa";
import useClaims from "../../pages/auth/claims";
import { useParams } from "react-router-dom";
import StudyContext from "../../context/study/StudyContext";

const tempImg = "https://xsgames.co/randomusers/assets/avatars/male/5.jpg";

const styles = {
  adminImg: {
    backgroundImage: `url(${tempImg})`,
    backgroundPosition: "center" /* Center the image */,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize:
      "cover" /* Resize the background image to cover the entire container */,
  },
};
function StudyBuilderLayout(props) {
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [logoutUrl, setLogoutUrl] = React.useState("/bff/logout");
  const [userLogInInfo, setUserLogInInfo] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [userRole, setUserRole] = React.useState("");

  const { studyByIdData } = React.useContext(StudyContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const studySetupOptions = [
    {
      id: "1",
      name: "Study Settings",
      link: "/study-management/study-settings/alert-variable",
    },
    {
      id: "2",
      name: "Languages",
      link: "/study-management/languages",
    },
    {
      id: "3",
      name: "Countries",
      link: "/study-management/countries",
    },
    {
      id: "4",
      name: "Subject Attributes",
      link: "/study-management/subject-attributes",
    },
    {
      id: "5",
      name: "Caregivers",
      link: "/study-management/care-givers",
    },
    {
      id: "6",
      name: "Drug Type",
      link: "/study-management/drug-types",
    },
    {
      id: "7",
      name: "Dose Level",
      link: "/study-management/dose-levels",
    },
    {
      id: "8",
      name: "Treatment",
      link: "/study-management/treatment",
    },
  ];

  const studyType = [
    {
      id: "1",
      name: "Unified",
    },
    {
      id: "2",
      name: "eCOA",
    },
    {
      id: "3",
      name: "IRT",
    },
    {
      id: "4",
      name: "Unified",
    },
  ];

  const studyConfigure = [
    {
      id: "1",
      name: "Questionnaire",
      // link: "/study-management/questionnaire",
      link: "https://genesis.paklogics.com/qbuilder",
    },
    {
      id: "2",
      name: "Visits",
      link: "/study-management/visits",
    },
    {
      id: "3",
      name: "Dispensation",
      link: "/study-management/dispensations",
    },
    {
      id: "4",
      name: "Drug Type",
      link: "/study-management/drug-types",
    },
  ];

  const studyDocument = [
    {
      id: "1",
      name: "Screen Reports",
    },
    {
      id: "2",
      name: "SRD",
    },
    {
      id: "3",
      name: "Data Model",
    },
  ];

  const [studySetupAnchor, setStudySetupAnchor] = React.useState(null);
  const studySetupAnchorOpen = Boolean(studySetupAnchor);

  const handleStudySetupClick = (event) => {
    setStudySetupAnchor(event.currentTarget);
  };

  const handleStudySetupClose = () => {
    setStudySetupAnchor(null);
  };

  const [studyTypeAnchor, setStudyTypeAnchor] = React.useState(null);
  const studyTypeAnchorOpen = Boolean(studyTypeAnchor);

  const handleStudyTypeClick = (event) => {
    setStudyTypeAnchor(event.currentTarget);
  };

  const handleStudyTypeClose = () => {
    setStudyTypeAnchor(null);
  };

  const [studyConfigureAnchor, setStudyConfigureAnchor] = React.useState(null);
  const studyConfigureAnchorOpen = Boolean(studyConfigureAnchor);

  const handleStudyConfigureClick = (event) => {
    setStudyConfigureAnchor(event.currentTarget);
  };

  const handleStudyConfigureClose = () => {
    setStudyConfigureAnchor(null);
  };

  const [studyDocumentAnchor, setStudyDocumentAnchor] = React.useState(null);
  const studyDocumentAnchorOpen = Boolean(studyDocumentAnchor);

  const handleStudyDocumentClick = (event) => {
    setStudyDocumentAnchor(event.currentTarget);
  };

  const handleStudyDocumentClose = () => {
    setStudyDocumentAnchor(null);
  };

  const getUserLoggedIn = async () => {
    try {
      setLoading(true);
      const res = await getUserInfo();
      if (res.status === 200) {
        dispatch({ type: "SET_USER_INFO", payload: res.data });
      }
    } catch (err) {
      console.log("Error: ", err);
      disableLoading();
    }
  };

  // React.useEffect(() => {
  //   getUserLoggedIn();
  // }, []);

  const fetchIsUserLoggedIn = async () => {
    try {
      // const response = axios.get(BASE_URL + '/bff/user', {"Access-Control-Allow-Origin": "https://localhost:3000"}, { withCredentials: true });

      // if (response.ok && response.status === 200) {
      //   const data = await response.json();
      //   console.log('RESSS: ', data);
      // }

      const response = await fetch(
        `${process.env.REACT_APP_FRONT_URL}/bff/user`,
        {
          headers: {
            "X-CSRF": 1,
          },
        }
      );

      if (response.ok && response.status === 200) {
        const data = await response.json();
        const logoutUrl =
          data.find((claim) => claim.type === "bff:logout_url")?.value ??
          logoutUrl;
        setIsLoggedIn(true);
        setLogoutUrl(logoutUrl);
        setUserName(data[7].value);
        setUserRole(data[11].value);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  React.useEffect(() => {
    (async () => fetchIsUserLoggedIn())();
  }, []);

  const { data: claims, isLoading } = useClaims();
  // let logoutUrl = claims?.find((claim) => claim.type === "bff:logout_url");
  let nameDict =
    claims?.find((claim) => claim.type === "name") ||
    claims?.find((claim) => claim.type === "sub");
  let username = nameDict?.value;

  let state = useParams();

  //console.log('Use Params ===> ', state);

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
                  <Col md={2} className="flexCenterAlign">
                    <Link to="/study-management">
                      <img
                        className="admin-logo"
                        src={adminLogo}
                        alt="Genesis Logo"
                      />
                    </Link>
                  </Col>

                  <Col md={7}>
                    <div className="study-nav-dropdown-body">
                      <p>
                        Study Name: <span>{studyByIdData?.name}</span>
                      </p>
                      <p>
                        Sponsor: <span>{studyByIdData?.sponsor?.name}</span>
                      </p>
                      <p
                        aria-controls={
                          studyTypeAnchorOpen
                            ? "demo-positioned-menu"
                            : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={studyTypeAnchorOpen ? "true" : undefined}
                        onClick={handleStudyTypeClick}
                      >
                        Study Type:{" "}
                        <span>{studyByIdData?.studyType?.name}</span>
                      </p>
                      {/* <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={studyTypeAnchor}
                        open={studyTypeAnchorOpen}
                        onClose={handleStudyTypeClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {studyType.map((studyType, index) => (
                          <div className="menuListContainer" key={index}>
                            <MenuItem onClick={handleStudyTypeClose}>
                              <p>{studyType.name}</p>
                            </MenuItem>
                          </div>
                        ))}
                      </Menu> */}
                      <p
                        aria-controls={
                          studySetupAnchorOpen
                            ? "demo-positioned-menu"
                            : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          studySetupAnchorOpen ? "true" : undefined
                        }
                        onClick={handleStudySetupClick}
                      >
                        Study Setup
                        <FaAngleDown className="study-nav-arrow" />
                      </p>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={studySetupAnchor}
                        open={studySetupAnchorOpen}
                        onClose={handleStudySetupClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {studySetupOptions.map((study, index) => (
                          <div className="menuListContainer" key={index}>
                            <Link className="menuItemLink" to={study.link}>
                              <MenuItem onClick={handleStudySetupClose}>
                                {study.name}
                              </MenuItem>
                            </Link>
                          </div>
                        ))}
                      </Menu>
                      <p
                        aria-controls={
                          studyConfigureAnchor
                            ? "demo-positioned-menu"
                            : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          studyConfigureAnchor ? "true" : undefined
                        }
                        onClick={handleStudyConfigureClick}
                      >
                        Configure <FaAngleDown className="study-nav-arrow" />
                      </p>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={studyConfigureAnchor}
                        open={studyConfigureAnchorOpen}
                        onClose={handleStudyConfigureClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {studyConfigure.map((studyConfigure, index) => (
                          <div className="menuListContainer" key={index}>
                            <Link
                              className="menuItemLink"
                              to={studyConfigure.link}
                            >
                              <MenuItem onClick={handleStudyConfigureClose}>
                                {studyConfigure.name}
                              </MenuItem>
                            </Link>
                          </div>
                        ))}
                      </Menu>
                      <p
                        aria-controls={
                          studyDocumentAnchor
                            ? "demo-positioned-menu"
                            : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={studyDocumentAnchor ? "true" : undefined}
                        onClick={handleStudyDocumentClick}
                      >
                        Document <FaAngleDown className="study-nav-arrow" />
                      </p>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={studyDocumentAnchor}
                        open={studyDocumentAnchorOpen}
                        onClose={handleStudyDocumentClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {studyDocument.map((studyDoc, index) => (
                          <div className="menuListContainer" key={index}>
                            <MenuItem onClick={handleStudyDocumentClose}>
                              <p>{studyDoc.name}</p>
                            </MenuItem>
                          </div>
                        ))}
                      </Menu>
                      <p>
                        Customize <FaAngleDown className="study-nav-arrow" />
                      </p>
                    </div>
                  </Col>

                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <div className="admin-info">
                      <div className="adminProfileDropDown">
                        <div className="admin-username">
                          {/* <p className="admin-name">{userInfo.name}</p>
                          <p className="admin-role">{userInfo.role}</p> */}

                          <p className="admin-name">{userName}</p>
                          <p className="admin-role">{userRole}</p>
                        </div>

                        <div
                          style={styles.adminImg}
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
                                    src={tempImg}
                                    alt="Profile Image"
                                  />
                                </div>
                              </Col>
                              <Col md={7}>
                                <div className="profile-info">
                                  <p className="profile-name">
                                    {/* {userInfo.name} */}
                                    {userName}
                                  </p>
                                  <p className="profile-role">
                                    {/* {userInfo.name} */}
                                    {userRole}
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
                              // href={isLoggedIn ? logoutUrl : "/bff/logout"}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = logoutUrl;
                              }}
                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   setLogoutUser();
                              //   // window.href = "https://localhost:3000/signout-callback-oidc"
                              // }}
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
        <Row>
          <Col md={9}>
            <div className="body-wrapper">{props.children}</div>
          </Col>

          <Col md={3}>
            <div className="side-nav-wrapper">
              <div className="sideBarBody">
                <h1 className="sideBarHead">Customize</h1>
                <div className="sideBarOptions">
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/business-rules"
                    >
                      - Business Rules
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/alarms"
                    >
                      - Alarms
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/study-files"
                    >
                      - Study Files
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/submit-actions"
                    >
                      - Submit Actions
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/email-builder"
                    >
                      - Email Builder
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/translations"
                    >
                      - Translations
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/widgets"
                    >
                      - Widgets
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/dcf-workflow"
                    >
                      - DCF Workflow
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/reports"
                    >
                      - Reports
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/languages-of-system"
                    >
                      - Languages of system
                    </Link>
                  </div>
                  <div className="sideOption">
                    <Link
                      className="sideBarLink"
                      to="/study-management/study-settings/countries-of-system"
                    >
                      - Countries of the system
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default StudyBuilderLayout;
