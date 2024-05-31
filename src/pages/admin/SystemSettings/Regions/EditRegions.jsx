import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";

import {
  editSystemRegion,
  getSystemRegionById,
} from "../../../../services/system_region";

import "../../Users/User.css";

const EditRegions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location?.state?.id;
  const status = location?.state?.status;

  const [load, setLoad] = React.useState(false);
  const [region, setRegion] = React.useState("");
  const [isActive, setIsActive] = React.useState(status);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const createCountrySchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    isActive: yup.bool().oneOf([true, false], "This field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createCountrySchema),
  });

  const fetchRegionById = async (id) => {
    try {
      setLoad(true);
      const res = await getSystemRegionById(id);
      if (res.status) {
        setLoad(false);
        const { name, isActive } = res.data;
        reset({ name, isActive });
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchRegionById(id);
  }, [id]);

  const notify = () =>
    toast.success("Region Edited Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await editSystemRegion(id, data);
      if (res.status) {
        setLoad(false);
        // navigate("/system-settings");
        notify();
      }
    } catch (err) {
      requestFailed();
      console.log("Error: ", err.message);
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
                Edit Region
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
              <p className="user-heading">Edit Region</p>
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
                      <button
                        disabled={load}
                        className="sponsorCreateButton"
                        type="submit"
                      >
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

export default EditRegions;
