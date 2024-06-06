import React, { useContext, useState } from "react";

import { redirect, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/images/icon.png";

// import { getAuthorizationCode } from "../../services/auth_apis";
import { getAuthCode } from "../../services/auth_apis";
import AuthContext from "../../context/auth/AuthContext";

const Login = () => {
  const [submitError, setSubmitError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { getUserLoggedIn, error, loading } = useContext(AuthContext);
  const validationSchema = yup.object().shape({
    username: yup.string().max(255).required("Email is required"),
    password: yup.string().max(255).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const onSubmit = async (data, e) => {
  //   e.preventDefault();
  //   try {
  //     const { email, password } = data;

  //     const auth = await getAuthCode();

  //     // if (!selectedFile) {
  //     //   imageIsRequired();
  //     // } else {
  //     //   const res = await sponsorCreation(name, fileUrl);
  //     //   console.log("Sponsor Create Ress: ", res);
  //     //   if (res.status === 200) {
  //     //     notify();
  //     //   } else {
  //     //     requestFailed();
  //     //   }
  //     // }
  //   } catch (err) {
  //     console.log("submit error: ", err);
  //     // requestFailed();
  //   }
  // };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await getUserLoggedIn(data);
      navigate("/homepage"); 
    } catch (err) {
      setSubmitError(err.message);
    }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="emailDiv">
                    <TextField
                      required
                      name="username"
                      id="outlined-email"
                      label="Email"
                      placeholder="Enter your email"
                      className="w-100 email-container"
                      variant="outlined"
                      size="large"
                      {...register("username", { required: true })}
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
                  <span style={{ color: "#3661eb", marginLeft: "1%" }}>
                    {errors.email?.message}
                  </span>
                  <div className="passwordDiv">
                    <TextField
                      required
                      name="password"
                      id="outlined-password"
                      label="Password"
                      placeholder="Enter your password"
                      className="w-100 password-container"
                      {...register("password", { required: true })}
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
                  <span style={{ color: "#3661eb", marginLeft: "1%" }}>
                    {errors.password?.message}
                  </span>
                  <div className="flexEndProperty">
                    {" "}
                    <p className="forgotPass">Forgot Password?</p>
                  </div>{" "}
                  <div className="flexCenterProperty">
                    <button type="submit" className="loginButton">
                      Login
                    </button>
                  </div>
                </form>
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

export default Login;
