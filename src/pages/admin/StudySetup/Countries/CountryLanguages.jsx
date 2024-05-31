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
  filteredCountries,
  countryWithLanguages,
  setCountryWithLanguages,
}) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [searchId, setSearchId] = React.useState("");
  const [countryByIdData, setCountryByIdData] = React.useState([]);
  const [showLanguages, setShowLanguages] = React.useState([]);

  const { handleSubmit } = useForm({});

  const notify = (name) =>
    toast.success(`Languages Configured For ${name}`, {
      toastId: "createStudySuccessToast",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const langWarning = (msg) =>
    toast.warn(`${msg}`, {
      toastId: "langWarning",
    });

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

  const handleByIdObjLang = (item, lang) => {
    const allcountries = showLanguages;

    const findCountry = allcountries.findIndex((cntry) => cntry.id === item.id);

    if (findCountry >= 0) {
      const selectedLanguages = allcountries[findCountry].selectedLanguages;

      const languageIndex = selectedLanguages.findIndex(
        (lng) => lng.id === lang.id
      );

      if (languageIndex >= 0) {
        selectedLanguages.splice(languageIndex, 1); // Remove the language object from the array
      } else {
        selectedLanguages.push(lang); // Add the language object to the array
      }

      setShowLanguages([...allcountries]);
    }
  };

  const fetchCountryById = async (id) => {
    try {
      setLoad(true);
      const res = await getStudyCountryById(id);
      if (res.status) {
        const {
          id,
          name,
          languages,
          isoId,
          regionId,
          createdBy,
          dateCreatedAt,
          dateCreatedUtc,
          dateUpdatedAt,
          dateUpdatedUtc,
          isActive,
          systemRegion,
          updatedBy,
        } = res.data;

        const newData = {
          id,
          name,
          displayName: name,
          isoId,
          regionId,
          createdBy,
          dateCreatedAt,
          dateCreatedUtc,
          dateUpdatedAt,
          dateUpdatedUtc,
          isActive,
          systemRegion,
          updatedBy,
          category: 2,
          selectedLanguages: languages,
        };

        setCountryByIdData(newData);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  const fetchLanguages = async () => {
    try {
      setLoad(true);
      const res = await getStudyLanguages();

      if (res.status) {
        const languageData = res.data;
        if (filteredCountries.length > 0) {
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
        if ([countryByIdData].length > 0) {
          const showLangs = [countryByIdData].map((item) => {
            return {
              ...item,
              languages: languageData,
              selectedLanguages:
                item?.selectedLanguages?.length > 0
                  ? item.selectedLanguages
                  : [],
            };
          });
          setShowLanguages(showLangs);
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
      if (showLanguages) {
        const countryData = showLanguages.filter(
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
        if (countryLangObj?.languages?.length === 0) {
          langWarning(
            `Please select atleast one language for ${countryLangObj?.displayName}`
          );
        } else {
          setLoad(true);
          const res = await editStudyCountry(id, countryLangObj);
          if (res.status) {
            notify(displayName);
          }
        }
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  React.useEffect(() => {
    if (searchId !== "") {
      fetchCountryById(searchId);
    }
  }, [searchId]);

  React.useEffect(() => {
    if ([countryByIdData].length > 0) {
      fetchLanguages();
    }
  }, [countryByIdData]);

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
                {showLanguages.length > 0 && searchId !== "" ? (
                  <>
                    <div className="studyManageBody">
                      {showLanguages.map((item, index) => (
                        <div className="subjectConfiguration" key={index}>
                          <div className="subjectVariableHead">
                            <h1>Setup Configuration For {item.displayName}</h1>
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
                                    onChange={() =>
                                      handleByIdObjLang(item, lang)
                                    }
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
