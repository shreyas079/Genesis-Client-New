import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DCFWorkFlow = () => {
  return (
    <div className="content-body">
      <p className="study-management-link" style={{ fontWeight: "600" }}>
        <Link to="/study-management">Manage Your Study</Link> |{" "}
        <Link to="/study-management/study-settings/dcf-workflow">DCF WorkFlow</Link>
      </p>
      <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Col md={6}>
          <div className="study-management-head-start">
            <p className="study-management-heading">DCF WorkFlow</p>
          </div>
        </Col>
        <Col md={6}>
          {/* <Link to="/study-management/care-givers/create-caregiver">
            <div className="study-management-head-end">
              <button className="study-management-create-btn-md">
                Add New
              </button>
            </div>
          </Link> */}
        </Col>
      </Row>
    </div>
  );
};

export default DCFWorkFlow;
