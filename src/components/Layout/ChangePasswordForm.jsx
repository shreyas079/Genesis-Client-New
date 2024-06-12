// import React, { useState, useContext } from "react";
// import { useMutation } from "react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import AuthContext from "../../context/auth/AuthContext";
// import authApiInstance from "../../services/AuthAPIService";
// import { TextField } from "@mui/material";
// import BeatLoader from "react-spinners/BeatLoader";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// const ChangePasswordForm = () => {
//   const { state, dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [submitError, setSubmitError] = useState("");

//   const changePasswordMutation = useMutation({
//     mutationFn: authApiInstance.changePassword,
//     onSuccess: (data) => {
//       localStorage.clear();
//       dispatch({
//         type: "LOGOUT",
//       });
//       navigate("/login");
//       toast.success("Password changed successfully!");
//     },
//     onError: (error) => {
//       setSubmitError(error.message);
//       toast.error(error.message);
//     },
//   });

//   const validationSchema = Yup.object({
//     currentPassword: Yup.string().required("Current Password is required"),
//     newPassword: Yup.string()
//       .required("New Password is required")
//       .min(8, "Password should be at least 8 characters long")
//       .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
//       .matches(/[a-z]/, "Password should contain at least one lowercase letter")
//       .matches(/[0-9]/, "Password should contain at least one number")
//       .matches(
//         /[@$!%*?&#]/,
//         "Password should contain at least one special character"
//       )
//       .notOneOf(
//         [Yup.ref("currentPassword"), null],
//         "New Password should not be the same as the Current Password"
//       ),
//   });

//   const formik = useFormik({
//     initialValues: {
//       currentPassword: "",
//       newPassword: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       changePasswordMutation.mutate({
//         email: localStorage.getItem("email"), // Ensure this is included in your AuthContext
//         currentPassword: values.currentPassword,
//         newPassword: values.newPassword,
//       });
//     },
//   });

//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         justifyContent: "center",
//       }}
//     >
//       <Box>
//         <Stack
//           direction="column"
//           alignItems="flex-start"
//           justifyContent="center"
//           spacing={3}
//         >
//           <label>Current Password:</label>
//           <TextField
//             fullWidth
//             size="small"
//             type="password"
//             id="currentPassword"
//             name="currentPassword"
//             label="Current Password"
//             variant="outlined"
//             value={formik.values.currentPassword}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={
//               formik.touched.currentPassword &&
//               Boolean(formik.errors.currentPassword)
//             }
//             helperText={
//               formik.touched.currentPassword && formik.errors.currentPassword
//             }
//             required
//           />
//         </Stack>
//         <Stack
//           direction="column"
//           alignItems="flex-start"
//           justifyContent="space-between"
//           spacing={3}
//         >
//           <label>New Password:</label>
//           <TextField
//           fullWidth
//             size="small"
//             type="password"
//             id="newPassword"
//             name="newPassword"
//             label="New Password"
//             variant="outlined"
//             value={formik.values.newPassword}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={
//               formik.touched.newPassword && Boolean(formik.errors.newPassword)
//             }
//             helperText={formik.touched.newPassword && formik.errors.newPassword}
//             required
//           />
//         </Stack>
//         {submitError && <p style={{ color: "red" }}>{submitError}</p>}
//         <button
//           type="submit"
//           disabled={changePasswordMutation.isLoading}
//           className="dropdownBtn"
//         >
//           {changePasswordMutation.isLoading ? (
//             <BeatLoader color="white" />
//           ) : (
//             "Change Password"
//           )}
//         </button>
//       </Box>
//     </form>
//   );
// };

// export default ChangePasswordForm;

import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import "./Layout.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/auth/AuthContext";
import authApiInstance from "../../services/AuthAPIService";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const ChangePasswordForm = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: authApiInstance.changePassword,
    onSuccess: (data) => {
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
      });
      navigate("/login");
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      setSubmitError(error.message);
      toast.error(error.message);
    },
  });

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
      .matches(/[a-z]/, "Password should contain at least one lowercase letter")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password should contain at least one special character"
      )
      .notOneOf(
        [Yup.ref("currentPassword"), null],
        "New Password should not be the same as the Current Password"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordMutation.mutate({
        email: localStorage.getItem("email"),
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Box style={{ width: "100%" }}>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          spacing={3}
          sx={{ width: "100%" }}
        >
          <label className="passwordHeading">Current Password:</label>
          <TextField
            fullWidth
            size="small"
            style={{ marginTop: "6px" }}
            type={showPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            variant="outlined"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: "custom-label",
            }}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <FormHelperText error className="passwordLabelHeading">
              {formik.errors.currentPassword}
            </FormHelperText>
          )}
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          sx={{ width: "100%" }}
        >
          <label className="passwordHeading">New Password:</label>
          <TextField
            fullWidth
            size="small"
            style={{ marginTop: "6px" }}
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            label="New Password"
            variant="outlined"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                fontWeight: 'normal', 
                fontSize: '12px'
              }
            }}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <FormHelperText error className="passwordLabelHeading">
              {formik.errors.newPassword}
            </FormHelperText>
          )}
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          sx={{ width: "100%" }}
        >
          <label className="passwordHeading">Confirm Password:</label>
          <TextField
            fullWidth
            size="small"
            style={{ marginTop: "6px" }}
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: "custom-label",
            }}
            
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <FormHelperText error className="passwordLabelHeading">
              {formik.errors.confirmPassword}
            </FormHelperText>
          )}
        </Stack>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={changePasswordMutation.isLoading}
          sx={{ mt: 2, fontSize: "10px" }}
        >
          {changePasswordMutation.isLoading ? (
            <BeatLoader color="white" />
          ) : (
            "Change Password"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default ChangePasswordForm;
