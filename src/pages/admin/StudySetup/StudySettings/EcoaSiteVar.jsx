import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const EcoaSiteVar = () => {
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
          <h1>eCOA Site Based Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">AutoSaveDiaryEntries</p>
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [bool 0/1] If '1' the app will autosave the SiteBased
                  DiaryEntry as the user answers each question.
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
                <p className="smallHeading">BatteryLevelCritical</p>
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [int 0-100] Percentage of battery level when a user will not
                  be able to access the diary until the battery has been
                  sufficiently charged.
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
                <p className="smallHeading">CaregiverPatientFormsEnabled</p>
              </div>
              <div className="subjectVariableBody2">
                <p>
                  [bool 0/1] If '1' caregivers will have the ability to take
                  patient questionnaires, if '0' caregivers will have the
                  ability to take caregiver questionnaires.
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

export default EcoaSiteVar;
