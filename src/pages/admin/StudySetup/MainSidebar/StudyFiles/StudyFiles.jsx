import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaTimesCircle,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
} from "react-icons/fa";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallbackPrompt } from "../../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../../components/DialogBox";
import {
  createStudyFile,
  getAllLanguages,
} from "../../../../../services/study_files";

import "../../StudySetup.css";
import "./StudyFiles.css";

const StudyFiles = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [languageData, setLanguageData] = React.useState([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);

  const [fileInfo, setFileInfo] = React.useState([]);

  const studyFilesSchema = yup.object().shape({
    LanguageId: yup.string().max(255).required("This field is required"),
    formFile: yup
      .mixed()
      .test("required", "You need to provide a file", (file) => {
        if (file) return true;
        return false;
      }),
    // .test("fileSize", "The file is too large", (file) => {
    //   return file && file.size <= 2000000;
    // }),
  });

  const fileIsRequired = () =>
    toast.warn("File is required", {
      toastId: "imageRequired",
    });

  const fileInvalid = () =>
    toast.error("File type is not allowed", {
      toastId: "imageRequired",
    });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(studyFilesSchema),
  });

  const notify = () =>
    toast.success("Study File Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      const { LanguageId } = data;
      var formFile = selectedFile;

      if (!selectedFile) {
        fileIsRequired();
      } else {
        setLoad(true);
        setShowDialog(false);
        const newData = { LanguageId, formFile };
        const res = await createStudyFile(newData);
        if (res.status) {
          setSelectedFile(null);
          setImgPreview();
          notify();
          reset();
          setLoad(false);
        }
      }
    } catch (err) {
      setLoad(false);
      setShowDialog(false);
      console.log("Error: ", err.message);
      requestFailed(err.message);
    }
  };

  const fetchLanguagesData = async () => {
    try {
      setLoad(true);
      const res = await getAllLanguages();
      if (res.status) {
        setLoad(false);
        setLanguageData(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  function getFileIcon(fileName) {
    const fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf className="file-icon-pdf" />;
      case "doc":
      case "docx":
        return <FaFileWord className="file-icon-word" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="file-icon-excel" />;
      case "jpg":
      case "jpeg":
      case "png":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <img src={imgPreview} className="uploadImgAfter" />
            </div>
          </>
        );
      default:
        setImgPreview(null);
        setSelectedFile(null);
        setFileInfo(null);
        fileInvalid();
    }
  }

  React.useEffect(() => {
    fetchLanguagesData();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/study-management");
  };

  const removeFile = () => {
    setImgPreview(null);
    setSelectedFile(null);
  };

  const labelStyles = {
    display: "flex",
    alignItems: "center",
    height: "30px",
  };

  const rowSpacing = {
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
            <Link to="/study-management/study-settings/study-files">
              Study Files
            </Link>
          </p>
          <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Col md={6}>
              <div className="study-management-head-start">
                <p className="study-management-heading">Study Files</p>
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
                  Upload A New File {/* {errors.formFile?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </p>
              </Col>
              <Col md={10}>
                <div className="uploadBody">
                  {imgPreview === null ? (
                    <div className="uploadButtonContainer">
                      <input
                        className="study-file-input"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        name="formFile"
                        type="file"
                        {...register("formFile", { required: true })}
                        onChange={(event) => {
                          var file = event.target.files[0];
                          setFileInfo(file);
                          const reader = new FileReader();
                          var url = reader.readAsDataURL(file);
                          reader.onloadend = function (e) {
                            setImgPreview([reader.result]);
                          };
                          setSelectedFile(file);
                          setShowDialog(true);
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="uploadAfterBody">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {getFileIcon(fileInfo.name)}
                          <p
                            style={{
                              fontSize: "16px",
                              marginTop: "10px",
                              fontWeight: "500",
                            }}
                          >
                            {fileInfo.name}
                          </p>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => removeFile()}
                          >
                            <FaTimesCircle
                              style={{
                                fontSize: "20px",
                                color: "red !important",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {errors.formFile && (
                  <>
                    <div className="createCaregiverFlexEnd">
                      <div className="createCaregiverError">
                        <span className="error-text">
                          {errors.formFile.message}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>

            <Row style={rowSpacing}>
              <Col md={2}>
                <p className="descriptionLabel" style={labelStyles}>
                  Select Language {/* {errors.LanguageId?.message ? ( */}
                  <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </p>
              </Col>
              <Col md={10}>
                <FormControl className="selectStudyFiles">
                  <Select
                    name="LanguageId"
                    placeholder="Select Language"
                    inputProps={{ "aria-label": "Without label" }}
                    {...register("LanguageId", {
                      onChange: (e) => {
                        setValue("LanguageId", e.target.value, {
                          shouldValidate: true,
                        });
                        setShowDialog(true);
                      },
                    })}
                  >
                    <MenuItem disabled value="">
                      <em>Select Language</em>
                    </MenuItem>
                    {languageData.map((lang) => (
                      <MenuItem value={lang.id}>{lang.name}</MenuItem>
                    ))}
                  </Select>
                  {errors.LanguageId && (
                    <>
                      <div className="createCaregiverFlexEnd">
                        <div className="createCaregiverError">
                          <span className="error-text">
                            {errors.LanguageId.message}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </FormControl>
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
          </Box>
        </div>
      )}
    </>
  );
};

export default StudyFiles;
