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

import "./Study.css";

import jeep from "../../../assets/sponsors/jeep.png";
import arrowDown from "../../../assets/svgs/arrow_down.svg";

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

const Languages = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        Home | View Sponsors | Create Your Study | Languages
      </p>
      <Box sx={{ marginTop: "2%" }}>
        <Box
          sx={{ width: "100%", borderColor: "divider" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Countries" {...a11yProps(0)} />
            <Tab label="Languages" {...a11yProps(1)} />
            <Tab label="PMS Countries" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <p className="country-heading">
            Country:&nbsp;<span className="country-name">Algeria</span>
          </p>
          <div className="userForm-body">
            <Row style={{ marginTop: "1%" }}>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">en-US</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">ja-JP</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">es-ES</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">zh-CN</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">he-IL</p>
                </div>
              </Col>
            </Row>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <p className="country-heading">
            Country:&nbsp;<span className="country-name">Algeria</span>
          </p>
          <div className="userForm-body">
            <Row style={{ marginTop: "1%" }}>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">en-US</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">ja-JP</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">es-ES</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">zh-CN</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">he-IL</p>
                </div>
              </Col>
            </Row>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p className="country-heading">
            Country:&nbsp;<span className="country-name">Algeria</span>
          </p>
          <div className="userForm-body">
            <Row style={{ marginTop: "1%" }}>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">en-US</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">ja-JP</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">es-ES</p>
                </div>
              </Col>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">zh-CN</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <div className="sponsorBodyLang">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  />
                  <p className="langCode">he-IL</p>
                </div>
              </Col>
            </Row>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Languages;
