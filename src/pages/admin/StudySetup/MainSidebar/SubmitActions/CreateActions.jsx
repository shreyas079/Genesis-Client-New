import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DialogBox from "../../../../../components/DialogBox";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import { createSubmitAction } from "../../../../../services/submit_action";

import "../../StudySetup.css";

const CreateActions = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notify = () =>
    toast.success("Submit Action Created Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const createActionSchema = yup.object().shape({
    displayName: yup.string().required("This field is required"),
    typeName: yup.string().required("This field is required"),
    successPatientStatusTypeId: yup.string().required("This field is required"),
    failurePatientStatusTypeId: yup.string().required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createActionSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const {
        displayName,
        typeName,
        successPatientStatusTypeId,
        failurePatientStatusTypeId,
      } = data;

      const newData = {
        id: uuidv4(),
        displayName,
        typeName,
        successPatientStatusTypeId,
        failurePatientStatusTypeId,
      };

      const res = await createSubmitAction(newData);

      if (res.status) {
        notify();
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/study-settings/submit-actions");
  };

  const rowStyles = {
    marginTop: "2%",
    marginBottom: "2%",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "30px",
  };

  const textBoxBody = {
    marginLeft: "2px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "320px",
    height: "5px",
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
            <p className="study-management-link" style={{ fontWeight: "600" }}>
              <Link to="/study-management">Manage Your Study</Link> |{" "}
              <Link to="/study-management/study-settings/submit-actions">
                Submit Actions
              </Link>{" "}
              |{" "}
              <Link to="/study-management/study-settings/submit-actions/create">
                Create Submit Actions
              </Link>
            </p>
            <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Col md={6}>
                <div className="study-management-head-start">
                  <p className="study-management-heading">
                    Create Submit Actions
                  </p>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

            <Box
              component="form"
              sx={{
                height: "auto",
                width: "100%",
              }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Row>
                <Col md={2}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Display Name {/* {errors.displayName?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                </Col>
                <Col md={10}>
                  <TextField
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                    }}
                    {...register("displayName", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                  {errors.displayName && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.displayName.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
              </Row>

              <Row style={rowStyles}>
                <Col md={2}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Type Name {/* {errors.typeName?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                </Col>
                <Col md={10}>
                  <TextField
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                    }}
                    {...register("typeName", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                  {errors.typeName && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.typeName.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
              </Row>

              <Row style={rowStyles}>
                <Col md={2}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Success Patient Status TypeId{" "}
                    {/* {errors.successPatientStatusTypeId?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                </Col>
                <Col md={10}>
                  <TextField
                    type="number"
                    inputProps={{
                      style: textBoxStyles,
                    }}
                    {...register("successPatientStatusTypeId", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                  {errors.successPatientStatusTypeId && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.successPatientStatusTypeId.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
              </Row>

              <Row style={rowStyles}>
                <Col md={2}>
                  <p className="descriptionLabel" style={labelStyles}>
                    Failure Patient Status TypeId{" "}
                    {/* {errors.failurePatientStatusTypeId?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                </Col>
                <Col md={10}>
                  <TextField
                    type="number"
                    inputProps={{
                      style: textBoxStyles,
                    }}
                    {...register("failurePatientStatusTypeId", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                  {errors.failurePatientStatusTypeId && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.failurePatientStatusTypeId.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
              </Row>

              <Row style={rowStyles}>
                <Col md={8}></Col>
                <Col md={2}>
                  <div className="study-management-head-end">
                    {/* <Link to="/study-management-builder"> */}
                    <button
                      onClick={(e) => {
                        handleCancel(e);
                      }}
                      className="study-management-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="study-management-head-end">
                    {/* <Link to="/study-management-builder"> */}
                    <button
                      type="submit"
                      className="study-management-create-btn-md"
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Row>

              {/* <div className="createVisitButtonBody">
                <button
                  className="createVisitCancelBtn"
                  onClick={(e) => {
                    handleCancel(e);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="createVisitSaveBtn">
                  Save
                </button>
              </div> */}
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default CreateActions;
