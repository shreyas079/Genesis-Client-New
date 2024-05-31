import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, TextField, Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { createNewVisit } from "../../../../services/visits";
import "../StudySetup.css";

const SubjectToSite = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const notify = () =>
    toast.success("Visit Created Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const createVisitSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    daysExpected: yup.string().required("This field is required"),
    windowBefore: yup.string().required("This field is required"),
    windowAfter: yup.string().required("This field is required"),
    note: yup.string().required("This field is required"),
    lastUpdate: yup.string().required("This field is required"),
    windowOverride: yup
      .bool()
      .oneOf([true, false], "Window override is required"),
    isScheduled: yup.bool().oneOf([true, false], "Is scheduled is required"),
    interviewMode: yup
      .bool()
      .oneOf([true, false], "Interview mode is required"),
    closeOut: yup.bool().oneOf([true, false], "Closeout mode is required"),
    alwaysAvailable: yup
      .bool()
      .oneOf([true, false], "Always available is required"),
    reasonFlag: yup.string().required("This field is required"),
    visitOrder: yup.string().required("This field is required"),
    visitAnchor: yup.string().required("This field is required"),
    visitsTop: yup.string().required("This field is required"),
    dosageModule: yup
      .bool()
      .oneOf([true, false], "Dosage module mode is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVisitSchema),
  });

  const onSubmit = async (data) => {
    setShowDialog(false);
    if (data) {
      navigate("/study-management/visits");
    }
    // const res = await createNewVisit(data);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/visits");
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
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/drug-return">Drug Return</Link> |{" "}
            <Link to="/study-management/drug-return/site-depot">
              SubjectToSite Control setup
            </Link>
          </p>

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
            <div className="createVisitBody">
              <div className="createVisitHeader">
                <h1>SubjectToSite Control setup</h1>
              </div>
              <div className="createVisitHeader">
                <p>
                  The statues across the top are the choice to be displayed to
                  the user.The statues on the left side are criteria to pull
                  drug kits to be edited
                </p>
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default SubjectToSite;
