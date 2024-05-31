import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createNewDoseLevel } from "../../../../services/dose_levels";

import "../StudySetup.css";

const CreateDoseLevels = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const createDosageSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    isRecommended: yup.bool().oneOf([true, false], "This field is required"),
    isEnabled: yup.bool().oneOf([true, false], "This field is required"),
    canDispense: yup.bool().oneOf([true, false], "This field is required"),
  });

  const notify = () =>
    toast.success("Dose Level Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDosageSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const { name, isRecommended, isEnabled, canDispense } = data;

      const newData = {
        name,
        isRecommended,
        isEnabled,
        canDispense,
      };

      const res = await createNewDoseLevel(newData);
      if (res.status) {
        notify();
      }
    } catch (err) {
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/dose-levels");
  };

  const loadContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const rowStyles = {
    marginTop: "2%",
    marginBottom: "2%",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "35px",
  };

  const textBoxBody = {
    marginLeft: "10px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "400px",
    height: "10px",
  };

  const rowSpacing = {
    marginTop: "2%",
  };

  return (
    <>
      {load ? (
        <>
          <div style={loadContainerStyles}>
            <BeatLoader color="#3661eb" />
          </div>
        </>
      ) : (
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/dose-levels">Dosage Level</Link> |{" "}
            <Link to="/study-management/dose-levels/create-dose">
              Create Dosage
            </Link>
          </p>
          <Row style={rowStyles}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Create Dosage Level</p>
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ height: "auto", width: "100%" }}
            autoComplete="off"
          >
            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Name
                  <span className="error-highlight">*</span>
                </p>
              </Col>
              <Col md={10}>
                <TextField
                  style={textBoxBody}
                  inputProps={{
                    style: textBoxStyles,
                  }}
                  {...register("name", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                {errors.name && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.name.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>
            <Row style={rowSpacing}>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Is Recommended{" "}
                  {errors.isRecommended?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  {...register("isRecommended", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
              </Col>
            </Row>

            {errors.isRecommended && (
              <Row>
                <Col md={2}></Col>
                <Col md={10}>
                  <p className="error-text">{errors.isRecommended.message}</p>
                </Col>
              </Row>
            )}

            <Row style={rowSpacing}>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Is Enabled{" "}
                  {errors.isEnabled?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  {...register("isEnabled", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
              </Col>
            </Row>

            {errors.isEnabled && (
              <Row>
                <Col md={2}></Col>
                <Col md={10}>
                  <p className="error-text">{errors.isEnabled.message}</p>
                </Col>
              </Row>
            )}

            <Row style={rowSpacing}>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Can Dispense{" "}
                  {errors.canDispense?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  {...register("canDispense", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
              </Col>
            </Row>

            {errors.canDispense && (
              <Row>
                <Col md={2}></Col>
                <Col md={10}>
                  <p className="error-text">{errors.canDispense.message}</p>
                </Col>
              </Row>
            )}

            <Row style={rowSpacing}>
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
          </Box>
        </div>
      )}
    </>
  );
};

export default CreateDoseLevels;
