import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaClone, FaCheck, FaTimes } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider,
  alpha,
  styled,
} from "@mui/material/styles";
import { DataGridPro, gridClasses, GridToolbar } from "@mui/x-data-grid-pro";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import "../StudySetup.css";
const ODD_OPACITY = 0.2;

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

const SubjectAttributes = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [load, setLoad] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [careGiverType, setCareGiverType] = React.useState([
    {
      id: 1,
      name: "Caregiver",
      edit: 1,
      delete: 1,
    },
    {
      id: 2,
      name: "Child",
      edit: 2,
      delete: 2,
    },
    {
      id: 3,
      name: "Friend",
      edit: 3,
      delete: 3,
    },
    {
      id: 4,
      name: "Other",
      edit: 4,
      delete: 4,
    },
    {
      id: 5,
      name: "Other Family Member",
      edit: 5,
      delete: 5,
    },
    {
      id: 6,
      name: "Parent",
      edit: 6,
      delete: 6,
    },
    {
      id: 7,
      name: "Spouse",
      edit: 7,
      delete: 7,
    },
  ]);
  const [pageSize, setPageSize] = React.useState(5);

  const [country, setCountry] = React.useState([
    {
      id: 1,
      countryName: "Pakistan",
    },
    {
      id: 2,
      countryName: "USA",
    },
    {
      id: 3,
      countryName: "Canada",
    },
    {
      id: 4,
      countryName: "Japan",
    },
    {
      id: 5,
      countryName: "China",
    },
    {
      id: 6,
      countryName: "Brazil",
    },
    {
      id: 7,
      countryName: "Australia",
    },
    {
      id: 8,
      countryName: "England",
    },
  ]);

  const [dataType, setDataType] = React.useState([
    {
      id: 1,
      typeName: "Data type 1",
    },
    {
      id: 2,
      typeName: "Data type 2",
    },
    {
      id: 3,
      typeName: "Data type 3",
    },
    {
      id: 4,
      typeName: "Data type 4",
    },
    {
      id: 5,
      typeName: "Data type 5",
    },
  ]);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows = careGiverType.map((row) => ({
    id: row.id,
    name: row.name,
    edit: row.edit,
    delete: row.delete,
  }));

  const columns = [
    {
      field: "id",
      hide: true,
      headerName: "ID",
      renderHeader: () => <strong>{"ID"}</strong>,
      width: "411",
    },
    {
      field: "name",
      // hide: true,
      headerName: "Name",
      renderHeader: () => <strong>{"Name"}</strong>,
      width: "900",
    },
    {
      field: "edit",
      // hide: true,
      headerName: "Edit",
      renderHeader: () => <strong>{"Edit"}</strong>,
      width: "350",
      renderCell: (params) => {
        // const id = params.row.id;
        // const name = params.row.name;
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
              // try {
              navigate(
                `/study-management/dose-levels/edit-dose`
                // ,{
                //   state: {
                //     id: id,
                //     name: name,
                //   },}
              );
              // } catch (err) {
              //   setLoad(false);
              //   console.log("Error: ", err.message);
              // }
            }}
          >
            <FaEdit
              color="#3661eb"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
    {
      field: "delete",
      // hide: true,
      headerName: "Delete",
      renderHeader: () => <strong>{"Delete"}</strong>,
      width: "200",
      renderCell: (params) => {
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
          >
            <FaTrashAlt
              color="rgb(140 140 140)"
              style={{
                fontSize: "15px",
              }}
            />
          </button>
        );
      },
    },
  ];

  const subjectAttributeInput = { fontSize: 12, width: "275px", height: "5px" };

  const fieldsWidth = {
    width: "300px",
  };

  const heightStyle = {
    height: "40px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "210px",
    height: "5px",
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
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/subject-attributes">
              Subject Attribues
            </Link>
          </p>
          <Box sx={{ marginTop: "2%" }}>
            <Box
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
                <Tab label="Subject Attributes" {...a11yProps(0)} />
                <Tab label="Subject Configuration" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box
                component="form"
                sx={{ height: "auto", width: "100%", padding: "4%" }}
                noValidate
                autoComplete="off"
              >
                <Row>
                  <Col md={3}>
                    <p
                      className="descriptionLabel"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      Country
                    </p>
                  </Col>
                  <Col md={9}>
                    <FormControl sx={fieldsWidth} className="subjectAtrrSelect">
                      <Select
                        // value={country}
                        // onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        style={heightStyle}
                      >
                        <MenuItem value="">
                          <em>Select Country</em>
                        </MenuItem>
                        {country.map((item) => (
                          <MenuItem value={item.countryName}>
                            {item.countryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={3}>
                    <p
                      className="descriptionLabel"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "45px",
                      }}
                    >
                      Name
                    </p>
                  </Col>
                  <Col md={9}>
                    <TextField
                      style={{ marginTop: "1%" }}
                      inputProps={{
                        style: subjectAttributeInput,
                      }}
                    />
                    {/* <FormControl sx={fieldsWidth} className="subjectAtrrSelect">
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        style={heightStyle}
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        {country.map((item) => (
                          <MenuItem value={item.countryName}>
                            {item.countryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                  </Col>
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={9}>
                    <div className="subjectAtrrBorder"></div>
                  </Col>
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <div className="subjectAtrrBody">
                    <h4>Add Attributes</h4>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Description (Actual Text):
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Test Key
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Error Description (Actual Text)
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Error Message
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Value Description (Actual Text)
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Value Description Key
                        </p>
                      </Col>
                      <Col md={9}>
                        <TextField
                          style={{ marginTop: "1%" }}
                          inputProps={{
                            style: subjectAttributeInput,
                          }}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={3}>
                        <p
                          className="descriptionLabel"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "45px",
                          }}
                        >
                          Data Type
                        </p>
                      </Col>
                      <Col md={9}>
                        <FormControl
                          sx={fieldsWidth}
                          className="subjectAtrrSelect"
                        >
                          <Select
                            style={heightStyle}
                            // value={country}
                            // onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em>Select a data</em>
                            </MenuItem>
                            {dataType.map((item) => (
                              <MenuItem value={item.id}>
                                {item.typeName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                      <Col md={11}>
                        <div className="studyAttributesTableRow">
                          <div>Name</div>
                          <div>Data type</div>
                          <div>Minimum</div>
                          <div>Maximum</div>
                          <div>Minimum Length</div>
                          <div>Default Value</div>
                          <div>Business rule</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Row>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="studyManageBody">
                <div className="subjectConfiguration">
                  <div className="subjectVariableHead">
                    <h1>Subject Variable</h1>
                  </div>
                  <Row>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">
                            Patient Number Include Site Id
                          </p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>
                            [bool 0/1] When creating a new subject/patient
                            number this value indicates whether the site id will
                            be included.
                          </p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">Patient Number Length</p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>Control the overall format of Subject number</p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="customDivider"></div>
                  <Row>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">Patient Number Prefix</p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>
                            [string] When creating a new subject/patient number
                            this value will be placed at the beginning of the
                            number. (ie. "S" + SiteNumber + SubjectNumber)
                          </p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">
                            Patient Number Prefix Site Seperator
                          </p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>
                            [string] When creating a new subject/patient number
                            this value will be used as a seperator between the
                            prefix and the site id. (ie. Seperator is "-": S +
                            "-" SiteNumber + SubjectNumber)
                          </p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="customDivider"></div>
                  <Row>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">
                            Patient Number Site Subject Number Seperator
                          </p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>
                            [string] When creating a new subject/patient number
                            this value will be used as a seperator between the
                            prefix and the site id. (ie. Seperator is "-": S +
                            "-" SiteNumber + SubjectNumber)
                          </p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="subjectVariableBody">
                        <div className="subjectVariableBodyInfo">
                          <p className="smallHeading">
                            Patient Number Prefix Site Seperator
                          </p>
                          {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
                        </div>
                        <div className="subjectVariableBody2">
                          <p>
                            [string] When creating a new subject/patient number
                            this value will be used as a seperator between the
                            prefix and the site id. (ie. Seperator is "-": S +
                            "-" SiteNumber + SubjectNumber)
                          </p>
                        </div>
                        <div className="subjectVariableInputBody">
                          <TextField
                            inputProps={{
                              style: textBoxStyles,
                            }}
                          />
                          <button className="updateBlueBtn">Update</button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="customDivider"></div>
                </div>

                {/* <div className="subjectConfiguration">
                  <div className="subjectVariableHead">
                    <h1>Subject Variable</h1>
                  </div>
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">
                        Patient Number Include Site Id
                      </p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [bool 0/1] When creating a new subject/patient number
                        this value indicates whether the site id will be
                        included.
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">Patient Number Length</p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>Control the overall format of Subject number</p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">Patient Number Prefix</p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [string] When creating a new subject/patient number this
                        value will be placed at the beginning of the number.
                        (ie. "S" + SiteNumber + SubjectNumber)
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">
                        Patient Number Prefix Site Seperator
                      </p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [string] When creating a new subject/patient number this
                        value will be used as a seperator between the prefix and
                        the site id. (ie. Seperator is "-": S + "-" SiteNumber +
                        SubjectNumber)
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">
                        Patient Number Site Subject Number Seperator
                      </p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [string] When creating a new subject/patient number this
                        value will be used as a seperator between the prefix and
                        the site id. (ie. Seperator is "-": S + "-" SiteNumber +
                        SubjectNumber)
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">
                        Patient Number Site Subject Number Seperator
                      </p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [string] When creating a new subject/patient number this
                        value will be used as a seperator between the prefix and
                        the site id. (ie. Seperator is "-": S + "-" SiteNumber +
                        SubjectNumber)
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div>

                <div className="subjectConfiguration">
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">
                        Patient Number Site Subject Number Separator
                      </p>
                      <p className="subjectDate">
                        Last Updated: 6/14/2022 11:49:22 PM
                      </p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>
                        [string] When creating a new subject/patient number this
                        value will be used as a seperator between the site id
                        and the subject number. (ie. Seperator is "*": S +
                        SiteNumber + "*" + SubjectNumber)
                      </p>
                    </div>
                    <div className="subjectVariableInputBody">
                      <TextField
                        inputProps={{
                          style: { fontSize: 15, width: "300px" },
                        }}
                      />
                      <button className="updateBlueBtn">Update</button>
                    </div>
                  </div>
                </div>
                <div className="customDivider"></div> */}
              </div>
            </TabPanel>
          </Box>

          <Row style={{ marginTop: "2%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <Link to="/study-management">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-lg">
                    Back To Create Study
                  </button>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default SubjectAttributes;
