import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import {
  editDispensation,
  getDispensationById,
} from "../../../../services/dispensations";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import "../StudySetup.css";

const EditDispensation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state?.id;

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [visitsData, setVisitsData] = React.useState([]);
  const [treatmentData, setTreatmentData] = React.useState([]);

  const [visitIdState, setVisitIdState] = React.useState(false);
  const [treatmentIdState, setTreatmentIdState] = React.useState(false);
  const [requiredState, setRequiredState] = React.useState(false);

  const editDispensationSchema = yup.object().shape({
    visitId: yup.string().required("This field is required"),
    treatmentId: yup.string().required("This field is required"),
    isRequired: yup.bool().oneOf([true, false], "Window override is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editDispensationSchema),
  });

  const notify = () =>
    toast.success("Dispensation Edited Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const fetchDispensationById = async (id) => {
    try {
      const res = await getDispensationById(id);

      if (res.data) {
        const { visitId, treatmentId, isRequired } = res.data;

        setVisitIdState(visitId);
        setTreatmentIdState(treatmentId);
        setRequiredState(isRequired);

        reset({
          visitId,
          treatmentId,
          isRequired,
        });
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  React.useEffect(() => {
    fetchDispensationById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await editDispensation(id, data);
      if (res.status) {
        setLoad(false);
        notify();
      }
    } catch (err) {
      console.log("Error: ", err.message);
      setLoad(false);
      setShowDialog(false);
      requestFailed(err.message);
    }
  };

  const fetchAllVisitsData = async () => {
    try {
      const res = await getAllVisits();
      setVisitsData(res.data);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchAllTreatmentsData = async () => {
    try {
      const res = await getAllTreatments();
      setTreatmentData(res.data);
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
    // marginBottom: "2%",
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
      ) : (
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/dispensations">Dispensations</Link> |{" "}
            <p className="study-edit-link">Edit Dispensations</p>
          </p>

          <Row style={rowStyles}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Edit Dispensations</p>
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
                  Visit ID {/* {errors.visitId?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
                <></>
              )} */}
                </p>
                <FormControl sx={selectStyles}>
                  <Select
                    name="visitId"
                    value={visitIdState}
                    inputProps={{
                      style: textBoxStyles,
                      "aria-label": "Without label",
                    }}
                    {...register("visitId", {
                      onChange: (e) => {
                        setVisitIdState(e.target.value);
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
                    value={treatmentIdState}
                    inputProps={{
                      style: textBoxStyles,
                      "aria-label": "Without label",
                    }}
                    {...register("treatmentId", {
                      onChange: (e) => {
                        setTreatmentIdState(e.target.value);
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
                  checked={requiredState}
                  style={{ fontSize: "14px" }}
                  inputProps={{ "aria-label": "controlled" }}
                  {...register("isRequired", {
                    onChange: (e) => {
                      setRequiredState(!requiredState);
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
      )}
    </>
  );
};

export default EditDispensation;
