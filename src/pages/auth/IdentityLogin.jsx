import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import logo from "../../assets/images/icon.png";

import useClaims from "./claims";
import { Navigate, useNavigate} from "react-router-dom";

const IdentityLogin = () => {
  const navigate = useNavigate();
  const { data: claims, isloading } = useClaims();
  let logoutUrl = claims?.find((claim) => claim.type === "bff:logout_url");
  let nameDict =
      claims?.find((claim) => claim.type === "name") ||
      claims?.find((claim) => claim.type === "sub");
  let username = nameDict?.value;
  const handleLoginIdentity = async () => {
    console.log('logging in')
    navigate("/bff/login?returnUrl=/");
    window.location.reload();
    // <Navigate to="/bff/login" />
    // const res = await getAuthCode();

    // if (res.status === 200) {
    //   window.open(
    //     `${process.env.REACT_APP_IDENTITY_URL}/connect/authorize?response_type=code&code_challenge_method=S256&client_id=genesis&scope=genesis openid profile&state=openid profile email genesis&code_challenge=0MOh0oV48hFxLpXTH4U4_QDxEbrWJxT-eeTNTHRsBKA&redirect_uri=${process.env.REACT_APP_FRONT_URL}/get-token`,
    //     "_self"
    //   );
    // }
  };

  return (
    <Container className="mainContainer">
      <div className="authContainer">
        <img className="logo-img" src={logo} alt="Genesis Logo" />
        <h1 className="logo-text">Genesis</h1>
      </div>
      <Row className="flexCenterProperty">
        <Col sm={12} md={7} lg={7} xl={7}>
          <div className="customCard">
            <h2 className="loginHead">Login</h2>
            <div className="form-body">
              <Box
                // component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    height: "auto",
                    width: "100%",
                    borderRadius: "10px",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="flexCenterProperty">
                  <button
                    style={{ width: "250px" }}
                    className="loginButton"
                    onClick={handleLoginIdentity}
                  >
                    Login
                  </button>
                </div>
                <div className="flexCenterProperty">
                  {" "}
                  <p className="privacyPolicy">Privacy policy</p>
                </div>
              </Box>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default IdentityLogin;
