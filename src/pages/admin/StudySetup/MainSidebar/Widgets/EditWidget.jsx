import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../../components/DialogBox";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  editWidget,
  getWidgetById,
  getAllWidgetTypes,
} from "../../../../../services/widgets";

const EditWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

  const [load, setLoad] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [widgetTypeData, setWidgetTypeData] = React.useState([]);

  const [widgetTypeState, setWidgetTypeState] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editWidgetSchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    translationTitleText: yup.string().required("This field is required"),
    translationDescriptionText: yup.string().required("This field is required"),
    translationButtonText: yup.string().required("This field is required"),
    widgetTypeId: yup.string().required("This field is required"),
    widgetPosition: yup.number().min(1).required("This field is required"),
    iconName: yup.string().required("This field is required"),
    columnWidth: yup.number().min(1).required("This field is required"),
    columnHeight: yup.number().min(1).required("This field is required"),
    permission: yup.string().required("This field is required"),
    //   isRightToLeft: yup.bool().oneOf([true, false]),
    //   isDefault: yup.bool().oneOf([true, false]),
    //   translationApproved: yup.bool().oneOf([true, false]),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editWidgetSchema),
  });

  const fetchWidgetTypes = async () => {
    try {
      const res = await getAllWidgetTypes();
      if (res.status) {
        setWidgetTypeData(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchWidgetTypes();
  }, []);

  const notify = () =>
    toast.success("Widget Edited Successfully", {
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
      const res = await editWidget(id, data);
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

  const fetchWidgetById = async (id) => {
    try {
      const res = await getWidgetById(id);

      if (res.data) {
        const {
          name,
          columnHeight,
          columnWidth,
          iconName,
          permission,
          translationButtonText,
          translationDescriptionText,
          translationTitleText,
          widgetPosition,
          widgetType,
          widgetTypeId,
        } = res.data;

        setWidgetTypeState(widgetTypeId);

        reset({
          name,
          columnHeight,
          columnWidth,
          iconName,
          permission,
          translationButtonText,
          translationDescriptionText,
          translationTitleText,
          widgetPosition,
          widgetType,
          widgetTypeId,
        });
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchWidgetById(id);
  }, [id]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/study-settings/widgets");
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
      marginBottom: "20px",
      fontSize: "12px",
      fontWeight: "500",
    },
  };

  const selectBoxStyles = {
    fontSize: 12,
    width: "390px",
    height: "2px",
  };

  const rowSpacing = {
    marginTop: "2%",
  };

  const selectStyles = {
    width: 418,
    marginLeft: 0.3,
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
              <Link to="/study-management/study-settings/widgets">Widgets</Link>{" "}
              | <p className="study-edit-link">Edit Widget</p>
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
                <p className="languages-heading-md">Edit Widget</p>
                <div className="languages-form-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={12}>
                        <div className="language-flexbox">
                          <div className="language-label-body">
                            <label>
                              Widget Name{/* {errors.name?.message ? ( */}
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
                              Title
                              {/* {errors.translationTitleText?.message ? ( */}
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
                              {...register("translationTitleText", {
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
                        {errors.translationTitleText && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.translationTitleText.message}
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
                              Description{" "}
                              {/* {errors.translationDescriptionText?.message ? ( */}
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
                              {...register("translationDescriptionText", {
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
                        {errors.translationDescriptionText && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.translationDescriptionText.message}
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
                              Button Text{" "}
                              {/* {errors.translationButtonText?.message ? ( */}
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
                              {...register("translationButtonText", {
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
                        {errors.translationButtonText && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.translationButtonText.message}
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
                              Widget Type{" "}
                              {/* {errors.widgetTypeId?.message ? ( */}
                              <span className="error-highlight">*</span>
                              {/* ) : (
                                <></>
                            )} */}
                            </label>
                          </div>

                          <FormControl sx={selectStyles}>
                            <Select
                              name="widgetTypeId"
                              value={widgetTypeState}
                              inputProps={{
                                style: selectBoxStyles,
                                "aria-label": "Without label",
                              }}
                              {...register("widgetTypeId", {
                                onChange: (e) => {
                                  setWidgetTypeState(e.target.value);
                                  // setValue("widgetTypeId", e.target.value, {
                                  //   shouldValidate: true,
                                  // });
                                  setShowDialog(true);
                                },
                              })}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {widgetTypeData.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.widgetTypeId && (
                              <>
                                <div className="createCaregiverFlexEnd">
                                  <div className="createCaregiverError">
                                    <span className="error-text">
                                      {errors.widgetTypeId.message}
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                            {/* {errors.widgetTypeId && (
                  <p className="error-text">{errors.widgetTypeId.message}</p>
                )} */}
                          </FormControl>

                          {/* <div>
                            <TextField
                              style={textBoxBody}
                              inputProps={{
                                style: textBoxStyles,
                              }}
                              {...register("widgetTypeId", {
                                onChange: (e) => {
                                  setShowDialog(true);
                                },
                              })}
                            />
                          </div> */}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        {errors.widgetTypeId && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.widgetTypeId.message}
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
                              Widget Position{" "}
                              {/* {errors.widgetPosition?.message ? ( */}
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
                              {...register("widgetPosition", {
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
                        {errors.widgetPosition && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.widgetPosition.message}
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
                              Icon Name {/* {errors.iconName?.message ? ( */}
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
                              {...register("iconName", {
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
                        {errors.iconName && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.iconName.message}
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
                              Column Width{" "}
                              {/* {errors.columnWidth?.message ? ( */}
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
                              {...register("columnWidth", {
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
                        {errors.columnWidth && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.columnWidth.message}
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
                              Column Height{" "}
                              {/* {errors.columnHeight?.message ? ( */}
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
                              {...register("columnHeight", {
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
                        {errors.columnHeight && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.columnHeight.message}
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
                              Permission {/* {errors.permission?.message ? ( */}
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
                              {...register("permission", {
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
                        {errors.permission && (
                          <>
                            <div style={langForm.langFlexEnd}>
                              <div style={langForm.langError}>
                                <span style={langForm.langErrorText}>
                                  {errors.permission.message}
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
        </>
      )}
    </>
  );
};

export default EditWidget;
