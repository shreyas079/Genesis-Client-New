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

const DepotReconciliation = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const notify = () =>
    toast.success("Visit Created Successfully", {
    //   theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
    //   theme: "colored",
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
    console.log("on submit ... ", data);
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
            <Link to="/study-management/drug-return/depot-reconciliation">
              DepotReconciliation Control Setup
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
                <h1>DepotReconciliation Control Setup</h1>
              </div>
              <div className="createVisitHeader">
                <p>
                  The statues across the top are the choice to be displayed to
                  the user.The statues on the left side are criteria to pull
                  drug kits to be edited
                </p>
              </div>
              {/* <div className="createVisitFormBody">
                                <div className="createVisitInput">
                                    <p>Name</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("name", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.name && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.name.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitInput">
                                    <p>Days Expected</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("daysExpected", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.daysExpected && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.daysExpected.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitInput">
                                    <p>Window Before</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("windowBefore", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.windowBefore && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.windowBefore.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitInput">
                                    <p>Window After</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("windowAfter", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.windowAfter && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.windowAfter.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitInput">
                                    <p>Note</p>
                                    <TextField
                                        multiline
                                        rows={4}
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("note", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.note && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.note.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitInput">
                                    <p>Last Update</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("lastUpdate", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.lastUpdate && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.lastUpdate.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="createVisitCheckbox">
                                    <p>Window Override</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        // checked={checked}
                                        // onChange={handleChange}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("windowOverride", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>
                                {errors.windowOverride && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.windowOverride.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitCheckbox">
                                    <p>Is Scheduled</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("isScheduled", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.isScheduled && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.isScheduled.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitCheckbox">
                                    <p>Interview Mode Available</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("interviewMode", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.interviewMode && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.interviewMode.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitCheckbox">
                                    <p>Closeout Form Available</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("closeOut", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.closeOut && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.closeOut.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitCheckbox">
                                    <p>Always Available</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("alwaysAvailable", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.alwaysAvailable && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.alwaysAvailable.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitInput">
                                    <p>Reason Flag</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("reasonFlag", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.reasonFlag && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.reasonFlag.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitInput">
                                    <p>Visit Order</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("visitOrder", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.visitOrder && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.visitOrder.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitInput">
                                    <p>Visit Anchor</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("visitAnchor", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.visitAnchor && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.visitAnchor.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitInput">
                                    <p>Visitstop_HSN</p>
                                    <TextField
                                        inputProps={{
                                            style: { fontSize: 15, width: "500px" },
                                        }}
                                        {...register("visitsTop", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.visitsTop && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.visitsTop.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitCheckbox">
                                    <p>Dosage Module Enabled</p>
                                    <Checkbox
                                        style={{ fontSize: "15px" }}
                                        inputProps={{ "aria-label": "controlled" }}
                                        {...register("dosageModule", {
                                            onChange: (e) => {
                                                setShowDialog(true);
                                            },
                                        })}
                                    />
                                </div>

                                {errors.dosageModule && (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                width: "1270px",
                                            }}
                                        >
                                            <div className="createVisitInput">
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        color: "blue",
                                                    }}
                                                >
                                                    {errors.dosageModule.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="createVisitNavigation">
                                    <p>Visitstop_HSN</p>
                                    <Link className="navigationLink">Add Visit Navigation</Link>
                                </div>

                                <div className="createVisitButtonBody">
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
                                </div>
                            </div> */}
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default DepotReconciliation;
