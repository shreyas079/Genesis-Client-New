// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Sponsors.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import jeep from "../../../assets/sponsors/jeep.png";
// import setting from "../../../assets/sponsors/setting.png";
// import Table from "react-bootstrap/Table";

// const ViewSponsors = () => {
//   const location = useLocation();

//   const [sponsorState, setSponsorState] = React.useState(
//     location?.state?.sponsor
//   );

//   console.log(
//     "Sponsor State Length ... ",
//     sponsorState
//   );

//   const numberOfRows = Math.ceil(sponsorState?.studies?.length / 4);

//   console.log("NUMBER OF ROWS ... ", numberOfRows);

//   return (
//     <div className="content-body">
//       <p className="admin-link" style={{ fontWeight: "600" }}>
//         <Link to="/homepage">Home</Link> |{" "}
//         <Link to="/view-sponsor">View Sponsors</Link>
//       </p>
//       <p className="sponsor-heading">All Studies</p>
//       <div className="upload-body">
//         <img
//           src={sponsorState?.previewImg}
//           className="uploadImg-view"
//           style={{ borderRadius: "50%" }}
//         />
//         <p className="uploadText-view">{sponsorState?.name}</p>
//       </div>
//       <div className="viewSponsor-table">
//         <Row>
//           <Col md={12}>
//             <Table bordered className="tableBody">
//               <tbody>
//                 {Array(numberOfRows)
//                   .fill()
//                   .map((_, rowIndex) => (
//                     <tr>
//                       {sponsorState?.studies
//                         .slice(rowIndex * 4, rowIndex * 4 + 4)
//                         .map((study) => (
//                           <td>
//                             <Row className="studyRow">
//                               <Col md={8}>{study?.name}</Col>
//                               <Col md={4}>
//                                 <Link
//                                   to={"/study-management"}
//                                   // to={url + '/study-management'}
//                                   // target="_blank"
//                                   // rel="noopener noreferrer"
//                                 >
//                                   <img src={setting} className="settingImg" />
//                                 </Link>
//                               </Col>
//                             </Row>
//                           </td>
//                         ))}
//                     </tr>
//                   ))}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
//       </div>

//       <Row style={{ marginTop: "3%" }}>
//         <Col md={6}></Col>
//         <Col md={6}>
//           <Link
//             to={"/studies"}
//             style={{
//               "&hover": {
//                 textDecoration: "none",
//               },
//             }}
//           >
//             <div className="createSponsor-buttons">
//               <button className="sponsorBackButton">Back</button>
//             </div>
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ViewSponsors;



import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sponsors.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jeep from "../../../assets/sponsors/jeep.png";
import setting from "../../../assets/sponsors/setting.png";
import Table from "react-bootstrap/Table";

const ViewSponsors = () => {
  const location = useLocation();

  const [sponsorState, setSponsorState] = React.useState(
    location?.state?.sponsor
  );

  console.log("Sponsor State Length ... ", sponsorState);

  const numberOfRows = Math.ceil(sponsorState?.studies?.length / 2);

  console.log("NUMBER OF ROWS ... ", numberOfRows);

  return (
    <div className="content-body">
      <p className="admin-link" style={{ fontWeight: "600" }}>
        <Link to="/homepage">Home</Link> |{" "}
        <Link to="/view-sponsor">View Sponsors</Link>
      </p>
      <p className="sponsor-heading">All Studies</p>
      <div className="upload-body">
        <img
          src={sponsorState?.previewImg}
          className="uploadImg-view"
          style={{ borderRadius: "50%" }}
        />
        <p className="uploadText-view">{sponsorState?.name}</p>
      </div>
      <div className="viewSponsor-table">
        <Row>
          <Col md={12}>
            <Table className="tableBody">
              <tbody>
                {Array(numberOfRows)
                  .fill()
                  .map((_, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {[...Array(sponsorState?.studies.length)].map((_, colIndex) => {
                        const studyIndex = rowIndex * sponsorState?.studies.length + colIndex;
                        const study = sponsorState?.studies[studyIndex];
                        return (
                          <td key={`col-${colIndex}`}>
                            {study ? (
                              <Row className="studyRow">
                                <Col md={4}>{study.name}</Col>
                                <Col md={4}>
                                  <Link
                                    to={"/study-management"}
                                    // to={url + '/study-management'}
                                    // target="_blank"
                                    // rel="noopener noreferrer"
                                  >
                                    <img
                                      src={setting}
                                      alt="Setting"
                                      className="settingImg"
                                    />
                                  </Link>
                                </Col>
                                <Col md={4}>
                                </Col>
                              </Row>
                            ) : (
                              ""
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
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

export default ViewSponsors;
