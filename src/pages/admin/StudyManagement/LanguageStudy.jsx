import React, {useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";


import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import "./StudyManagement.css";

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

const LanguageStudy = () => {
  const [value, setValue] = useState(0);
  const [age, setAge] = useState("");
  const [selectedOption, setSelectedOption] = useState(null)

//   const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        Manage Your Study | Languages
      </p>

      <Box sx={{ marginTop: "2%" }}>
        <h2>Language</h2>
        {/* <Box
          sx={{ width: "100%", borderColor: "divider" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="manageStudyTabsBody"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="manageStudyTabs"
          >
            <Tab label="Countries" {...a11yProps(0)} />
            <Tab label="Languages" {...a11yProps(1)} />
            <Tab label="PMS Countries" {...a11yProps(2)} />
          </Tabs>
        </Box> */}
        <TabPanel value={value} index={0}>
          <div className="studyManageBody">
            <Row>
              <Col>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Without label</FormHelperText>
                </FormControl>
              </Col>
            </Row>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </Box>
    </div>
  );
};

export default LanguageStudy;
