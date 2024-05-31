import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Checkbox } from "@mui/material";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createLanguage } from "../../../../services/languages";

import "./Languages.css";

const AddLanguages = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createLanguageSchema = yup.object().shape({
    cultureName: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    displayName: yup.string().required("This field is required"),
    isRightToLeft: yup.bool().oneOf([true, false]),
    isDefault: yup.bool().oneOf([true, false]),
    translationApproved: yup.bool().oneOf([true, false]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createLanguageSchema),
  });

  const notify = () =>
    toast.success("Language Created Successfully", {
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
      const {
        cultureName,
        name,
        displayName,
        isRightToLeft,
        isDefault,
        translationApproved,
      } = data;

      const newData = {
        cultureName,
        name,
        displayName,
        isRightToLeft,
        isDefault,
        translationApproved,
        lastUpdate: "2023-02-15T09:43:40.377Z",
      };

      const res = await createLanguage(newData);

      if (res.status) {
        setLoad(false);
        setOpen(false);
        notify();
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/languages");
  };

  const loadContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  };

  const textBoxBody = {
    marginLeft: "2px",
  };

  const textBoxStyles = {
    fontSize: 12,
    width: "390px",
    height: "5px",
  };

  const langForm = {
    langFlexEnd: {
      display: "flex",
      justifyContent: "flex-end",
      width: "1050px",
    },
    langError: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "865px",
      marginTop: "-5px",
    },
    langErrorText: {
      color: "#3661eb",
      marginLeft: "5px",
      marginTop: "10px",
      fontSize: "10px",
      fontWeight: "600",
    },
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
            <Link to="/study-management/languages">Languages</Link> |{" "}
            <Link to="/study-management/languages/add">Add Languages</Link>
          </p>

          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>

          <Row>
            <Col md={12}>
              <p className="languages-heading-md">Add Language</p>
              <div className="languages-form-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>
                            Culture Name{/* {errors.cultureName?.message ? ( */}
                            <span className="error-highlight">*</span>
                            {/* ) : (
                                <></>
                            )} */}
                          </label>
                        </div>

                        <div>
                          <TextField
                            style={textBoxBody}
                            inputProps={{
                              style: textBoxStyles,
                            }}
                            {...register("cultureName", {
                              onChange: (e) => {
                                setShowDialog(true);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.cultureName && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.cultureName.message}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>
                            Language{/* {errors.name?.message ? ( */}
                            <span className="error-highlight">*</span>
                            {/* ) : (
                                <></>
                            )} */}
                          </label>
                        </div>

                        <div>
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
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.name && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.name.message}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>
                            Display Name{/* {errors.displayName?.message ? ( */}
                            <span className="error-highlight">*</span>
                            {/* ) : (
                                <></>
                            )} */}
                          </label>
                        </div>

                        <div>
                          <TextField
                            style={textBoxBody}
                            inputProps={{
                              style: textBoxStyles,
                            }}
                            {...register("displayName", {
                              onChange: (e) => {
                                setShowDialog(true);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.displayName && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.displayName.message}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>Right to Left</label>
                        </div>

                        <div>
                          <Checkbox
                            style={{ fontSize: "18px" }}
                            inputProps={{ "aria-label": "controlled" }}
                            {...register("isRightToLeft", {
                              onChange: (e) => {
                                setShowDialog(true);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.isRightToLeft && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.isRightToLeft.message}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>Is Default</label>
                        </div>

                        <div>
                          <Checkbox
                            style={{ fontSize: "18px" }}
                            inputProps={{ "aria-label": "controlled" }}
                            {...register("isDefault", {
                              onChange: (e) => {
                                setShowDialog(true);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.isDefault && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.isDefault.message}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <div className="language-flexbox">
                        <div className="language-label-body">
                          <label>Translation Approved</label>
                        </div>

                        <div>
                          <Checkbox
                            style={{ fontSize: "18px" }}
                            inputProps={{ "aria-label": "controlled" }}
                            {...register("translationApproved", {
                              onChange: (e) => {
                                setShowDialog(true);
                              },
                            })}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      {errors.translationApproved && (
                        <>
                          <div style={langForm.langFlexEnd}>
                            <div style={langForm.langError}>
                              <span style={langForm.langErrorText}>
                                {errors.translationApproved.message}
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

                  {/* <Row>
                                        <Col md={12}>
                                            <div className="language-button-flexbox">
                                                <button
                                                    className="cancel-language"
                                                    onClick={(e) => {
                                                        handleCancel(e);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit" className="create-language">
                                                    Save
                                                </button>
                                            </div>
                                        </Col>
                                    </Row> */}
                </form>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default AddLanguages;
