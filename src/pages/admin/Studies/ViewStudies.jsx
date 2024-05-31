import React from "react";
import { Link } from "react-router-dom";
import "./Study.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jeep from "../../../assets/sponsors/jeep.png";
import setting from "../../../assets/sponsors/setting.png";
import Table from "react-bootstrap/Table";

const ViewStudies = () => {
  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        <Link to="/homepage">Home</Link> |{" "}
        <Link to="/studies">View Studies</Link>
      </p>
      <p className="sponsor-heading">All Studies</p>
      <div className="upload-body">
        <img src={jeep} className="uploadImg-view" />
        <p className="uploadText-view">Genesis (Sponsor)</p>
      </div>
      <div className="viewSponsor-table">
        <Row>
          <Col md={12}>
            <Table bordered className="tableBody">
              <tbody>
                <tr>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                  <td>
                    <Row className="studyRow">
                      <Col md={8}>Genesis- Localhost</Col>
                      <Col md={4}>
                        <Link
                          to={"/study-management"}
                          // to={url + '/study-management'}
                          // target="_blank"
                          // rel="noopener noreferrer"
                        >
                          <img src={setting} className="settingImg" />
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>

      <Row style={{ marginTop: "3%" }}>
        <Col md={6}></Col>
        <Col md={6}>
          <Link
            to={"/studies"}
            style={{
              "&hover": {
                textDecoration: "none",
              },
            }}
          >
            <div className="createSponsor-buttons">
              <button className="sponsorBackButton">Back</button>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ViewStudies;
