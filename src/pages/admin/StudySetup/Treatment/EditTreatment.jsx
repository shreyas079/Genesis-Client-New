import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import {
  getTreatmentById,
  editTreatment,
} from "../../../../services/treatments";

import "../StudySetup.css";

const EditTreatment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state?.id;
  const lastUpdate = location.state?.last_update;

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
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(treatmentSchema),
  });

  const fetchTreatmentById = async (id) => {
    try {
      const res = await getTreatmentById(id);
      const { description, notes } = res.data;
      reset({ description, notes });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchTreatmentById(id);
  }, [id]);

  const notify = () =>
    toast.success("Treatment Edited Successfully", {
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

      const newData = {
        description,
        lastUpdate,
        notes,
      };

      const res = await editTreatment(id, newData);
      if (res.status) {
        setLoad(false);
        // navigate("/study-management/treatment");
        notify();
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const handleCancel = () => {
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
            <p className="study-edit-link">Edit Treatment</p>
          </p>
          <Row style={rowStyles}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Edit Treatment</p>
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
                    onClick={handleCancel}
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

export default EditTreatment;
