import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { getAllSponsors, getStudyTypes } from "../../../services/sponsors";
import { createStudy, getAllPms } from "../../../services/studies";
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

const CreateStudy = () => {
  const [load, setLoad] = React.useState(false);

  const [sponsorList, setSponsorList] = React.useState([]);
  const [studyTypeList, setStudyTypeList] = React.useState([]);

  const [sponsor, setSponsor] = React.useState("");
  const [studyName, setStudyName] = React.useState("");
  const [studyType, setStudyType] = React.useState("");

  const [portUrl, setPortUrl] = React.useState("");
  const [apiUrl, setApiUrl] = React.useState("");
  const [questionaireUrl, setQuestionaireUrl] = React.useState("");
  const [projectMgrs, setProjectMgrs] = React.useState([]);
  const [managerSelected, setManagerSelected] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const fetchSponsors = async () => {
    const res = await getAllSponsors();
    setSponsorList(res.data);
  };

  const fetchStudyTypes = async () => {
    const res = await getStudyTypes();
    setStudyTypeList(res.data);
  };

  const getPMS = async () => {
    const res = await getAllPms();
    const temp = [];

    res.data.map((manager) => {
      if (manager.studies.length === 0) {
        temp.push(manager);
      }
    });

    setProjectMgrs(temp);
  };

  useEffect(() => {
    getPMS();
    fetchSponsors();
    fetchStudyTypes();
  }, []);

  const navigate = useNavigate();

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
    toast.success("Study Created Successfully", {
      toastId: "createStudySuccessToast",
    });

  const sponsorRequired = () =>
    toast.warn("Sponsor Is Required", {
      toastId: "sponsorRequiredToast",
    });

  const studyTypeRequired = () =>
    toast.warn("Study Type Is Required", {
      toastId: "studyRequiredToast",
    });

  const managerRequired = () =>
    toast.warn("Project Manager Is Required", {
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
      if (sponsor === "") {
        sponsorRequired();
        setLoad(false);
      } else if (studyType === "") {
        studyTypeRequired();
        setLoad(false);
      } else if (managerSelected.length === 0) {
        managerRequired();
        setLoad(false);
      } else {
        setShowDialog(false);
        const newData = {
          sponsorId: sponsor,
          PortalUrl: data.portUrl,
          Name: data.studyName,
          ApiUrl: data.apiUrl,
          StudyTypeId: studyType,
          questionaireUrl: data.questionaireUrl,
          ProjectManagerId: managerSelected,
          isActive: isActive,
        };
        const res = await createStudy(newData);
        if (res.status === 200) {
          setLoad(false);
          getPMS();
          fetchSponsors();
          fetchStudyTypes();
          notify();
          // navigate("/all-studies");
        } else {
          setLoad(false);
          requestFailed();
        }
      }
    } catch (err) {
      console.log("submit error: ", err);
      setLoad(false);
      setShowDialog(true);
      requestFailed();
    }
  };

  const handleSponsorChange = (event) => {
    setSponsor(event.target.value);
    setShowDialog(true);
  };

  const handleStudyChange = (event) => {
    setStudyName(event.target.value);
    setShowDialog(true);
  };

  const handleStudyTypeChange = (event) => {
    setStudyType(event.target.value);
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

  const handleActiveChange = () => {
    setIsActive(!isActive);
    setShowDialog(true);
  };

  const handleMgrSelect = (item, event) => {
    const isChecked = event.target.checked;
    setShowDialog(true);
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
          <DialogBox
            showDialog={showPrompt}
            confirmNavigation={confirmNavigation}
            cancelNavigation={cancelNavigation}
          />

          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/all-studies">Studies</Link> |{" "}
            <Link to="/create-study">Create Study</Link>
          </p>
          <Box sx={{ marginTop: "2%" }}>
            <>
              <p className="sponsor-heading">Create Study</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="uploadField">
                  <Row>
                    <Col xs={12} sm={12} md={5}>
                      <label className="uploadInputLabel">
                        Sponsor
                        <span className="error-highlight">*</span>
                      </label>

                      <FormControl className="nameField">
                        <Select
                          name="sponsor"
                          value={sponsor}
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
                      </FormControl>
                    </Col>
                    <Col md={2}></Col>
                    <Col xs={12} sm={12} md={5}>
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
                    <Col xs={12} sm={12} md={5}>
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
                    <Col xs={12} sm={12} md={5}>
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
                    <Col xs={12} sm={12} md={5}>
                      <label className="uploadInputLabel">
                        Study Type
                        <span className="error-highlight">*</span>
                      </label>

                      <FormControl className="nameField">
                        <Select
                          name="studyType"
                          value={studyType}
                          inputProps={{ "aria-label": "Without label" }}
                          onChange={handleStudyTypeChange}
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
                    </Col>
                    <Col md={2}></Col>
                    <Col xs={12} sm={12} md={5}>
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
                    <Col xs={12} sm={12} md={5}>
                      {projectMgrs && projectMgrs.length === 0 ? (
                        <p>No project managers available</p>
                      ) : (
                        <fieldset className="my-fieldset">
                          <legend className="manager-legend">
                            Project Managers:
                          </legend>
                          {projectMgrs.map((item, index) => (
                            <div className="toggleContainerNew" key={index}>
                              <p className="generalHead">{item.emailAddress}</p>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <AntSwitch
                                  onChange={(event) =>
                                    handleMgrSelect(item, event)
                                  }
                                  inputProps={{ "aria-label": "ant design" }}
                                />
                              </Stack>
                            </div>
                          ))}
                        </fieldset>
                      )}
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
                    <Col xs={12} sm={12} md={5}>
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
                              onChange={handleActiveChange}
                              inputProps={{ "aria-label": "ant design" }}
                            />
                          </Stack>
                        </div>
                      </fieldset>
                    </Col>
                    <Col xs={12} sm={12} md={9}></Col>
                  </Row>
                  <Row style={{ marginTop: "3%" }}>
                    <Col xs={12} sm={12} md={6}></Col>
                    <Col xs={12} sm={12} md={6}>
                      <div className="createSponsor-buttons">
                        <button
                          className="sponsorCancelButton"
                          onClick={cancelStudy}
                        >
                          Cancel
                        </button>
                        <button className="sponsorCreateButton">Save</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </form>
            </>
          </Box>
        </div>
      )}
    </>
  );
};

export default CreateStudy;
