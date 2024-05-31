import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  FaPlusSquare,
  FaMinusSquare,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { Box, TextField } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getStudyCountryById } from "../../../../services/study_countries";

import "../StudySetup.css";

const Configuration = ({ countries }) => {
  const [load, setLoad] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [searchId, setSearchId] = React.useState("");

  const [recordPatientCheck, setRecordPatientCheck] = React.useState(false);
  const [recordPatientDob, setRecordPatientDob] = React.useState(false);
  const [hourTimeCheck, setHourTimeCheck] = React.useState(false);
  const [subjectCodeCheck, setSubjectCodeCheck] = React.useState(false);
  const [recordPatientGenderCheck, setRecordPatientGenderCheck] =
    React.useState(false);

  const countryConfSchema = yup.object().shape({
    // "shortName": yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    notes: yup.string().required("This field is required"),
    // "lastUpdate": yup.string().required("This field is required"),
    regionId: yup.string().required("This field is required"),
    recordPatientInitial: yup.bool().oneOf([true, false]),
    recordPatientDOB: yup.bool().oneOf([true, false]),
    use24HourTime: yup.bool().oneOf([true, false]),
    useSubjectCode: yup.bool().oneOf([true, false]),
    recordPatientGender: yup.bool().oneOf([true, false]),
    // "isoId": yup.string().required("This field is required"),
    // "labelGroup": null,
    // "sites": null,
    // "depots": null,
    // "languages": null,
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(countryConfSchema),
  });

  const dob_data = [
    {
      id: 1,
      format: "dd/MMM/yyyy",
    },
    {
      id: 2,
      format: "MMM/yyyy",
    },
    {
      id: 3,
      format: "yyyy",
    },
  ];

  // const fetchCountryById = async (id) => {
  //   try {
  //     setLoad(true);

  //     const res = await getStudyCountryById(id);

  //     if (res.status) {
  //       console.log("fetchCountryById RESS ... ", res.data);
  //       const {
  //         name,
  //         notes,
  //         regionId,
  //         recordPatientInitial,
  //         recordPatientDOB,
  //         use24HourTime,
  //         useSubjectCode,
  //         recordPatientGender,
  //         isoId,
  //         shortName,
  //         lastUpdate,
  //         labelGroup,
  //         sites,
  //         depots,
  //         languages
  //       } = res.data;

  //       reset({
  //         name,
  //         notes,
  //         regionId,
  //         recordPatientInitial
  //       });
  //     }
  //   } catch (err) {
  //     console.log("Error: ", err.message);
  //     setLoad(true);
  //   }
  // };

  React.useEffect(() => {
    setExpanded("panel1");
  }, []);

  React.useEffect(() => {
    if (searchId !== "") {
      fetchCountryById(searchId);
    }
  }, [searchId]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const countriesInputStyles = {
    fontSize: 15,
    height: "5px !important",
  };

  const fieldsWidth = {
    width: "300px",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "45px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "320px",
    height: "5px",
  };

  const textDateBoxStyles = {
    fontSize: 15,
    width: "270px",
    height: "10px",
  };

  const rowSpacing = {
    marginTop: "2%",
  };

  const rowStyles = {
    marginTop: "2%",
    marginBottom: "2%",
  };

  const selectStyles = {
    width: "300px",
    // marginTop: 1,
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/");
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
        <Row>
          <Col md={4}>
            <Box
              sx={{
                height: "auto",
                width: "100%",
                padding: "4%",
                gap: "10px",
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ width: "80%" }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === "panel1" ? (
                        <FaMinusSquare color="red" fontSize="16px" />
                      ) : (
                        <FaPlusSquare color="green" fontSize="16px" />
                      )
                    }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        width: "100%",
                        flexShrink: 0,
                      }}
                    >
                      Selected Countries
                    </Typography>
                  </AccordionSummary>
                  <>
                    {countries?.map((country, index) => {
                      return (
                        <AccordionDetails
                          key={index}
                          sx={{
                            backgroundColor: "#fff",
                            border: "1px solid #dcdcdc",
                            borderRadius: "5px",
                            margin: "10px",
                          }}
                        >
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                }}
                              >
                                {country.displayName}
                              </Typography>
                              <div
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                                // onClick={() => setSearchId(country?.id)}
                                //   onClick={() =>
                                //     handleSelectLang(
                                //       item.id
                                //     )
                                //   }
                              >
                                <FaArrowAltCircleRight
                                  color="#3661eb"
                                  style={{
                                    fontSize: "18px",
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        </AccordionDetails>
                      );
                    })}
                  </>
                </Accordion>
              </div>
            </Box>
          </Col>
          <Col md={8}>
            <Box
              component="form"
              sx={{
                height: "auto",
                width: "100%",
                padding: "4%",
                gap: "10px",
              }}
              noValidate
              autoComplete="off"
            >
              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Name
                  </p>
                </Col>
                <Col md={9}>
                  <FormControl sx={fieldsWidth} className="countriesSelect">
                    <TextField
                      inputProps={{
                        style: textBoxStyles,
                      }}
                    />
                  </FormControl>
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Notes
                  </p>
                </Col>
                <Col md={9}>
                  <FormControl sx={fieldsWidth} className="countriesSelect">
                    <TextField
                      multiline
                      rows={6}
                      placeholder="Enter Notes"
                      inputProps={{
                        style: countriesInputStyles,
                      }}
                    />
                  </FormControl>
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Region
                  </p>
                </Col>
                <Col md={9}>
                  <FormControl sx={fieldsWidth} className="countriesSelect">
                    <TextField
                      type="text"
                      inputProps={{
                        style: textDateBoxStyles,
                      }}
                    />
                  </FormControl>
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    DOB Format
                  </p>
                </Col>
                <Col md={9}>
                  <FormControl sx={selectStyles}>
                    <Select
                      className="dob_format_select"
                      name="dob_format"
                      defaultValue={""}
                      inputProps={{
                        style: textBoxStyles,
                        "aria-label": "Without label",
                      }}
                    >
                      <MenuItem value="">
                        <em>Select DOB Format</em>
                      </MenuItem>
                      {dob_data.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.format}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Record Patient Initial
                  </p>
                </Col>
                <Col md={9}>
                  <Checkbox
                    sx={{
                      ".css-i4bv87-MuiSvgIcon-root": {
                        fontSize: "2rem !important",
                      },
                    }}
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Record Patient DOB
                  </p>
                </Col>
                <Col md={9}>
                  <Checkbox
                    sx={{
                      ".css-i4bv87-MuiSvgIcon-root": {
                        fontSize: "2rem !important",
                      },
                    }}
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Use 24 Hour Time
                  </p>
                </Col>
                <Col md={9}>
                  <Checkbox
                    sx={{
                      ".css-i4bv87-MuiSvgIcon-root": {
                        fontSize: "2rem !important",
                      },
                    }}
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Use Subject Code
                  </p>
                </Col>
                <Col md={9}>
                  <Checkbox
                    sx={{
                      ".css-i4bv87-MuiSvgIcon-root": {
                        fontSize: "2rem !important",
                      },
                    }}
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Row style={rowSpacing}>
                <Col md={3}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Record Patient Gender
                  </p>
                </Col>
                <Col md={9}>
                  <Checkbox
                    sx={{
                      ".css-i4bv87-MuiSvgIcon-root": {
                        fontSize: "2rem !important",
                      },
                    }}
                    style={{ fontSize: "20px", marginTop: "2px" }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Row style={rowStyles}>
                <Col md={6}></Col>
                <Col md={3}>
                  <div className="study-management-head-end">
                    <button
                      onClick={(e) => {
                        handleCancel(e);
                      }}
                      className="study-management-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="study-management-head-end">
                    <button
                      type="submit"
                      className="study-management-create-btn-md"
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Configuration;
