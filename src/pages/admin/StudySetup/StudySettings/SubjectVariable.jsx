import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const SubjectVariable = () => {
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
          <h1>Subject Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">PatientNumberIncludeSiteId</p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [bool 0/1] When creating a new subject/patient number this
                  value indicates whether the site id will be included.
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
                <p className="smallHeading">PatientNumberLength</p>
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
                <p className="smallHeading">PatientNumberPrefix</p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [string] When creating a new subject/patient number this value
                  will be placed at the beginning of the number. (ie. "S" +
                  SiteNumber + SubjectNumber)
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
          <Col md={6}></Col>
        </Row>
        <div className="customDivider"></div>
      </div>
    </div>
  );
};

export default SubjectVariable;
