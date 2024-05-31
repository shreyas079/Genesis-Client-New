import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { Box, Checkbox, MenuItem, FormControl, Select } from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../../components/DialogBox";
import "../../StudySetup.css";
import "../StudyFiles/StudyFiles.css";
import "./Translation.css";

const Import = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [delimiterData, setDelimiterData] = React.useState([
    {
      id: 1,
      name: "delimiter 1",
    },
    {
      id: 2,
      name: "delimiter 2",
    },
    {
      id: 3,
      name: "delimiter 3",
    },
    {
      id: 4,
      name: "delimiter 4",
    },
    {
      id: 5,
      name: "delimiter 5",
    },
  ]);

  const [extensionData, setExtensionData] = React.useState([
    {
      id: 1,
      name: "PDF",
    },
    {
      id: 2,
      name: "XLSX",
    },
    {
      id: 3,
      name: "PNG",
    },
    {
      id: 4,
      name: "JPG",
    },
    {
      id: 5,
      name: "DOCX",
    },
  ]);

  const [importFileData, setImportFileData] = React.useState([
    {
      id: 1,
      name: "File 1",
    },
    {
      id: 2,
      name: "File 2",
    },
    {
      id: 3,
      name: "File 3",
    },
    {
      id: 4,
      name: "File 4",
    },
    {
      id: 5,
      name: "File 5",
    },
  ]);

  const importSchema = yup.object().shape({
    delimiter: yup.string().required("This field is required"),
    extension: yup.string().required("This field is required"),
    // template: yup.string().required("This field is required"),
    importFile: yup.string().required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(importSchema),
  });

  const notify = () =>
    toast.success("Translation Imported Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      console.log("Import Langs ... ", data);
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management/treatment");
  };

  const textBoxBody = {
    marginLeft: "2px",
  };

  const textBoxStyles = {
    fontSize: 12,
    width: "390px",
    height: "5px",
  };

  const selectBoxStyles = {
    fontSize: 12,
    width: "390px",
    height: "2px",
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
      marginTop: "18px",
      marginBottom: "20px",
      fontSize: "12px",
      fontWeight: "500",
    },
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
        <div className="content-body">
          <p className="study-management-link" style={{ fontWeight: "600" }}>
            <Link to="/study-management">Manage Your Study</Link> |{" "}
            <Link to="/study-management/study-settings/translations">
              Translation
            </Link>{" "}
            |{" "}
            <Link to="/study-management/study-settings/translations/import">
              Import
            </Link>
          </p>
          <Row style={{ marginTop: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Import</p>
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
              <Col md={12}>
                <div className="language-flexbox">
                  <div className="language-label-body">
                    <label>
                      Delimiter {/* {errors.delimiter?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                                <></>
                            )} */}
                    </label>
                  </div>
                  <div className="createDispensationInput">
                    <FormControl sx={selectStyles}>
                      <Select
                        name="delimiter"
                        defaultValue={""}
                        inputProps={{
                          style: selectBoxStyles,
                          "aria-label": "Without label",
                        }}
                        {...register("delimiter", {
                          onChange: (e) => {
                            setValue("delimiter", e.target.value, {
                              shouldValidate: true,
                            });
                            setShowDialog(true);
                          },
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {delimiterData.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {errors.delimiter && (
                  <>
                    <div style={langForm.langFlexEnd}>
                      <div style={langForm.langError}>
                        <span style={langForm.langErrorText}>
                          {errors.delimiter.message}
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
                      Extension {/* {errors.extension?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                                <></>
                            )} */}
                    </label>
                  </div>
                  <div className="createDispensationInput">
                    <FormControl sx={selectStyles}>
                      <Select
                        name="extension"
                        defaultValue={""}
                        inputProps={{
                          style: selectBoxStyles,
                          "aria-label": "Without label",
                        }}
                        {...register("extension", {
                          onChange: (e) => {
                            setValue("extension", e.target.value, {
                              shouldValidate: true,
                            });
                            setShowDialog(true);
                          },
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {extensionData.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {errors.extension && (
                  <>
                    <div style={langForm.langFlexEnd}>
                      <div style={langForm.langError}>
                        <span style={langForm.langErrorText}>
                          {errors.extension.message}
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
                      Template
                      {/* <span className="error-highlight">*</span> */}
                    </label>
                  </div>

                  <div className="createDispensationInput">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="template-import-btn"
                    >
                      Download <FaFileDownload style={{ fontSize: "14px" }} />
                    </button>
                  </div>
                </div>
              </Col>
            </Row>

            {/* <Row>
              <Col md={12}>
                {errors.template && (
                  <>
                    <div style={langForm.langFlexEnd}>
                      <div style={langForm.langError}>
                        <span style={langForm.langErrorText}>
                          {errors.template.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row> */}

            <Row>
              <Col md={12}>
                <div className="language-flexbox">
                  <div className="language-label-body">
                    <label>
                      Import File {/* {errors.importFile?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                                <></>
                            )} */}
                    </label>
                  </div>

                  <div className="createDispensationInput">
                    <FormControl sx={selectStyles}>
                      <Select
                        name="importFile"
                        defaultValue={""}
                        inputProps={{
                          style: selectBoxStyles,
                          "aria-label": "Without label",
                        }}
                        {...register("importFile", {
                          onChange: (e) => {
                            setValue("importFile", e.target.value, {
                              shouldValidate: true,
                            });
                            setShowDialog(true);
                          },
                        })}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {importFileData.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {errors.importFile && (
                  <>
                    <div style={langForm.langFlexEnd}>
                      <div style={langForm.langError}>
                        <span style={langForm.langErrorText}>
                          {errors.importFile.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <div className="createVisitButtonBody">
              <button
                // onClick={(e) => {
                //   handleCancel(e);
                // }}
                onClick={(e) => e.preventDefault()}
                className="validateImportBtn"
              >
                Validate Import
              </button>
              <button type="submit" className="validateImportBtn">
                Import
              </button>
            </div>
          </Box>

          <Row style={{ marginTop: "2%" }}>
            <Col md={6}></Col>
            <Col md={6}>
              <Link to="/study-management">
                <div className="study-management-head-end">
                  <button className="study-management-create-btn-lg">
                    Back To Create Study
                  </button>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Import;
