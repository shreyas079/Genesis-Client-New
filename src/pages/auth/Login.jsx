import React, { useContext, useState } from "react";

import { redirect, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BeatLoader from "react-spinners/BeatLoader";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/images/icon.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// import { getAuthorizationCode } from "../../services/auth_apis";
import { getAuthCode } from "../../services/auth_apis";
import AuthContext from "../../context/auth/AuthContext";
import { useMutation } from "react-query";
import authApiInstance from "../../services/AuthAPIService";

const Login = () => {
  const [submitError, setSubmitError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

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

  // Login mutation using react-query
  const loginMutation = useMutation(authApiInstance.getAuthCode, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_TOKEN", payload: data.data });
      navigate("/homepage");
      toast.success("Login successfully!");
    },
    onError: (error) => {
      setSubmitError(error.message);
      toast.error("Failed to login");
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    loginMutation.mutate(data);
    localStorage.setItem("email", data.username); // Set the email separately
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                      type={showPassword ? "text" : "password"}
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
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
                    <button
                      type="submit"
                      className="loginButton"
                      disabled={loginMutation.isLoading}
                    >
                      {loginMutation.isLoading ? (
                        <BeatLoader color="white" />
                      ) : (
                        "Login"
                      )}
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
