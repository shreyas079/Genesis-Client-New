import React, { useContext } from "react";
import SponsorContext from "../../../context/sponsor/SponsorContext";

import { Link } from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader";

import { getSponsorImage } from "../../../services/sponsors";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Study.css";

const Study = () => {
  const { sponsorsData, load, setLoading, disableLoading } =
    useContext(SponsorContext);

  const [newSponsor, setNewSponsor] = React.useState([]);

  const getImage = async () => {
    if (sponsorsData.length > 0) {
      Promise.allSettled(
        sponsorsData.map(async (sponsor) => {
          try {
            const res = await getSponsorImage(sponsor.imageUrl);

            const preview = res.data;

            const {
              createdBy,
              dateCreated,
              dateUpdated,
              id,
              imageUrl,
              isActive,
              name,
              secret,
              studies,
              updatedBy,
            } = sponsor;

            return {
              createdBy,
              dateCreated,
              dateUpdated,
              id,
              imageUrl,
              isActive,
              name,
              secret,
              studies,
              updatedBy,
              previewImg: `${preview}`,
            };
          } catch (err) {
            console.log("Error: ", err);
            return null;
          }
        })
      )
        .then((response) => {
          disableLoading();
          setNewSponsor(response.map(({ value }) => value));
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  };

  React.useEffect(() => {
    setLoading();
    getImage();
  }, [sponsorsData]);

  const numberOfRows = Math.ceil(sponsorsData.length / 4);

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
          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/sponsors">View Sponsors</Link>
          </p>
          <p className="sponsor-heading">Sponsors</p>
          <div className="sponsor-container">
            {Array(numberOfRows)
              .fill()
              .map((_, rowIndex) => (
                <Row key={rowIndex} style={{ marginTop: "3%" }}>
                  {newSponsor
                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                    .map((sponsor) => (
                      <Col xs="12" sm="4" md="3">
                        <Row className="sponsor-firstRow">
                          <Col>
                            <div className="sponsorBody">
                              <Link className="view-sponsor-link" to="/view-study">
                                <img
                                  src={sponsor.previewImg}
                                  className="sponsorImage"
                                  style={{ borderRadius: "50%" }}
                                />
                                <p className="sponsorSub">{sponsor.name}</p>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                </Row>
              ))}
            <Row className="sponsor-thirdRow">
              <Col md={12} className="d-flex justify-content-end">
                <Link to="/homepage">
                  <button className="sponsorBack">Back To Home Page</button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default Study;
