import React from "react";

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

import sponsors from "../../../assets/admin/sponsors.png";
import studies from "../../../assets/admin/studies.png";
import users from "../../../assets/admin/users.png";
import { FaUsers, FaCog } from "react-icons/fa";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // var tokenState = location.state.tokenState ? location.state.tokenState : "empty";

  // React.useEffect(() => {
  //   console.log('TOKEN STATE ---> ', tokenState);
  // }, [tokenState]);

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
                <div className="img-body">
                  <img
                    className="card-img"
                    src={sponsors}
                    alt="Sponsors Image"
                  />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Sponsors</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-sponsors" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    <Col md={6} sm={6}>
                      <Link to="/sponsors" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  <img
                    className="card-img"
                    src={studies}
                    alt="Sponsors Image"
                  />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Studies</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-studies" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    <Col md={6} sm={6}>
                      <Link to="/studies" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  <img className="card-img" src={users} alt="Sponsors Image" />
                </div>

                <div className="heading-body">
                  <p className="card-heading">Users</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/all-users" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    <Col md={6} sm={6}>
                      <Link to="/import-study" rel="noopener noreferrer">
                        <button className="cardBtn">Import</button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="admin-card">
                <div className="img-body">
                  {/* <img className="card-img" src={users} alt="Sponsors Image" /> */}
                  <FaCog style={{ color: "#565656" }} className="card-img" />
                </div>

                <div className="heading-body">
                  <p className="card-heading">System Settings</p>
                </div>

                <div className="card-buttons">
                  <Row>
                    <Col md={6} sm={6}>
                      <Link to="/system-settings" rel="noopener noreferrer">
                        <button className="cardBtn">Manage</button>
                      </Link>
                    </Col>
                    <Col md={6} sm={6}>
                      <Link to="/import-study" rel="noopener noreferrer">
                        <button className="cardBtn">View</button>
                      </Link>
                    </Col>
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
