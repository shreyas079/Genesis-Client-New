import React, { useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { getAllSponsors, getStudyTypes } from "../../../services/sponsors";
import {
  editStudy,
  getStudyById,
  getAllPms,
  editStudyStatus,
} from "../../../services/studies";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogBox from "../../../components/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";

import "./Study.css";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const EditStudy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  var id = params.id;
  console.log("Edit Study ID: ", id);
  var sponsorname = location.state?.sponsorName;
  var sponsorId = location.state?.sponsorId;
  var studyname = location.state?.studyname;
  var studytype = location.state?.studyType;
  var portalurl = location.state?.portalUrl;
  var apiurl = location.state?.apiUrl;
  var questionnairebuilderurl = location.state?.questionnaireBuilderUrl;
  var isactive = location.state?.isactive;

  const [load, setLoad] = React.useState(false);

  const [compLoad, setCompLoad] = React.useState(false);

  const [editUserData, setEditUserData] = React.useState([]);

  const [sponsorList, setSponsorList] = React.useState([]);
  const [studyTypeList, setStudyTypeList] = React.useState([]);

  const [editStudyID, setEditStudyID] = React.useState(id);

  const [sponsorID, setSponsorID] = React.useState(sponsorId);
  const [sponsor, setSponsor] = React.useState(sponsorname);
  const [studyName, setStudyName] = React.useState(studyname);
  const [studyType, setStudyType] = React.useState(studytype);
  const [studyTypeID, setStudyTypeID] = React.useState("");

  const [portUrl, setPortUrl] = React.useState(portalurl);
  const [apiUrl, setApiUrl] = React.useState(apiurl);
  const [questionaireUrl, setQuestionaireUrl] = React.useState(
    questionnairebuilderurl
  );
  const [projectMgrs, setProjectMgrs] = React.useState([]);
  const [alreadySelectedMgr, setAlreadySelectedMgr] = React.useState([]);
  const [managerSelected, setManagerSelected] = React.useState([]);
  const [isActive, setIsActive] = React.useState(isactive);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  // const fetchEditUser = async (id) => {
  //   const res = await getStudyById(id);
  //   console.log(res, "jfskdjksjkjskdjksj");
  //   setIsActive(res.data.isActive);
  //   setAlreadySelectedMgr(res.data.projectManagers);
  //   setManagerSelected(
  //     res.data.projectManagers.map((mgr) => {
  //       return mgr.id;
  //     })
  //   );
  //   setEditUserData(res.data);
  // };
  const fetchEditUser = async (id) => {
    try {
      const res = await getStudyById(id);
      console.log(res, "API Response");

      if (res.status === "Success" && res.result && res.result.length > 0) {
        const study = res.result[0]; // Assuming you want to fetch the first study details from the result array

        setIsActive(study.isActive || false);
        setAlreadySelectedMgr(study.projectManagers || []);

        setManagerSelected((study.projectManagers || []).map((mgr) => mgr.id));

        setEditUserData(study);
      } else {
        console.error("No study data found or API call failed");
      }
    } catch (error) {
      console.error("An error occurred while fetching the study data", error);
    }
  };
  const fetchSponsors = async () => {
    try {
      const res = await getAllSponsors(); // Replace with actual API call
      if (res.status === "Success" && res.result) {
        setSponsorList(res.result);
      } else {
        console.error("Failed to fetch sponsors");
      }
    } catch (error) {
      console.error("An error occurred while fetching the sponsors", error);
    }
  };

  // const fetchSponsors = async () => {
  //   const res = await getAllSponsors();
  //   setSponsorList(res.data);
  // };

  const fetchStudyTypes = async () => {
    const res = await getStudyTypes();
    setStudyTypeList(res.data);

    res.data.map((item) => {
      if (item.name === studyType) {
        setStudyTypeID(item.id);
      }
    });
  };

  // const getPMS = async () => {
  //   const res = await getAllPms();

  //   const temp = [];

  //   res.data.map((manager) => {
  //     if (manager.studies.length === 0) {
  //       temp.push(manager);
  //     }
  //   });

  //   setProjectMgrs(temp);
  // };
  const getPMS = async () => {
    try {
      const res = await getAllPms();

      if (res.status === 200) {
        const projectManagers = res.data.result; // Access the correct part of the response

        const temp = projectManagers.filter(
          (manager) => manager.studies.length === 0
        );

        setProjectMgrs(temp);
      } else {
        console.error("Failed to fetch project managers");
      }
    } catch (error) {
      console.error("Error fetching project managers: ", error.message);
    }
  };

  useEffect(() => {
    getPMS();
    fetchSponsors();
    fetchStudyTypes();
  }, []);

  useEffect(() => {
    getPMS();
    fetchSponsors();
    fetchStudyTypes();
  }, [isActive]);

  useEffect(() => {
    fetchEditUser(id);
  }, [id]);

  const validationSchema = yup.object().shape({
    studyName: yup.string().max(255).required("Study Name is required"),
    portUrl: yup.string().max(255).required("Portal URL is required"),
    apiUrl: yup.string().max(255).required("API URL is required"),
    questionaireUrl: yup
      .string()
      .max(255)
      .required("Questionaire builder URL is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const notify = () =>
    toast.success("Study Edited Successfully", {
      toastId: "editSuccessToast",
    });

  const activeSuccess = () =>
    toast.success("Status Edited Successfully", {
      toastId: "statusSuccessToast",
    });

  const sponsorRequired = () =>
    toast.success("Sponsor Is Required", {
      toastId: "sponsorRequiredToast",
    });

  const studyTypeRequired = () =>
    toast.success("Study Is Required", {
      toastId: "studyRequiredToast",
    });

  const managerRequired = () =>
    toast.warn("Manager Is Required", {
      toastId: "managerRequired",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      toastId: "requestFailed",
    });

  const cancelStudy = (e) => {
    e.preventDefault();
    navigate("/all-studies");
  };

  const onSubmit = async (data, e) => {
    setLoad(true);
    e.preventDefault();
    try {
      if (sponsorID === "") {
        sponsorRequired();
        setLoad(false);
      } else if (studyTypeID === "") {
        studyTypeRequired();
        setLoad(false);
      } else if (managerSelected.length === 0) {
        managerRequired();
        setLoad(false);
      } else {
        setCompLoad(true);
        setShowDialog(false);
        const newData = {
          sponsorId: sponsorID,
          PortalUrl: data.portUrl,
          Name: data.studyName,
          ApiUrl: data.apiUrl,
          StudyTypeId: studyTypeID,
          questionaireUrl: data.questionaireUrl,
          ProjectManagerId: managerSelected,
          isActive: isActive,
        };
        const res = await editStudy(editStudyID, newData);
        if (res.status) {
          notify();
        } else {
          requestFailed();
          setCompLoad(false);
        }
      }
    } catch (err) {
      console.log("submit error: ", err);
      setShowDialog(true);
      requestFailed();
    } finally {
      setCompLoad(false);
      setLoad(false);
    }
  };

  const handleSponsorChange = (event) => {
    setSponsorID(event.target.value);
    setShowDialog(true);
  };

  const handleStudyChange = (event) => {
    setStudyName(event.target.value);
    setShowDialog(true);
  };

  const handleStudyTypeChange = (event) => {
    setStudyTypeID(event.target.value);
    setShowDialog(true);
  };

  const handlePortUrl = (event) => {
    setPortUrl(event.target.value);
    setShowDialog(true);
  };

  const handleApiUrl = (event) => {
    setApiUrl(event.target.value);
    setShowDialog(true);
  };

  const handleQuestionaireUrl = (event) => {
    setQuestionaireUrl(event.target.value);
    setShowDialog(true);
  };

  const handleActiveChange = async (editStudyID, event) => {
    setShowDialog(true);
    setLoad(true);
    const activeChecked = event.target.checked;
    setIsActive(activeChecked);

    const res = await editStudyStatus(editStudyID, activeChecked);
    if (res.status === 200) {
      setLoad(false);
      activeSuccess();
    } else {
      setLoad(false);
      requestFailed();
    }
  };

  const handleMgrAlreadySelected = (item, event) => {
    setShowDialog(true);
    const isChecked = event.target.checked;
    if (isChecked === true) {
      const managerArray = [];
      managerArray.push(item.id);
      setManagerSelected([...managerSelected, ...managerArray]);
    } else if (isChecked === false) {
      const filterManager = managerSelected.filter((mgr) => mgr !== item.id);
      setManagerSelected(filterManager);
    }
  };

  const handleMgrSelect = (item, event) => {
    setShowDialog(true);
    const isChecked = event.target.checked;
    if (isChecked === true) {
      const managerArray = [];
      managerArray.push(item.id);
      setManagerSelected([...managerSelected, ...managerArray]);
    } else if (isChecked === false) {
      const filterManager = managerSelected.filter((mgr) => mgr !== item.id);
      setManagerSelected(filterManager);
    }
  };

  return (
    <>
      {compLoad ? (
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
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />

            <p className="admin-link" style={{ fontWeight: "600" }}>
              <Link to="/homepage">Home</Link> |{" "}
              <Link to="/all-studies">Studies</Link> |{" "}
              <span
                style={{
                  color: "#4b8ac0",
                  cursor: "pointer",
                }}
              >
                Edit Study
              </span>
            </p>

            <Box sx={{ marginTop: "2%" }}>
              <>
                <p className="sponsor-heading">Edit Study</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="uploadField">
                    <Row>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Sponsor
                          <span className="error-highlight">*</span>
                        </label>
                        {/* <FormControl className="nameField">
                          <Select
                            name="sponsor"
                            value={sponsorID}
                            inputProps={{ "aria-label": "Without label" }}
                            onChange={handleSponsorChange}
                          >
                            <MenuItem value="">
                              <em>Select Sponsor</em>
                            </MenuItem>
                            {sponsorList.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl> */}

                        <FormControl className="nameField">
                          <Select
                            name="sponsor"
                            value={sponsorID}
                            inputProps={{ "aria-label": "Without label" }}
                            onChange={handleSponsorChange}
                          >
                            <MenuItem value="">
                              <em>Select Sponsor</em>
                            </MenuItem>
                            {(sponsorList || []).map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.sponsor?.message}
                        </span>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Portal Url
                          <span className="error-highlight">*</span>
                        </label>
                        <input
                          className="nameField"
                          defaultValue={portUrl}
                          type="text"
                          name="portUrl"
                          {...register("portUrl", { required: true })}
                          onChange={handlePortUrl}
                        />
                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.portUrl?.message}
                        </span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "3%" }}>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Name
                          <span className="error-highlight">*</span>
                        </label>
                        <input
                          name="studyName"
                          defaultValue={studyName}
                          className="nameField"
                          type="text"
                          {...register("studyName", { required: true })}
                          onChange={handleStudyChange}
                        />
                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.studyName?.message}
                        </span>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Api Url
                          <span className="error-highlight">*</span>
                        </label>
                        <input
                          className="nameField"
                          defaultValue={apiUrl}
                          type="text"
                          name="apiUrl"
                          {...register("apiUrl", { required: true })}
                          onChange={handleApiUrl}
                        />
                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.apiUrl?.message}
                        </span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "3%" }}>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Study Type
                          <span className="error-highlight">*</span>
                        </label>
                        <FormControl className="nameField">
                          <Select
                            name="studyType"
                            value={studyTypeID}
                            onChange={handleStudyTypeChange}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">
                              <em>Select Study Type</em>
                            </MenuItem>
                            {studyTypeList.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.studyType?.message}
                        </span>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={5}>
                        <label className="uploadInputLabel">
                          Questionaire builder Url{" "}
                          <span className="error-highlight">*</span>
                        </label>
                        <input
                          name="questionaireUrl"
                          defaultValue={questionaireUrl}
                          className="nameField"
                          type="text"
                          {...register("questionaireUrl", { required: true })}
                          onChange={handleQuestionaireUrl}
                        />
                        <span style={{ color: "#3661eb", marginTop: "1%" }}>
                          {errors.questionaireUrl?.message}
                        </span>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
                      <Col md={5}>
                        <fieldset className="my-fieldset">
                          <legend className="manager-legend">
                            Project Managers
                            <span className="error-highlight">*</span>:{" "}
                          </legend>
                          <div
                            style={{
                              paddingTop: "18px",
                              paddingLeft: "18px",
                              paddingRight: "18px",
                              paddingBottom: "0px",
                            }}
                          >
                            {alreadySelectedMgr &&
                            alreadySelectedMgr.length === 0 ? (
                              <p>No already selected managers</p>
                            ) : (
                              alreadySelectedMgr.map((manager, index) => (
                                <div className="toggleContainerNew" key={index}>
                                  <p className="generalHead">
                                    {manager?.emailAddress}
                                  </p>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <AntSwitch
                                      defaultChecked={alreadySelectedMgr.filter(
                                        (item) => item.id === manager.id
                                      )}
                                      onChange={(event) =>
                                        handleMgrAlreadySelected(manager, event)
                                      }
                                      inputProps={{
                                        "aria-label": "ant design",
                                      }}
                                    />
                                  </Stack>
                                </div>
                              ))
                            )}
                          </div>
                          <div
                            style={{
                              paddingTop: "0px",
                              paddingLeft: "18px",
                              paddingRight: "18px",
                              paddingBottom: "18px",
                            }}
                          >
                            {projectMgrs && projectMgrs.length === 0 ? (
                              <p>No new project managers available yet.</p>
                            ) : (
                              projectMgrs.map((item, index) => (
                                <div className="toggleContainerNew" key={index}>
                                  <p className="generalHead">
                                    {item.emailAddress}
                                  </p>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <AntSwitch
                                      onChange={(event) =>
                                        handleMgrSelect(item, event)
                                      }
                                      inputProps={{
                                        "aria-label": "ant design",
                                      }}
                                    />
                                  </Stack>
                                </div>
                              ))
                            )}
                          </div>
                        </fieldset>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
                      <Col md={5}>
                        {load ? (
                          <>
                            <div
                              style={{
                                alignItems: "center",
                                height: "70vh",
                              }}
                            >
                              <BeatLoader color="#3661eb" />
                            </div>
                          </>
                        ) : (
                          <fieldset className="my-fieldset">
                            <legend className="status-legend">Status:</legend>
                            <div className="toggleContainer">
                              <p className="generalHead">Active</p>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <AntSwitch
                                  checked={isActive}
                                  onChange={(event) =>
                                    handleActiveChange(editStudyID, event)
                                  }
                                  inputProps={{ "aria-label": "ant design" }}
                                />
                              </Stack>
                            </div>
                          </fieldset>
                        )}
                      </Col>
                      <Col md={9}></Col>
                    </Row>
                    <Row style={{ marginTop: "3%" }}>
                      <Col md={6}></Col>
                      <Col md={6}>
                        <div className="createSponsor-buttons">
                          <button
                            className="sponsorCancelButton"
                            onClick={cancelStudy}
                          >
                            Cancel
                          </button>
                          <button className="sponsorCreateButton" type="submit">
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
              </>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default EditStudy;
