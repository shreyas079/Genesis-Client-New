import React from "react";
import { Link } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const AlertVariable = () => {
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
          <h1>Alert Variable</h1>
        </div>
        <Row>
          <Col md={6}>
            <div className="subjectVariableBody">
              <div className="subjectVariableBodyInfo">
                <p className="smallHeading">DepotLotExpirationAlertThreshold</p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  List of thresholds for Depot Lot Expiration Alert. The
                  threshold list represents when the alert should trigger, in
                  days. For example, 180,120,0 would fire the alert once at 180,
                  once at 120, and once at 0. Add as many threshold triggers as
                  you like, separated by comma.
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
                <p className="smallHeading">
                  Low Depot Inventory Alert Interval Days
                </p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  The interval, in days, the system will send a Low Depot
                  Inventory Alert when the threshold is crossed. For example, a
                  value of 7 will send the low depot inventory alert every 7
                  days while the threshold value is crossed. Used in conjunction
                  with Low Depot Inventory Alert Threshold
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
                <p className="smallHeading">
                  Low Depot Inventory Alert Interval Days
                </p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  The interval, in days, the system will send a Low Depot
                  Inventory Alert when the threshold is crossed. For example, a
                  value of 7 will send the low depot inventory alert every 7
                  days while the threshold value is crossed. Used in conjunction
                  with Low Depot Inventory Alert Threshold
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
                <p className="smallHeading">
                  Low Depot Inventory Alert Threshold
                </p>
                {/* <p className="subjectDate">Last Updated: 6/14/2022 11:49:22 PM</p> */}
              </div>
              <div className="subjectVariableBody2">
                <p>
                  The threshold, in kit count, that will trigger a low depot
                  inventory alert. The inventory level has to been below the
                  threshold, and will be sent based on the Low Depot Inventory
                  Alert Interval Days value.
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

export default AlertVariable;
