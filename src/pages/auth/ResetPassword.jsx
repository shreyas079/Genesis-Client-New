import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ReCAPTCHA from "react-google-recaptcha";

import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/icon.png";
import checkSign from "../../assets/images/check_circle.png";
import close from "../../assets/images/close.png";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "1%",
    width: "420px",
    height: "330px",
  },
  overlay: {
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const ResetPassword = () => {
  const [isVerified, setIsVerified] = React.useState(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleCaptchaChange(value) {
    console.log("Captcha value: ", value);
    setIsVerified(true);
  }

  return (
    <Container style={{ padding: "3%" }}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modalContainer">
          <div className="d-flex justify-content-end">
            <img
              onClick={closeModal}
              src={close}
              style={{ width: "15px", height: "15px", cursor: "pointer" }}
            />
          </div>
          <div className="d-flex justify-content-center">
            <img src={checkSign} style={{ width: "68px", height: "68px" }} />
          </div>
          <div className="d-flex justify-content-center">
            <h3 className="modalHeading">Successfully Sent</h3>
          </div>
          <div className="d-flex justify-content-center">
            <p className="modalText1">
              You Will Receive A Notification Email Shortly
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p className="modalText2">With Your New Password</p>
          </div>
          <div className="d-flex justify-content-center">
            <button className="modalBtn">Ok</button>
          </div>
        </div>
      </Modal>
      <div className="authContainer">
        <img className="logo-img" src={logo} alt="Genesis Logo" />
        <h1 className="logo-text">Genesis</h1>
      </div>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          sm={12}
          md={8}
          lg={8}
          xl={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="customLoginCard">
            <h2
              className="resetHeading text-center"
              style={{ marginTop: "5%", paddingBottom: "3rem" }}
            >
              Reset Password
            </h2>
            <div className="form-body">
              <Box
                component="form"
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
                <div className="emailDiv">
                  <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    placeholder="Enter your email"
                    className="w-100 email-container"
                    variant="outlined"
                    size="large"
                    InputLabelProps={{
                      style: {
                        fontSize: "17px",
                        fontWeight: "500",
                        color: "#1F1F1F",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                    }}
                  />
                </div>
                <div className="passwordDiv">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleCaptchaChange}
                  />
                  {/* <TextField
                    required
                    id="outlined-password"
                    label="Password"
                    placeholder="Enter your password"
                    className="w-100 password-container"
                    InputLabelProps={{
                      style: {
                        fontSize: "17px",
                        fontWeight: "500",
                        color: "#1F1F1F",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "13px",
                        fontWeight: "500",
                      },
                    }}
                  /> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <button
                    disabled={isVerified ? false : true}
                    onClick={openModal}
                    type="button"
                    className="resetPassButton"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  {" "}
                  <p
                    style={{
                      color: "#717177",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "5px",
                      // borderBottom: "2px solid #717177",
                      display: "inlineBlock",
                      marginBottom: "5rem",
                      textDecoration: 'underline',
                    }}
                  >
                    Privacy policy
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
