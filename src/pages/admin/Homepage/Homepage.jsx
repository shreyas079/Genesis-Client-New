import React, { useContext } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Homepage.css";

import sponsorsImg from "../../../assets/admin/sponsorsImg.png";
import studies from "../../../assets/admin/studies.png";
import users from "../../../assets/admin/users.png";
import { FaUsers, FaCog } from "react-icons/fa";
import PieChart from "../../../components/PieChart/PieChart";
import PieChartWithLabel from "../../../components/PieChart/PieChart";
import PieGauge from "../../../components/PieChart/PieChart";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSponsorDetails from "../../../hooks/Api/useSponsorsDetails";
import SponsorContext from "../../../context/sponsor/SponsorContext";
import { green } from "@mui/material/colors";
import StudyContext from "../../../context/study/StudyContext";
import UserContext from "../../../context/user/UserContext";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount } = useContext(SponsorContext);
  const { totalStudyCount } = useContext(StudyContext);
  const { usersCount } = useContext(UserContext);
  const usersValue = usersCount || 7;
  const studyCount = totalStudyCount || 10;
  const value = totalCount || 10;

  return (
    <>
      <div className="content-body">
        <p className="admin-link" style={{ fontWeight: "600" }}>
          <Link to="/homepage">Home</Link>
        </p>
        <p className="admin-heading">Admin Panel</p>
        <div className="card-container">
          <Row>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <Row style={{ padding: "12px" }}>
                  <Col md={6} sm={6} className="card-col-pie">
                    <img
                      className="card-img"
                      src={sponsorsImg}
                      alt="Sponsors Image"
                    />
                    <div className="heading-body">
                      <p className="card-heading">Sponsors</p>
                    </div>
                  </Col>
                  <Col md={6} sm={6}>
                    <div style={{ width: 75, height: 100 }}>
                      <CircularProgressbar
                        value={value}
                        styles={{ color: "green" }}
                        text={`${value}`}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="img-body">
                  <img
                    className="card-img"
                    src={sponsors}
                    alt="Sponsors Image"
                  />

                  <div className="heading-body">
                  <p className="card-heading">Sponsors</p>
                </div>
                </div> */}

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-sponsors" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    {/* <Col md={6} sm={6}>
                      <Link to="/sponsors" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col> */}
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <Row style={{ padding: "12px" }}>
                  <Col md={6} sm={6} className="card-col-pie">
                    <img
                      className="card-img"
                      src={studies}
                      alt="Sponsors Image"
                    />
                    <div className="heading-body">
                      <p className="card-heading">Studies</p>
                    </div>
                  </Col>
                  <Col md={6} sm={6}>
                    <div style={{ width: 75, height: 100 }}>
                      <CircularProgressbar
                        value={studyCount}
                        styles={{ color: "green" }}
                        text={`${studyCount}`}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="img-body">
                  <img
                    className="card-img"
                    src={studies}
                    alt="Sponsors Image"
                  />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Studies</p>
                </div> */}

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-studies" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    {/* <Col md={6} sm={6}>
                      <Link to="/studies" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col> */}
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <Row style={{ padding: "12px" }}>
                  <Col md={6} sm={6} className="card-col-pie">
                    <img
                      className="card-img"
                      src={users}
                      alt="Sponsors Image"
                    />
                    <div className="heading-body">
                      <p className="card-heading">Users</p>
                    </div>
                  </Col>
                  <Col md={6} sm={6}>
                    <div style={{ width: 75, height: 100 }}>
                      <CircularProgressbar
                        value={usersValue}
                        styles={{ color: "green" }}
                        text={`${usersValue}`}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="img-body">
                  <img className="card-img" src={users} alt="Sponsors Image" />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Users</p>
                </div> */}

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-users" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    {/* <Col md={6} sm={6}>
                      <Link to="/import-study" rel="noopener noreferrer">
                        <button className="cardBtn">Import</button>
                      </Link>
                    </Col> */}
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <Row style={{ padding: "12px" }}>
                  <Col md={6} sm={6} className="card-col-pie">
                    {/* <img
                      className="card-img"
                      src={users}
                      alt="Sponsors Image"
                    /> */}
                    <FaCog style={{ color: "#565656" }} className="card-img" />

                    <div className="heading-body">
                      <p className="card-heading">System Settings</p>
                    </div>
                  </Col>
                  <Col md={6} sm={6}>
                    <div style={{ width: 75, height: 100 }}>
                      <CircularProgressbar
                        value={value}
                        styles={{ color: "green" }}
                        text={`${value}`}
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="img-body">
                  <FaCog style={{ color: "#565656" }} className="card-img" />
                </div>

                <div className="heading-body">
                  <p className="card-heading">System Settings</p>
                </div> */}

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/system-settings" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    {/* <Col md={6} sm={6}>
                      <Link to="/import-study" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col> */}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Homepage;
