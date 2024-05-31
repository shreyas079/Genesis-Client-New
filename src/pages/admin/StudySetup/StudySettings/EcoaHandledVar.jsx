import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const EcoaHandHeldVar = () => {
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
          <h1>eCOA Handheld Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">ActivateSubjectForms</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 11:49:22 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [bool 0/1] If enabled the 'Manage Visits' button will show in
                  the Site User Menu on handheld. Site users are able to
                  activate subject forms on the handheld.
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
                <p className="smallHeading">DataSyncHandheldInterval</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 7:27:56 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  This is the number in minutes when the handheld device will
                  attempt to sync to the server. -1 indicates that it is
                  disabled.
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
                <p className="smallHeading">DaisyChainHandheldPatientForms</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 7:27:56 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  This is a flag to turn on subject handheld forms to be chained
                  together.1 indicates that it is enabled.
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
                <p className="smallHeading">DataSyncHandheldInterval</p>
                {/* <p className="subjectDate">
                  Last Updated: 6/14/2022 7:27:56 PM
                </p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  This is the number in minutes when the handheld device will
                  attempt to sync to the server. -1 indicates that it is
                  disabled.
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
    </div>
  );
};

export default EcoaHandHeldVar;
