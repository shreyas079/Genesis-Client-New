import React from "react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import OtpInput from "react-otp-input";

import { useTheme } from "@mui/material/styles";

import logo from "../../assets/images/icon.png";
import timer from "../../assets/svgs/timer.svg";
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
    width: "360px",
    height: "270px",
  },
  overlay: {
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="value">
        {remainingTime}
        <span style={{ fontSize: "10px", marginLeft: "3%" }}>Sec</span>
      </div>
      <div className="text">Remaining</div>
    </div>
  );
};

const RegisterPhone = () => {
  const [otp, setOtp] = React.useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleCaptchaChange(value) {
    console.log("Captcha value : ", value);
  }

  const handleOtpChange = (e) => {
    console.log("handle changge: ", e);
    setOtp(e);
  };
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
            <h3 className="modalHeading">Login Successfully</h3>
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
      <Row className="flexCenterAlign">
        <Col sm={12} md={8} lg={8} xl={8}>
          <div className="customCard">
            {/* <div className="d-flex justify-content-center">
              <img className="timer-img" src={timer} alt="Timer Image" />
            </div> */}
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={["#3661EB", "#5D5FEE", "#5D5FEE"]}
                colorsTime={[60, 10, 3]}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            <div className="flexCenterAlign">
              <h2 className="registerHeading">Register Phone Number</h2>
            </div>
            <div
              className="flexCenterAlign"
              style={{ marginTop: "2%" }}
            >
              <p className="registerText">
                Enter the OTP sent to +1-650-648-0327
              </p>
            </div>

            <div
              className="flexCenterAlign"
              style={{ marginTop: "2%" }}
            >
              <div style={{ width: "35%" }}>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  separator={<span>&nbsp;</span>}
                  inputStyle="otp_input"
                  focusStyle="otp_input_focus"
                />
              </div>
            </div>

            <div
              className="flexCenterAlign"
              style={{ marginTop: "5%" }}
            >
              <p
                style={{
                  color: "#5C5C5C",
                  fontSize: "12px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "500",
                }}
              >
                Didn't receive the OTP?{" "}
                <span style={{ color: "#3661EB", textDecoration: "underline" }}>
                  Resend OTP
                </span>
              </p>
            </div>

            <div
              className="flexCenterAlign"
              style={{ marginTop: "15%", marginBottom: "4%" }}
            >
              {" "}
              <button onClick={openModal} type="button" className="verifyButton">
                Verify & Proceed
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPhone;
