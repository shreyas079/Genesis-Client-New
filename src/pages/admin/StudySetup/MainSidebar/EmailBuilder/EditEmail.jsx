import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Box,
  TextField,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../StudySetup.css";
import RichTextEditor from "react-rte";
import "./EmailBuilder.css";
import TagsInput from "./TagsInput";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../../components/DialogBox";

import {
  editEmailContent,
  getEmailContentById,
} from "../../../../../services/email_builder";

const EditEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

  const [load, setLoad] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString("Create Your Email...", "html")
  );
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [emailKeywordState, setEmailKeywordState] = React.useState([]);

  const [isBlindedState, setIsBlindedState] = React.useState(false);
  const [isSiteSpecificState, setIsSiteSpecificState] = React.useState(false);
  const [sendToCreatorState, setSendToCreatorState] = React.useState(false);
  const [displayOnScreenState, setDisplayOnScreenState] = React.useState(false);

  const editEmailSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    notes: yup.string().required("This field is required"),
    isBlinded: yup.bool().oneOf([true, false], "This field is required"),
    isSiteSpecific: yup.bool().oneOf([true, false], "This field is required"),
    sendToCreator: yup.bool().oneOf([true, false], "This field is required"),
    displayOnScreen: yup.bool().oneOf([true, false], "This field is required"),
    patientStatusTypeId: yup.string().required("This field is required"),
    // emailType: yup.string().required("This field is required"),
    // emailSubject: yup.string().required("This field is required"),
    keywords: yup.array(yup.string()).required("This field is required"),
    emailBody: yup.string().required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(editEmailSchema),
  });

  const notify = () =>
    toast.success("Email Edited Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const fetchEmailById = async () => {
    try {
      setLoad(true);
      const res = await getEmailContentById(id);
      if (res.status) {
        setLoad(false);
        const {
          name,
          notes,
          isBlinded,
          isSiteSpecific,
          sendToCreator,
          displayOnScreen,
          patientStatusTypeId,
          keywords,
          emailBody,
        } = res.data;

        setIsBlindedState(isBlinded);
        setIsSiteSpecificState(isSiteSpecific);
        setSendToCreatorState(sendToCreator);
        setDisplayOnScreenState(displayOnScreen);

        reset({
          name,
          notes,
          isBlinded,
          isSiteSpecific,
          sendToCreator,
          displayOnScreen,
          patientStatusTypeId,
          keywords,
          emailBody,
        });

        setEmailKeywordState(keywords);

        const arr = JSON.parse(emailBody);
        const toString = arr[0];

        setEditorValue(RichTextEditor.createValueFromString(toString, "html"));
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchEmailById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);

      const {
        name,
        notes,
        isBlinded,
        isSiteSpecific,
        sendToCreator,
        displayOnScreen,
        patientStatusTypeId,
        keywords,
        emailBody,
      } = data;

      const emailBodyNew = [emailBody];

      const newData = {
        name,
        notes,
        isBlinded,
        isSiteSpecific,
        sendToCreator,
        displayOnScreen,
        patientStatusTypeId,
        keywords,
        emailBody: emailBodyNew,
      };

      const res = await editEmailContent(id, newData);

      if (res.status) {
        setLoad(false);
        notify();
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  function onChange(value) {
    // console.log(value.toString("html"));
    setEditorValue(value);
    setValue("emailBody", value.toString("html"), {
      shouldValidate: true,
    });
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function handleSelecetedTags(items) {
    // console.log(items);
    setEmailKeywordState(items);
    return items;
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/study-settings/email-builder");
  };

  React.useEffect(() => {
    setValue("keywords", emailKeywordState, {
      shouldValidate: true,
    });
  }, [emailKeywordState]);

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "45px",
    marginTop: "2px",
  };

  const textBoxBody = {
    marginLeft: "2px",
  };

  const textBoxStylesNew = {
    fontSize: 15,
    width: "320px",
    height: "5px",
  };

  const rowStyles = {
    marginTop: "2%",
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
            <Link to="/study-management/study-settings/email-builder">
              Email Builder
            </Link>{" "}
            | <p className="study-edit-link">Edit Email Builder</p>
          </p>

          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>

          <Row style={{ marginTop: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Edit Email Builder</p>
              </div>
            </Col>
            <Col md={6}></Col>
          </Row>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              height: "auto",
              width: "100%",
            }}
            autoComplete="off"
          >
            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Name {/* {errors.name?.message ? ( */}
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
                    style: textBoxStylesNew,
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

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Notes {/* {errors.notes?.message ? ( */}
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
                    style: textBoxStylesNew,
                  }}
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
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Blinded{" "}
                  {errors.isBlinded?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <div className="createVisitCheckbox">
                  <Checkbox
                    checked={isBlindedState}
                    style={{ fontSize: "12px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("isBlinded", {
                      onChange: (e) => {
                        setIsBlindedState(!isBlindedState);
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.isBlinded && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.isBlinded.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Site Specific{" "}
                  {errors.isSiteSpecific?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <div className="createVisitCheckbox">
                  <Checkbox
                    checked={isSiteSpecificState}
                    style={{ fontSize: "12px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("isSiteSpecific", {
                      onChange: (e) => {
                        setIsSiteSpecificState(!isSiteSpecificState);
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.isSiteSpecific && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.isSiteSpecific.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Send To Creator{" "}
                  {errors.sendToCreator?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <div className="createVisitCheckbox">
                  <Checkbox
                    checked={sendToCreatorState}
                    style={{ fontSize: "12px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("sendToCreator", {
                      onChange: (e) => {
                        setSendToCreatorState(!sendToCreatorState);
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.sendToCreator && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.sendToCreator.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Display On Screen{" "}
                  {errors.displayOnScreen?.message ? (
                    <span className="error-highlight">*</span>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col md={10}>
                <div className="createVisitCheckbox">
                  <Checkbox
                    checked={displayOnScreenState}
                    style={{ fontSize: "12px" }}
                    inputProps={{ "aria-label": "controlled" }}
                    {...register("displayOnScreen", {
                      onChange: (e) => {
                        setDisplayOnScreenState(!displayOnScreenState);
                        setShowDialog(true);
                      },
                    })}
                  />
                </div>
                {errors.displayOnScreen && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.displayOnScreen.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Patient Status TypeId{" "}
                  {/* {errors.patientStatusTypeId?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
      <></>
    )} */}
                </p>
              </Col>
              <Col md={10}>
                <TextField
                  type="number"
                  style={textBoxBody}
                  inputProps={{
                    style: textBoxStylesNew,
                  }}
                  {...register("patientStatusTypeId", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                {errors.patientStatusTypeId && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.patientStatusTypeId.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Keywords {/* {errors.keywords?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
      <></>
    )} */}
                </p>
              </Col>
              <Col md={10}>
                <FormControl
                  sx={{ width: "320px" }}
                  className="countriesSelect"
                >
                  <TagsInput
                    {...register("keywords")}
                    value={emailKeywordState}
                    selectedTags={handleSelecetedTags}
                    variant="outlined"
                    id="tags"
                    name="tags"
                    placeholder="Add Keywords"
                  // label="tags"
                  />
                  {errors.keywords && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.keywords.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </FormControl>
              </Col>
            </Row>

            <Row>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Email Editor {/* {errors.emailBody?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
      <></>
    )} */}
                </p>
              </Col>
              <Col md={10}>
                <div className="reactEmailDiv">
                  <RichTextEditor
                    {...register("emailBody")}
                    onChange={onChange}
                    value={editorValue}
                  />
                  {errors.emailBody && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.emailBody.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>

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
                className="createVisitCancelBtn"
                onClick={(e) => {
                  handleCancel(e);
                }}
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

export default EditEmail;
