import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const EcoaVariable = () => {
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
          <h1>eCOA Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">MaxPatientLoginAttempts</p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  The maximum number of logins a subject can fail before being
                  locked out of the system.
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
      </div>
      <div className="customDivider"></div>
      {/* <div className="customDivider"></div> */}
    </div>
  );
};

export default EcoaVariable;
