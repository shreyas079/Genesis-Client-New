import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BsArrowDown, BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./StudyManagement.css";
import screenReportsIcon from "../../../assets/study/screenreportsIcon.png";
import srdIcon from "../../../assets/study/srdIcon.png";
import dataModelIcon from "../../../assets/study/datamodelIcon.png";
import questionnaireIcon from "../../../assets/study/questionnaireIcon.png";
import visitsIcon from "../../../assets/study/visitsIcon.png";
import dispensation_icon from "../../../assets/study/dispensation_icon.png";
import drugReturnIcon from "../../../assets/study/drugReturnIcon.png";
import setting from "../../../assets/images/manage_setting.png";
import languagesIcon from "../../../assets/study/langIcon.png";
import countriesIcon from "../../../assets/study/countriesIcon.png";
import subjectIcon from "../../../assets/study/subjectIcon.png";
import caregiverIcon from "../../../assets/study/caregiverIcon.png";
import drugtypesIcon from "../../../assets/study/drugtypesIcon.png";
import doseIcon from "../../../assets/study/doseIcon.png";
import treatmentIcon from "../../../assets/study/treatmentIcon.png";
import StudyContext from "../../../context/study/StudyContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const arrowStyles = {
  paddingTop: "15px",
  paddingLeft: "8px",
  paddingBottom: "15px",
};

const StudyManagement = () => {
  const location = useLocation();

  const { fetchStudyById } = React.useContext(StudyContext);

  const id = location?.state?.id;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (id) {
      fetchStudyById(id);
    }
  }, [id]);

  const tabStyles = {
    fontSize: "12px",
    fontWeight: "700",
  };

  return (
    <div className="study-content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        <Link to="/sponsors">Manage Your Study</Link>
      </p>
      <div className="manageHeading">
        <h1>Manage Your Study</h1>
      </div>
      <Box sx={{ marginTop: "2%" }}>
        <Box
          sx={{
            width: "100%",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="manageStudyTabsBody"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="manageStudyTabs"
            variant="fullWidth"
          >
            <Tab sx={tabStyles} label="Study Setup" {...a11yProps(0)} />
            <Tab sx={tabStyles} label="Configuration" {...a11yProps(1)} />
            <Tab sx={tabStyles} label="Documents" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="studyManageBody">
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/study-settings/alert-variable"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={setting}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">
                        Study Settings
                        {/* <span style={{ color: "red" }}>*</span> */}
                      </p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/care-givers"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={caregiverIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Caregivers</p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/languages"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={languagesIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Languages</p>
                      {/* <div style={{ paddingTop: "7px", paddingLeft: "15px" }}>
                        <BsCheckLg
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#19a90c",
                          }}
                        />
                      </div> */}
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/drug-types"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={drugtypesIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Drug Types</p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/countries"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={countriesIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Countries</p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/dose-levels"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={doseIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Dose Levels</p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/subject-attributes"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={subjectIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Subject Attributes</p>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/treatment"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={treatmentIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">
                        Treatment
                        {/* <span style={{ color: "red" }}>*</span> */}
                      </p>
                      {/* <div style={{ paddingTop: "7px", paddingLeft: "15px" }}>
                        <BsCheckLg
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#19a90c",
                          }}
                        />
                      </div> */}
                    </div>
                  </Link>
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col md={10}></Col>
              <Col md={2}>
                <Link to="/sponsors">
                  <button className="blueManageBtn">Back To Study</button>
                </Link>
              </Col>
            </Row>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="studyManageBody">
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    // to="/study-management/questionnaire"
                    to="https://genesis.paklogics.com/qbuilder"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={questionnaireIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">
                        Questionnaire
                        {/* <span style={{ color: "red" }}>*</span> */}
                      </p>
                      {/* <div style={{ paddingTop: "7px", paddingLeft: "15px" }}>
                        <BsCheckLg
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#19a90c",
                          }}
                        />
                      </div> */}
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={1}>
                {/* <div style={{ paddingTop: "15px", paddingRight: "15px" }}>
                  <BsCheckLg
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#19a90c",
                    }}
                  />
                </div> */}
              </Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <Link
                    to="/study-management/dispensations"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="manageOption">
                      <img
                        src={dispensation_icon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Dispensation</p>
                    </div>
                  </Link>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <Link
                  to="/study-management/visits"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <div className="manageStudyOptions">
                    <div className="manageOption">
                      <img
                        src={visitsIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Visits</p>
                    </div>
                  </div>
                </Link>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                <Link
                  to="/study-management/drug-return"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <div className="manageStudyOptions">
                    <div className="manageOption">
                      <img
                        src={drugReturnIcon}
                        style={{ width: "35px", height: "35px" }}
                        alt=""
                      />
                      <p className="settingName">Drug Return</p>
                    </div>
                  </div>
                </Link>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col md={10}></Col>
              <Col md={2}>
                <Link to="/sponsors">
                  <button className="blueManageBtn">Back To Study</button>
                </Link>
              </Col>
            </Row>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="studyManageBody">
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <div className="manageOption">
                    <img
                      src={screenReportsIcon}
                      style={{ width: "35px", height: "35px" }}
                      alt=""
                    />
                    <p className="settingName">Screen Reports</p>
                  </div>
                </div>
                <div style={arrowStyles}>
                  <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  />
                </div>
              </Col>
              <Col md={1}>
                {/* <div style={{ paddingTop: "15px", paddingRight: "15px" }}>
                  <BsCheckLg
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#19a90c",
                    }}
                  />
                </div> */}
              </Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <div className="manageOption">
                    <img
                      src={srdIcon}
                      style={{ width: "35px", height: "35px" }}
                      alt=""
                    />
                    <p className="settingName">SRD</p>
                  </div>
                </div>
                <div style={arrowStyles}>
                  {/* <BsArrowDown
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  /> */}
                </div>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <div className="manageStudyOptions">
                  <div className="manageOption">
                    <img
                      src={dataModelIcon}
                      style={{ width: "35px", height: "35px" }}
                      alt=""
                    />
                    <p className="settingName">Data Model</p>
                  </div>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={3}>
                {/* <div className="manageStudyOptions">
                  <div className="manageOption">
                    <img
                      src={setting}
                      style={{ width: "35px", height: "35px" }}
                      alt=""
                    />
                    <p className="settingName">Drug Return</p>
                  </div>
                </div> */}
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col md={10}></Col>
              <Col md={2}>
                <Link to="/sponsors">
                  <button className="blueManageBtn">Back To Study</button>
                </Link>
              </Col>
            </Row>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default StudyManagement;
