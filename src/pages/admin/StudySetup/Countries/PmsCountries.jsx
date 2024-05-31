import React from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Box, FormControl, Select, MenuItem, Checkbox } from "@mui/material";

const PmsCountries = ({ filteredCountries, checkedLanguages }) => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const notify = () =>
    toast.success("Study Countries Changes Saved", {
      toastId: "form-creation",
    });

  const submitPmsCountries = async () => {
    try {
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        notify();
      }, 1000);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/");
  };

  const rowStyles = {
    marginTop: "150px",
    marginBottom: "2%",
  };

  const fieldsWidth = {
    width: "300px",
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
        <div className="studyManageBody">
          <Box
            onSubmit={submitPmsCountries}
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
            <div className="pmsCountriesSelect">
              <Row>
                <Col md={7}></Col>
                <Col md={2}>
                  <div className="selectCountry">
                    <p>Selected Countries</p>
                  </div>
                </Col>
                <Col md={3}>
                  <FormControl sx={fieldsWidth} className="countriesSelect">
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      style={{ height: "40px" }}
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {filteredCountries.map((item) => (
                        <MenuItem value={item.displayName}>
                          {item.displayName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
            </div>
            <div className="pmsCheckboxContainer">
              <div className="pms-lang-cols">
                {filteredCountries.flatMap((country) =>
                  country?.selectedLanguages?.map((language) => (
                    <div className="countriesChecks" key={language.id}>
                      <div className="countriesCheckboxContainer">
                        <Checkbox
                          checked={country?.selectedLanguages?.some(
                            (langObj) => langObj.id === language.id
                          )}
                          // checked={checkedLanguages?.includes(language?.id)}
                          className="countriesCheckbox"
                        />
                      </div>
                      <div className="countriesCheckboxDescription">
                        <p>{language.cultureName}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <Row style={rowStyles}>
              <Col md={8}></Col>
              <Col md={2}>
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
              <Col md={2}>
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
        </div>
      )}
    </>
  );
};

export default PmsCountries;
