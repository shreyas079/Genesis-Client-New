import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/icon.png";
import bell from "../../assets/images/Groupbell.png";

const Notification = () => {
  return (
    <Container style={{ padding: "3%" }}>
      <div className="authContainer">
        <img className="logo-img" src={logo} alt="Genesis Logo" />
        <h1 className="logo-text">Genesis</h1>
      </div>
      <Row className="flexCenterAlign">
        <Col sm={12} md={8} lg={8} xl={8}>
          <div className="customCard">
            <div className="flexCenterAlign">
              <img className="bell-img" src={bell} alt="Bell Image" />
            </div>
            <div className="flexCenterAlign" style={{ marginTop: "12%" }}>
              <h3 className="notificationText">You Will Receive A Notification Email Shortly</h3>
            </div>
            <div className="flexCenterAlign">
              <h3 className="notificationText">With Your New Password</h3>
            </div>
            <div className="flexCenterAlign" style={{ marginTop: '30%' }}>
                <p style={{ color: '#717177', borderBottom: '1px solid #717177', marginBottom: '8%' }}>Back to Login</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Notification;
