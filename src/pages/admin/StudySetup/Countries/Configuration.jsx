import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { Box } from "@mui/material";
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
import { toast } from "react-toastify";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getStudyCountryById } from "../../../../services/study_countries";
import { getAllRegions } from "../../../../services/system_country";
import { editStudyCountry } from "../../../../services/study_countries";
import { getDobFormatData } from "../../../../services/study_countries";

import "../StudySetup.css";

const Configuration = ({ countries, setValue }) => {
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
  const [checkRegionId, setCheckRegionId] = React.useState("");
  const [regionsData, setRegionsData] = React.useState([]);
  const [countryState, setCountryState] = React.useState([]);
  const [countryConfName, setCountryConfName] = React.useState("");
  const [dobDataState, setDobDataState] = React.useState([]);
  const [dobFormatValue, setDobFormatValue] = React.useState("");

  const countryConfSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    regionId: yup.string().required("This field is required"),
    recordPatientInitial: yup.bool().oneOf([true, false]),
    recordPatientDOB: yup.bool().oneOf([true, false]),
    use24HourTime: yup.bool().oneOf([true, false]),
    useSubjectCode: yup.bool().oneOf([true, false]),
    recordPatientGender: yup.bool().oneOf([true, false]),
  });

  const {
    register,
    setValue: setFormValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(countryConfSchema),
  });

  const notify = (msg) =>
    toast.success(`${msg} Configuration Complete`, {
      toastId: "createCountryConfiguration",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const fetchRegionData = async () => {
    try {
      setLoad(true);
      const res = await getAllRegions();
      if (res.status) {
        setLoad(false);
        setRegionsData(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  const fetchCountryById = async (id) => {
    try {
      setLoad(true);

      const res = await getStudyCountryById(id);

      if (res.status) {
        setLoad(false);
        console.log("COUNTRY DATAAA >>> ", res.data);
        setCountryState(res.data);
        const {
          id,
          name,
          regionId,
          dobFormat,
          recordPatientInitial,
          recordPatientDOB,
          use24HourTime,
          useSubjectCode,
          recordPatientGender,
        } = res.data;

        setRecordPatientCheck(recordPatientInitial);
        setRecordPatientDob(recordPatientDOB);
        setHourTimeCheck(use24HourTime);
        setSubjectCodeCheck(useSubjectCode);
        setRecordPatientGenderCheck(recordPatientGender);
        setCheckRegionId(regionId);
        setCountryConfName(name);
        setDobFormatValue(dobFormat);

        reset({
          name,
          dobFormat: dobFormat === null ? "" : dobFormat,
          regionId,
          recordPatientInitial,
          recordPatientDOB,
          use24HourTime,
          useSubjectCode,
          recordPatientGender,
        });
      }
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  const fetchDobFormats = async () => {
    try {
      const res = await getDobFormatData();
      if (res.status) {
        setDobDataState(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const onConfigSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);

      const { id, isoId, lastUpdate, labelGroup, sites, depots, languages } =
        countryState;

      const {
        name,
        notes,
        regionId,
        recordPatientInitial,
        recordPatientDOB,
        use24HourTime,
        useSubjectCode,
        recordPatientGender,
      } = data;

      const confData = {
        id,
        isoId,
        lastUpdate,
        labelGroup,
        sites,
        depots,
        name,
        dobFormat: dobFormatValue,
        notes,
        regionId,
        recordPatientInitial,
        recordPatientDOB,
        use24HourTime,
        useSubjectCode,
        recordPatientGender,
        languages,
      };

      const res = await editStudyCountry(id, confData);

      if (res.status) {
        notify(name);
        // setValue(2);
      }
    } catch (err) {
      setShowDialog(false);
      requestFailed(err.message);
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    fetchRegionData();
    fetchDobFormats();
  }, []);

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

  const pushCountryId = (countryId) => {
    setSearchId(countryId);
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

  const inActiveStyles = {
    countryBody: {
      paddingLeft: "80px",
      paddingTop: "15px",
      backgroundColor: "#fff",
      border: "1px solid #dcdcdc",
      borderRadius: "5px",
      margin: "10px",
      cursor: "pointer",
    },
    text: {
      fontSize: "18px",
    },
  };

  const activeStyles = {
    countryBody: {
      paddingLeft: "80px",
      paddingTop: "15px",
      backgroundColor: "#eee",
      border: "1px solid #147ad6",
      borderRadius: "5px",
      margin: "10px",
      cursor: "pointer",
    },
    text: {
      fontSize: "18px",
    },
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
                          sx={
                            searchId === country?.id
                              ? activeStyles.countryBody
                              : inActiveStyles.countryBody
                          }
                          onClick={() => pushCountryId(country?.id)}
                        >
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "left",
                                cursor: "pointer",
                              }}
                            >
                              <Typography
                                textAlign={"center"}
                                sx={
                                  searchId === country?.id
                                    ? activeStyles.text
                                    : inActiveStyles.text
                                }
                              >
                                {country.displayName}
                              </Typography>
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
            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>
            <Box
              onSubmit={handleSubmit(onConfigSubmit)}
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
              {searchId !== "" ? (
                <>
                  <div className="studyManageBody">
                    <div className="subjectConfiguration">
                      <div className="subjectVariableHead">
                        <h1>Setup Configuration For {countryConfName}</h1>
                      </div>
                    </div>
                  </div>

                  <Row style={rowSpacing}>
                    <Col md={3}>
                      <p className="descriptionLabel" style={labelStyles}>
                        Region
                        {/* <span className="error-highlight">*</span> */}
                      </p>
                    </Col>
                    <Col md={9}>
                      <FormControl sx={selectStyles}>
                        <Select
                          name="regionId"
                          value={checkRegionId}
                          {...register("regionId")}
                          className="dob_format_select"
                          onChange={(e) => {
                            setFormValue("regionId", e.target.value, {
                              shouldValidate: true,
                            });
                            setCheckRegionId(e.target.value);
                            setShowDialog(true);
                          }}
                          inputProps={{
                            style: textBoxStyles,
                            "aria-label": "Without label",
                          }}
                          disabled={true}
                        >
                          <MenuItem value="">
                            <em>Select DOB Format</em>
                          </MenuItem>
                          {regionsData.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
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
                          name="dobFormat"
                          value={dobFormatValue}
                          className="dob_format_select"
                          inputProps={{
                            style: textBoxStyles,
                            "aria-label": "Without label",
                          }}
                          onChange={(e) => {
                            e.preventDefault();
                            setDobFormatValue(e.target.value);
                          }}
                        >
                          <MenuItem value="">
                            <em>Select DOB Format</em>
                          </MenuItem>
                          {dobDataState.map((item, index) => (
                            <MenuItem key={index} value={item.dob}>
                              {item.dob}
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
                        checked={recordPatientCheck}
                        sx={{
                          ".css-i4bv87-MuiSvgIcon-root": {
                            fontSize: "2rem !important",
                          },
                        }}
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        inputProps={{ "aria-label": "controlled" }}
                        {...register("recordPatientInitial", {
                          onChange: (e) => {
                            setShowDialog(true);
                            setRecordPatientCheck(!recordPatientCheck);
                          },
                        })}
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
                        checked={recordPatientDob}
                        sx={{
                          ".css-i4bv87-MuiSvgIcon-root": {
                            fontSize: "2rem !important",
                          },
                        }}
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        inputProps={{ "aria-label": "controlled" }}
                        {...register("recordPatientDOB", {
                          onChange: (e) => {
                            setShowDialog(true);
                            setRecordPatientDob(!recordPatientDob);
                          },
                        })}
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
                        checked={hourTimeCheck}
                        sx={{
                          ".css-i4bv87-MuiSvgIcon-root": {
                            fontSize: "2rem !important",
                          },
                        }}
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        inputProps={{ "aria-label": "controlled" }}
                        {...register("use24HourTime", {
                          onChange: (e) => {
                            setShowDialog(true);
                            setHourTimeCheck(!hourTimeCheck);
                          },
                        })}
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
                        checked={subjectCodeCheck}
                        sx={{
                          ".css-i4bv87-MuiSvgIcon-root": {
                            fontSize: "2rem !important",
                          },
                        }}
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        inputProps={{ "aria-label": "controlled" }}
                        {...register("useSubjectCode", {
                          onChange: (e) => {
                            setShowDialog(true);
                            setSubjectCodeCheck(!subjectCodeCheck);
                          },
                        })}
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
                        checked={recordPatientGenderCheck}
                        sx={{
                          ".css-i4bv87-MuiSvgIcon-root": {
                            fontSize: "2rem !important",
                          },
                        }}
                        style={{ fontSize: "20px", marginTop: "2px" }}
                        inputProps={{ "aria-label": "controlled" }}
                        {...register("recordPatientGender", {
                          onChange: (e) => {
                            setShowDialog(true);
                            setRecordPatientGenderCheck(
                              !recordPatientGenderCheck
                            );
                          },
                        })}
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
                </>
              ) : (
                <>
                  <div className="studyManageBody">
                    <div className="subjectConfiguration">
                      <div className="subjectVariableHead">
                        <h1>Select Country From The List</h1>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Configuration;
