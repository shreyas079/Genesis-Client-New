import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Sponsors.css";

const SponsorContainer = (sponsor, key) => {

  return (
    <Col key={key}>
      <div className="sponsorBody">
        <Link to="/view-sponsor">
          <img src={sponsor?.previewImg} className="sponsorImage" />
          <p className="sponsorSub">{sponsor?.name}</p>
        </Link>
      </div>
    </Col>
  );
};

export default SponsorContainer;
