import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CountriesOfSystem = () => {
  return (
    <div className="content-body">
      <p className="study-management-link" style={{ fontWeight: "600" }}>
        <Link to="/study-management">Manage Your Study</Link> |{" "}
        <Link to="/study-management/study-settings/countries-of-system">Countries Of System</Link>
      </p>
      <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Col md={6}>
          <div className="study-management-head-start">
            <p className="study-management-heading">Countries Of System</p>
          </div>
        </Col>
        <Col md={6}>
        </Col>
      </Row>
    </div>
  );
};

export default CountriesOfSystem;
