import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/auth/AuthContext";
import authApiInstance from "../../services/AuthAPIService";
import { TextField } from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ChangePasswordForm = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

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
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordMutation.mutate({
        email: localStorage.getItem("email"), // Ensure this is included in your AuthContext
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    },
  });

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
      <Box>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          spacing={3}
        >
          <label>Current Password:</label>
          <TextField
            fullWidth
            size="small"
            type="password"
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
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
            required
          />
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
        >
          <label>New Password:</label>
          <TextField
          fullWidth
            size="small"
            type="password"
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
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            required
          />
        </Stack>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
        <button
          type="submit"
          disabled={changePasswordMutation.isLoading}
          className="dropdownBtn"
        >
          {changePasswordMutation.isLoading ? (
            <BeatLoader color="white" />
          ) : (
            "Change Password"
          )}
        </button>
      </Box>
    </form>
  );
};

export default ChangePasswordForm;
