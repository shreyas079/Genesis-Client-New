import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Box, Checkbox } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createSystemRole } from "../../../../services/system_roles";

import "../../Users/User.css";

const AddRoles = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const notify = () =>
    toast.success("System Role Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      toastId: "requestFailed",
    });

  const createRoleSchema = yup.object().shape({
    shortName: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
    isBlinded: yup.bool().oneOf([true, false], "This field is required"),
    autoAssignNewSites: yup
      .bool()
      .oneOf([true, false], "This field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createRoleSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await createSystemRole(data);
      if (res.status) {
        notify();
      }
    } catch (err) {
      requestFailed();
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/system-settings");
  };

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
        <>
          <div className="content-body">
            <p className="admin-link" style={{ fontWeight: "600" }}>
              <Link to="/homepage">Home</Link> |{" "}
              <Link to="/system-settings">System Settings</Link> |{" "}
              <Link to="/system-settings/roles-add">Add Role</Link>
            </p>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

            <Box sx={{ marginTop: "2%" }}>
              <p className="user-heading">Add Role</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Name
                      <span className="error-highlight">*</span>
                    </label>
                    <input
                      className="nameField"
                      type="text"
                      name="shortName"
                      {...register("shortName", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">
                      {errors.shortName?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Description
                      <span className="error-highlight">*</span>
                    </label>

                    <textarea
                      className="nameFieldTextArea"
                      type="text"
                      name="description"
                      {...register("description", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    ></textarea>
                    <span className="error-text">
                      {errors.description?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">Blinded</label>
                    <Checkbox
                      className="blueCheckbox"
                      style={{ fontSize: "15px" }}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("isBlinded", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span
                      style={{
                        color: "#3661eb",
                        marginTop: "1%",
                        fontSize: "12px",
                      }}
                    >
                      {errors.isBlinded?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Auto Assign Sites
                    </label>

                    <Checkbox
                      className="blueCheckbox"
                      style={{ fontSize: "15px" }}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("autoAssignNewSites", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span
                      style={{
                        color: "#3661eb",
                        marginTop: "1%",
                        fontSize: "12px",
                      }}
                    >
                      {errors.autoAssignNewSites?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "3%" }}>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className="createSponsor-buttons">
                      <button
                        className="sponsorCancelButton"
                        onClick={(e) => {
                          handleCancel(e);
                        }}
                      >
                        Cancel
                      </button>
                      <button className="sponsorCreateButton" type="submit">
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default AddRoles;
