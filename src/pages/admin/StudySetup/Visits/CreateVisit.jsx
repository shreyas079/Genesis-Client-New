import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Box,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import {
  createNewVisit,
  getAllBusinessRules,
} from "../../../../services/visits";
import "../StudySetup.css";

// CREATE VISIT

const CreateVisit = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [businessRulesData, setBusinessRulesData] = React.useState([]);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const notify = () =>
    toast.success("Visit Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  // .default("2023-02-15T09:43:40.377Z")

  const createVisitSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    daysExpected: yup.number().required("This field is required"),
    windowBefore: yup.number().required("This field is required"),
    windowAfter: yup.number().required("This field is required"),
    notes: yup.string().required("This field is required"),
    lastUpdate: yup.string().required("This field is required"),
    windowOverride: yup.bool().oneOf([true, false]),
    isScheduled: yup.bool().oneOf([true, false]),
    interviewMode: yup.bool().oneOf([true, false]),
    closeOut: yup.bool().oneOf([true, false]),
    alwaysAvailable: yup.bool().oneOf([true, false]),
    reasonFlag: yup.number().required("This field is required"),
    visitOrder: yup.number().required("This field is required"),
    visitAnchor: yup.number().required("This field is required"),
    circularVisitRepeatCount: yup.number().required("This field is required"),
    visitStop_HSN: yup.string().required("This field is required"),
    dosageModule: yup.bool().oneOf([true, false]),
    interviewModeAvailable: yup.bool().oneOf([true, false]),
    closeoutFormAvailable: yup.bool().oneOf([true, false]),
    circularVisit: yup.bool().oneOf([true, false]),
    dosageModuleEnabled: yup.bool().oneOf([true, false]),
    visitAvailableBusinessRuleId: yup
      .string()
      .required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVisitSchema),
  });

  const onSubmit = async (data) => {
    try {
      setShowDialog(false);
      setLoad(true);

      const {
        name,
        daysExpected,
        windowBefore,
        windowAfter,
        notes,
        windowOverride,
        isScheduled,
        interviewMode,
        closeOut,
        alwaysAvailable,
        reasonFlag,
        visitOrder,
        visitAnchor,
        visitStop_HSN,
        visitAvailableBusinessRuleId,
        interviewModeAvailable,
        closeoutFormAvailable,
        circularVisit,
        circularVisitRepeatCount,
        dosageModuleEnabled,
      } = data;

      const newData = {
        name,
        daysExpected,
        windowBefore,
        windowAfter,
        notes,
        // lastUpdate: "2023-02-15T09:43:40.377Z",
        windowOverride,
        isScheduled,
        interviewMode,
        closeOut,
        alwaysAvailable,
        reasonFlag,
        visitOrder,
        visitAnchor,
        visitStop_HSN,
        interviewModeAvailable,
        closeoutFormAvailable,
        circularVisit,
        circularVisitRepeatCount,
        dosageModuleEnabled,
        visitAvailableBusinessRuleId,
      };

      const res = await createNewVisit(newData);
      if (res.status) {
        setLoad(false);
        notify();
        // navigate("/study-management/visits");
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const fetchBusinessData = async () => {
    try {
      const res = await getAllBusinessRules();
      if (res.status) {
        setBusinessRulesData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  React.useEffect(() => {
    fetchBusinessData();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/visits");
  };

  const loadContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "20px",
  };

  const textBoxBody = {
    marginLeft: "10px",
  };

  const textBoxStyles = {
    fontSize: 15,
    width: "500px",
    height: "10px",
  };

  const texAreaStyles = {
    fontSize: 15,
    width: "500px",
    height: "80px",
  };

  const selectStyles = {
    width: 530,
    marginTop: 1,
  };

  const rowStyles = {
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
            <Link to="/study-management/visits">Visits</Link> |{" "}
            <Link to="/study-management/visits/create">Create Visit</Link>
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
                <h1>Create Visit</h1>
              </div>
              <div className="createVisitFormBody">
                <div className="createVisitInput">
                  <p style={labelStyles}>
                    Name
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    type={"text"}
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
                </div>
                {errors.name && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.name.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p style={labelStyles}>
                    Days Expected
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.daysExpected.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p>
                    Window Before
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.windowBefore.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p>
                    Window After
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.windowAfter.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p>
                    Circular Visit Repeat Count
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
                    }}
                    {...register("circularVisitRepeatCount", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.circularVisitRepeatCount && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.circularVisitRepeatCount.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p>
                    Note
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    multiline
                    rows={4}
                    inputProps={{
                      style: texAreaStyles,
                    }}
                    {...register("notes", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.notes && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.notes.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitInput">
                  <p>
                    Last Update
                    <span className="error-highlight">*</span>
                  </p>
                  <TextField
                    style={textBoxBody}
                    type="datetime-local"
                    inputProps={{
                      style: textBoxStyles,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.lastUpdate.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="createVisitCheckbox">
                  <p>
                    Window Override
                    {/* <span className="error-highlight">*</span> */}
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.windowOverride.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitCheckbox">
                  <p>
                    Is Scheduled {/* {errors.isScheduled?.message ? ( */}
                    {/* <span className="error-highlight">*</span> */}
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.isScheduled.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitCheckbox">
                  <p>
                    Interview Mode Available{" "}
                    {/* {errors.interviewMode?.message ? ( */}
                    {/* <span className="error-highlight">*</span> */}
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <Checkbox
                    style={{ fontSize: "15px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("interviewModeAvailable", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.interviewModeAvailable && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.interviewModeAvailable.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitCheckbox">
                  <p>
                    Closeout Form Available{" "}
                    {/* {errors.closeOut?.message ? ( */}
                    {/* <span className="error-highlight">*</span> */}
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.closeOut.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitCheckbox">
                  <p>
                    Always Available{" "}
                  </p>
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.alwaysAvailable.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitInput">
                  <p>
                    Reason Flag {/* {errors.reasonFlag?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.reasonFlag.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitInput">
                  <p>
                    Visit Order {/* {errors.visitOrder?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.visitOrder.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitInput">
                  <p>
                    Visit Anchor {/* {errors.visitAnchor?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <TextField
                    type={"number"}
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      min: 0,
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
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.visitAnchor.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitInput">
                  <p>
                    Visitstop_HSN {/* {errors.visitStop_HSN?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <TextField
                    style={textBoxBody}
                    inputProps={{
                      style: textBoxStyles,
                      maxLength: 1,
                    }}
                    {...register("visitStop_HSN", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.visitStop_HSN && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.visitStop_HSN.message}
                        </span>
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
                    <div className="createVisitFlexEnd">
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

                <div className="createVisitCheckbox">
                  <p>Interview Mode Available</p>
                  <Checkbox
                    style={{ fontSize: "15px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("interviewModeAvailable", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.interviewModeAvailable && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitInput">
                        <p
                          style={{
                            marginTop: "10px",
                            color: "blue",
                          }}
                        >
                          {errors.interviewModeAvailable.message}
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
                    {...register("closeoutFormAvailable", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.closeoutFormAvailable && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitInput">
                        <p
                          style={{
                            marginTop: "10px",
                            color: "blue",
                          }}
                        >
                          {errors.closeoutFormAvailable.message}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitCheckbox">
                  <p>Circular Visit</p>
                  <Checkbox
                    style={{ fontSize: "15px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("circularVisit", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.circularVisit && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitInput">
                        <p
                          style={{
                            marginTop: "10px",
                            color: "blue",
                          }}
                        >
                          {errors.circularVisit.message}
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
                    {...register("dosageModuleEnabled", {
                      onChange: (e) => {
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>

                {errors.dosageModuleEnabled && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitInput">
                        <p
                          style={{
                            marginTop: "10px",
                            color: "blue",
                          }}
                        >
                          {errors.dosageModuleEnabled.message}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitInput">
                  <p style={labelStyles}>
                    Visit Available Business Rule{" "}
                    {/* {errors.name?.message ? ( */}
                    <span className="error-highlight">*</span>
                    {/* ) : (
                      <></>
                    )} */}
                  </p>
                  <FormControl sx={selectStyles}>
                    <Select
                      name="visitAvailableBusinessRuleId"
                      defaultValue={""}
                      inputProps={{
                        style: textBoxStyles,
                        "aria-label": "Without label",
                      }}
                      {...register("visitAvailableBusinessRuleId", {
                        onChange: (e) => {
                          setValue(
                            "visitAvailableBusinessRuleId",
                            e.target.value,
                            {
                              shouldValidate: true,
                            }
                          );
                          setShowDialog(true);
                        },
                      })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {businessRulesData.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {errors.visitAvailableBusinessRuleId && (
                  <>
                    <div className="createVisitFlexEnd">
                      <div className="createVisitError">
                        <span className="error-text">
                          {errors.visitAvailableBusinessRuleId.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="createVisitNavigation">
                  <p>Visitstop_HSN</p>
                  <Link className="navigationLink">Add Visit Navigation</Link>
                </div>

                <Row style={rowStyles}>
                  <Col md={8}></Col>
                  <Col md={2}>
                    <div className="study-management-head-end">
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
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default CreateVisit;
