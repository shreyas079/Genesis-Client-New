import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createTreatment } from "../../../../services/treatments";

import "../StudySetup.css";

const CreateTreatment = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const treatmentSchema = yup.object().shape({
    description: yup.string().required("This field is required"),
    notes: yup.string().required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(treatmentSchema),
  });

  const notify = () =>
    toast.success("Treatment Created Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const { description, notes } = data;
      const lastUpdate = null;

      const newData = {
        description,
        notes,
        lastUpdate,
      };

      const res = await createTreatment(newData);

      if (res.status) {
        setLoad(false);
        notify();
        // navigate("/study-management/treatment");
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/treatment");
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

  const textAreaStyles = { fontSize: 15, width: "500px", height: "130px" };

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
            <Link to="/study-management/treatment">Treatment</Link> |{" "}
            <Link to="/study-management/treatment/create-treatment">
              Create Treatment
            </Link>
          </p>
          <Row style={rowStyles}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Create Treatment</p>
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
            sx={{ height: 200, width: "100%" }}
            autoComplete="off"
          >
            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Description {/* {errors.description?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </p>
              </Col>
              <Col md={10}>
                <TextField
                  inputProps={{
                    style: textAreaStyles,
                  }}
                  multiline
                  rows={3}
                  {...register("description", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                {errors.description && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.description.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {/* {errors.description && (
                  <p className="error-text">{errors.description.message}</p>
                )} */}
              </Col>
            </Row>

            <Row style={rowSpacing}>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Notes {/* {errors.description?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </p>
              </Col>
              <Col md={10}>
                <TextField
                  inputProps={{
                    style: textAreaStyles,
                  }}
                  multiline
                  rows={3}
                  {...register("notes", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                {errors.notes && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.notes.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {/* {errors.description && (
                  <p className="error-text">{errors.description.message}</p>
                )} */}
              </Col>
            </Row>

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

export default CreateTreatment;
