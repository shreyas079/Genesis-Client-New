import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { Box, TextField, Checkbox } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createSystemRegion } from "../../../../services/system_region";

// FaCheckCircle

import "../../Users/User.css";

const AddRegions = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [region, setRegion] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [finalData, setFinalData] = React.useState([]);

  const notify = () =>
    toast.success("System Region Created Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const createCountrySchema = yup.object().shape({
    name: yup.string().required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createCountrySchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await createSystemRegion(data);
      if (res.status) {
        setLoad(false);
        // navigate("/system-settings");
        notify();
      }
    } catch (err) {
      setLoad(false);
      requestFailed();
      console.log("Error: ", err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/system-settings");
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setShowDialog(true);
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
              <Link to="/system-settings/regions-add">Add Region</Link>
            </p>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

        <Box sx={{ marginTop: "2%" }}>
          <p className="user-heading">Add Region</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row style={{ marginTop: "2%" }}>
              <Col md={5}>
                <label className="uploadInputLabel">
                  Name{" "}
                  {/* {errors.name?.message ? ( */}
                    <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </label>
                <input
                  className="nameField"
                  type="text"
                  name="name"
                  {...register("name", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                <span className="error-text">{errors.name?.message}</span>
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

export default AddRegions;
