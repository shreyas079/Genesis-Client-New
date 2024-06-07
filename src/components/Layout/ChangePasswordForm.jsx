import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import authApiInstance from "../../services/AuthAPIService";
import { TextField } from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ChangePasswordForm = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const changePasswordMutation = useMutation({
    mutationFn: authApiInstance.changePassword,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      dispatch({
        type: "SET_TOKEN",
        payload: { token: data.token, email: data.username },
      });
      navigate("/login");
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      setSubmitError(error.message);
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    changePasswordMutation.mutate({
      email: localStorage.getItem("email"), // Ensure this is included in your AuthContext
      currentPassword,
      newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <Stack spacing={2} direction="column">
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="center"
          spacing={3}
        >
          <label>Current Password:</label>
          <TextField
            size="small"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            id="outlined-basic"
            label="Current Password"
            variant="outlined"
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={3}
        >
          <label>New Password:</label>
          <TextField
            size="small"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            id="outlined-basic"
            label="New Password"
            variant="outlined"
          />
        </Stack>
        {submitError && <p style={{ color: "red" }}>{submitError}</p>}
        <button
          type="submit"
          disabled={changePasswordMutation.isLoading}
          className="dropdownBtn"
        >
          {changePasswordMutation.isLoading ? (
            <BeatLoader color="white"/>
          ) : (
            "Change Password"
          )}
        </button>
        
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
