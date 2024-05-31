import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Box, TextField, Checkbox } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import {
  getSystemRoleById,
  editSystemRole,
} from "../../../../services/system_roles";

import "../../Users/User.css";

const EditRoles = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location?.state?.id;
  const blinded = location?.state?.blinded;
  const autoAssign = location?.state?.autoAssign;

  const [load, setLoad] = React.useState(false);
  const [roleIsBlinded, setRoleIsBlinded] = React.useState(blinded);
  const [roleAutoAssign, setRoleAutoAssign] = React.useState(autoAssign);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const notify = () =>
    toast.success("System Role Edited Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const editRoleSchema = yup.object().shape({
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editRoleSchema),
  });

  const fetchRoleById = async (id) => {
    try {
      setLoad(true);
      const res = await getSystemRoleById(id);
      if (res.status) {
        setLoad(false);
        const { shortName, description, isBlinded, autoAssignNewSites } =
          res.data;
        setRoleIsBlinded(isBlinded);
        setRoleAutoAssign(autoAssignNewSites);
        reset({ shortName, description, isBlinded, autoAssignNewSites });
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchRoleById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await editSystemRole(id, data);
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
              <span
                style={{
                  color: "#4b8ac0",
                  cursor: "pointer",
                }}
              >
                Edit Role
              </span>
            </p>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

            <Box sx={{ marginTop: "2%" }}>
              <p className="user-heading">Edit Role</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Name {/* {errors.roleName?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
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
                      Description {/* {errors.description?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
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
                      defaultChecked={roleIsBlinded}
                      className="blueCheckbox"
                      style={{ fontSize: "15px" }}
                      // checked={checked}
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("isBlinded", {
                        onChange: (e) => {
                          setRoleIsBlinded(!roleIsBlinded);
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
                      defaultChecked={roleAutoAssign}
                      className="blueCheckbox"
                      style={{ fontSize: "15px" }}
                      // checked={checked}
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("autoAssignNewSites", {
                        onChange: (e) => {
                          setRoleAutoAssign(!roleAutoAssign);
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

export default EditRoles;
