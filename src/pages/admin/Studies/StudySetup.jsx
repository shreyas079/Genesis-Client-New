import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

import { Row, Col } from "react-bootstrap";

import jeep from "../../../assets/sponsors/jeep.png";
import arrowDown from "../../../assets/svgs/arrow_down.svg";
import settings from "../../../assets/study/settings.png";

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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const StudySetup = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        Home | View Sponsors | Create Your Study
      </p>
      <Row style={{ marginTop: '2%' }}>
        <Col md={12}>
            <div className="thickHeading d-flex align-items-center justify-content-center">
                Manage Your Study
            </div>
        </Col>
      </Row>
      <Box sx={{ marginTop: "2%" }}>
        <Box sx={{ width: "100%", borderColor: "divider", display: 'flex', alignItems: 'center', justifyContent: "center" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Study Setup" {...a11yProps(0)} />
            <Tab label="Configuration" {...a11yProps(1)} />
            <Tab label="Documents" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Row className="d-flex align-items-center justify-content-center">
                <Col md={6}>
                    <div className="studySettingsContainer">
                        <img src={settings} style={{ width: '' }} />
                    </div>
                </Col>
                <Col md={6}>
                </Col>
            </Row>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <p className="user-heading">Sponsors</p>
          <Row style={{ marginTop: "2%" }}>
            {/* <Col md={1}></Col> */}
            <Col md={10}>
              <Row className="sponsor-firstRow">
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">Lamborgini</p>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">Plex</p>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">Mary</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row style={{ marginTop: "1%" }}>
            {/* <Col md={1}></Col> */}
            <Col md={10}>
              <Row className="sponsor-firstRow">
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">Donuts</p>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">System</p>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <p className="sponsorSubUser">10&nbsp;Pearl</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <div className="createSponsor-buttons">
                <button className="sponsorCancelButton">Cancel</button>
                <button className="sponsorCreateButton">Create</button>
              </div>
            </Col>
          </Row>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p className="user-heading">Enrolled Studies</p>
          <Row style={{ marginTop: "2%" }}>
            {/* <Col md={1}></Col> */}
            <Col md={10}>
              <Row className="sponsor-firstRow">
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">Lamborgini</p>
                      <p className="sponsorSubUser">
                        Role & Sites{" "}
                        <img
                          className="admin-arrow"
                          src={arrowDown}
                          alt="Arrow Down"
                        />
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">Plex</p>
                      <p className="sponsorSubUser">Role & Sites</p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />

                    <div className="userTextContainer">
                      <p className="sponsorSubUser">Mary</p>
                      <p className="sponsorSubUser">Role & Sites</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row style={{ marginTop: "1%" }}>
            {/* <Col md={1}></Col> */}
            <Col md={10}>
              <Row className="sponsor-firstRow">
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">Donuts</p>
                      <p className="sponsorSubUser">Role & Sites</p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">System</p>
                      <p className="sponsorSubUser">Role & Sites</p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="sponsorBodyUser">
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    />
                    <img src={jeep} className="sponsorImageUser" />
                    <div className="userTextContainer">
                      <p className="sponsorSubUser">10&nbsp;Pearl</p>
                      <p className="sponsorSubUser">Role & Sites</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <div className="createSponsor-buttons">
                <button className="sponsorCancelButton">Cancel</button>
                <button className="sponsorCreateButton">Create</button>
              </div>
            </Col>
          </Row>
        </TabPanel>
      </Box>
    </div>
  );
};

export default StudySetup;
