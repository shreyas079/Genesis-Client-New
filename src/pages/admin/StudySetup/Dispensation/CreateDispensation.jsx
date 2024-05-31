import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, Checkbox, MenuItem, FormControl, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { getAllVisits } from "../../../../services/visits";
import { getAllTreatments } from "../../../../services/treatments";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createNewDispensation } from "../../../../services/dispensations";

import "../StudySetup.css";

const CreateDispensation = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [visitsData, setVisitsData] = React.useState([]);
  const [treatmentData, setTreatmentData] = React.useState([]);

  const createDispensationSchema = yup.object().shape({
    visitId: yup.string().required("This field is required"),
    treatmentId: yup.string().required("This field is required"),
    isRequired: yup.bool().oneOf([true, false], "Window override is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createDispensationSchema),
  });

  const notify = () =>
    toast.success("Dispensation Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await createNewDispensation(data);
      if (res.status) {
        setLoad(false);
        notify();
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const fetchAllVisitsData = async () => {
    try {
      const res = await getAllVisits();
      if (res.status) {
        setVisitsData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchAllTreatmentsData = async () => {
    try {
      const res = await getAllTreatments();
      if (res.status) {
        setTreatmentData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useState(() => {
    fetchAllVisitsData();
    fetchAllTreatmentsData();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/dispensations");
  };

  const rowStyles = {
    marginTop: "2%",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "30px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "400px",
    height: "10px",
  };

  const selectStyles = {
    width: 530,
    marginTop: 1,
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
              <Link to="/study-management/dispensations">Dispensations</Link> |{" "}
              <Link to="/study-management/dispensations/create">
                Create Dispensations
              </Link>
            </p>

            <Row style={rowStyles}>
              <Col md={6}>
                <div className="study-management-head-start">
                  <p className="study-management-heading">
                    Create Dispensations
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ height: "auto", width: "100%" }}
              autoComplete="off"
            >
              <div className="createDispensationFormBody">
                <div className="createDispensationInput">
                  <p style={labelStyles}>
                    Visit {/* {errors.visitId?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                  <FormControl sx={selectStyles}>
                    <Select
                      name="visitId"
                      defaultValue={""}
                      inputProps={{
                        style: textBoxStyles,
                        "aria-label": "Without label",
                      }}
                      {...register("visitId", {
                        onChange: (e) => {
                          setValue("visitId", e.target.value, {
                            shouldValidate: true,
                          });
                          setShowDialog(true);
                        },
                      })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {visitsData.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.visitId && (
                      <>
                        <div className="createCaregiverFlexEnd">
                          <div className="createCaregiverError">
                            <span className="error-text">
                              {errors.visitId.message}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {/* {errors.visitId && (
                    <p className="error-text">{errors.visitId.message}</p>
                  )} */}
                  </FormControl>
                </div>

                <div className="createDispensationInput">
                  <p style={labelStyles}>
                    Treatment {/* {errors.treatmentId?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                    <></>
                  )} */}
                  </p>
                  <FormControl sx={selectStyles}>
                    <Select
                      name="treatmentId"
                      defaultValue={""}
                      inputProps={{
                        style: textBoxStyles,
                        "aria-label": "Without label",
                      }}
                      {...register("treatmentId", {
                        onChange: (e) => {
                          setValue("treatmentId", e.target.value, {
                            shouldValidate: true,
                          });
                          setShowDialog(true);
                        },
                      })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {treatmentData.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.description}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.treatmentId && (
                      <>
                        <div className="createCaregiverFlexEnd">
                          <div className="createCaregiverError">
                            <span className="error-text">
                              {errors.treatmentId.message}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {/* {errors.treatmentId && (
                    <p className="error-text">{errors.treatmentId.message}</p>
                  )} */}
                  </FormControl>
                </div>

                <div className="createVisitCheckbox">
                  <p>Is Required</p>
                  <Checkbox
                    style={{ fontSize: "14px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("isRequired", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                  {errors.isRequired && (
                    <p
                      style={{
                        marginTop: "10px",
                        color: "blue",
                      }}
                    >
                      {errors.isRequired.message}
                    </p>
                  )}
                </div>
              </div>

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
                  onClick={(e) => {
                    handleCancel(e);
                  }}
                  className="createVisitCancelBtn"
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

export default CreateDispensation;
