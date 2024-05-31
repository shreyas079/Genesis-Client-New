import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { Row, Col } from "react-bootstrap";

import "../StudySetup.css";

const AlertVariable = () => {
  const location = useLocation();

  const data = location.state.studySettingVariables;

  console.log("LOCATION STATE ... ", location.state);

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
          {data.map((item, index) => {
            if (index % 2 !== 0) {
              return null;
            }
            return (
              <React.Fragment key={item.name}>
                <Col md={6}>
                  <div className="subjectVariableBody">
                    <div className="subjectVariableBodyInfo">
                      <p className="smallHeading">{item.name}</p>
                    </div>
                    <div className="subjectVariableBody2">
                      <p>{item.description}</p>
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
                {index + 1 < data.length && (
                  <Col md={6}>
                    <div className="subjectVariableBody">
                      <div className="subjectVariableBodyInfo">
                        <p className="smallHeading">{data[index + 1].name}</p>
                      </div>
                      <div className="subjectVariableBody2">
                        <p>{data[index + 1].description}</p>
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
                )}
              </React.Fragment>
            );
          })}
        </Row>
        <div className="customDivider"></div>
      </div>
    </div>
  );
};

export default AlertVariable;
