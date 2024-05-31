import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const StudyVariable = () => {
  const textBoxStyles = {
    fontSize: 15,
    width: "210px",
    height: "5px",
  };
  
  return (
    <div className="alertVariableBody">
      <p
        className="admin-link"
        style={{ fontWeight: "600", paddingTop: "25px" }}
      >
        <Link to="/study-management">Manage Your Study</Link> |{" "}
        <Link to="">Study Setup</Link>
      </p>
      <div className="subjectConfiguration">
        <div className="subjectVariableHead">
          <h1>Study Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">BringYourOwnDeviceAvailable</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 11:49:22 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  This determines if the study has bring your own device
                  functionality.
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
                <p className="smallHeading">CSVExportDelimiter</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 11:49:22 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>Delimiter for grid csv exports</p>
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
                <p className="smallHeading">GenesisLogoUrl</p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>Genesis Logo Url</p>
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
          <Col md={6}></Col>
        </Row>
      </div>

      <div className="customDivider"></div>
    </div>
  );
};

export default StudyVariable;
