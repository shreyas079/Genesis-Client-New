import React from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { Checkbox, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getStudyLanguages } from "../../../../services/study_languages";
import { editStudyCountry } from "../../../../services/study_countries";
import { getStudyCountryById } from "../../../../services/study_countries";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CountryLanguages = ({
  fetchCountries,
  filteredCountries,
  value,
  handleLangObj,
  checkedLanguages,
  countryWithLanguages,
  setCountryWithLanguages,
}) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [searchId, setSearchId] = React.useState("");

  const { handleSubmit } = useForm({});

  const notify = (name) =>
    toast.success(`Languages Added To ${name}`, {
      toastId: "createStudySuccessToast",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  // const warnLang = (msg) =>
  //   toast.warn(`${msg} has no languages selected`, {
  //     toastId: "warnLang",
  //   });

  React.useEffect(() => {
    setExpanded("panel1");
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/");
  };

  const rowStyles = {
    marginTop: "200px",
    marginBottom: "2%",
  };

  const fetchCountryById = async (id) => {
    try {
      const res = await getStudyCountryById(id);
      console.log("fetchCountryById RESSS .... ", res);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchLanguages = async () => {
    try {
      setLoad(true);
      const res = await getStudyLanguages();

      if (res.status) {
        if (filteredCountries.length > 0) {
          const languageData = res.data;
          const updatedCountries = filteredCountries.map((item) => {
            return {
              ...item,
              languages: languageData,
              selectedLanguages:
                item?.selectedLanguages?.length > 0
                  ? item.selectedLanguages
                  : [],
            };
          });
          setCountryWithLanguages(updatedCountries);
        }
      }
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  const submitLanguages = async () => {
    try {
      if (countryWithLanguages) {
        const countryData = countryWithLanguages.filter(
          (item) => item.id === searchId
        );
        const {
          category,
          createdBy,
          dateCreatedAt,
          dateCreatedUtc,
          dateUpdatedAt,
          dateUpdatedUtc,
          displayName,
          id,
          isActive,
          isoId,
          name,
          regionId,
          selectedLanguages,
          systemRegion,
          updatedBy,
        } = countryData[0];

        const countryLangObj = {
          category: true,
          createdBy,
          dateCreatedAt,
          dateCreatedUtc,
          dateUpdatedAt,
          dateUpdatedUtc,
          displayName,
          id,
          isActive,
          isoId,
          name,
          regionId,
          systemRegion,
          updatedBy,
          languages: selectedLanguages,
        };

        // if (allLanguagesSelected) {
        setLoad(true);
        const res = await editStudyCountry(id, countryLangObj);
        if (res.status) {
          notify(displayName);
          // setValue(3);
        }
        // }
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    fetchLanguages();
  }, []);

  React.useEffect(() => {
    if (searchId !== "") {
      fetchCountryById(searchId);
    }
  }, [searchId]);

  React.useEffect(() => {
    if (value !== 2) {
      fetchCountries();
    }
  }, [value]);

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
        <>
          <Row>
            <Col md={4}>
              <Box
                // component="form"
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
                      // key={index}
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
                      {countryWithLanguages?.map((country, index) => {
                        return (
                          <AccordionDetails
                            key={index}
                            sx={
                              searchId === country?.id
                                ? activeStyles.countryBody
                                : inActiveStyles.countryBody
                            }
                            onClick={() => setSearchId(country?.id)}
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
              <Box
                onSubmit={handleSubmit(submitLanguages)}
                component="form"
                sx={{
                  height: "500px",
                  width: "100%",
                  padding: "4%",
                  gap: "10px",
                }}
                noValidate
                autoComplete="off"
              >
                {countryWithLanguages.length > 0 && searchId !== "" ? (
                  <>
                    <div className="studyManageBody">
                      {countryWithLanguages
                        .filter((item) => item.id === searchId)
                        .map((item, index) => (
                          <div className="subjectConfiguration" key={index}>
                            <div className="subjectVariableHead">
                              <h1>
                                Setup Configuration For {item.displayName}
                              </h1>
                            </div>
                            <div className="country-lang-cols">
                              {item?.languages?.map((lang, index2) => (
                                <div className="sponsorSelectBody" key={index2}>
                                  <div className="countryBody">
                                    <label className="country-lang-label">
                                      {lang.displayName}
                                    </label>
                                    <Checkbox
                                      {...label}
                                      checked={item?.selectedLanguages?.some(
                                        (langObj) => langObj.id === lang.id
                                      )}
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 24,
                                          color: "#3661eb",
                                        },
                                      }}
                                      onChange={() => handleLangObj(item, lang)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
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
        </>
      )}
    </>
  );
};

export default CountryLanguages;
