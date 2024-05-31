import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../StudySetup.css";
import "../StudyFiles/StudyFiles.css";
import "./Translation.css";

const Translations = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  return (
    <>
      {load ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/study-settings/translations">
              Translation
            </Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Translation</p>
              </div>
            </Col>
            <Col md={6}></Col>
          </Row>

          <div className="translationButtonContainer">
            <Link to="/study-management/study-settings/translations/import">
              <div className="translationImport">
                <button>Import</button>
              </div>
            </Link>
            <Link to="/study-management/study-settings/translations/export">
              <div className="translationExport">
                <button>Export</button>
              </div>
            </Link>
          </div>

          <Row style={{ marginTop: "2%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <Link to="/study-management">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-lg">
                    Back To Create Study
                  </button>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Translations;
