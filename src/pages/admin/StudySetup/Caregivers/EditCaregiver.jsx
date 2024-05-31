import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  editCaregiver,
  getCaregiverById,
} from "../../../../services/caregivers";
import { toast } from "react-toastify";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import "../StudySetup.css";

const EditCareGiver = () => {
  const navigate = useNavigate();
  const location = useLocation();

  var id = location?.state?.id;

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [keyState, setKeyState] = React.useState("");

  const caregiverSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(caregiverSchema),
  });

  const fetchCaregiverById = async (id) => {
    try {
      const res = await getCaregiverById(id);
      const { translationKey, typeName } = res.data;
      setKeyState(translationKey);
      const name = typeName;
      reset({ name });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchCaregiverById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const { name } = data;

      const newData = {
        name,
        keyState,
        actionPanel: true,
      };

      const res = await editCaregiver(id, newData);

      if (res.status) {
        notify();
      }
    } catch (err) {
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err?.response?.data);
    } finally {
      setLoad(false);
    }
  };

  const notify = () =>
    toast.success("Caregiver Edited Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/care-givers");
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
            <Link to="/study-management/care-givers">Caregiver</Link> |{" "}
            <p className="study-edit-link">Edit</p>
          </p>
          <Row style={rowStyles}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Edit Caregiver Type</p>
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
                  Type Name {/* {errors.name?.message ? ( */}
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

export default EditCareGiver;
