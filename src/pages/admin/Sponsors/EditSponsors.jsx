import React, { useEffect } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaTimesCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { editSponsor, getSponsorImage } from "../../../services/sponsors";
import { editSponsorStatus } from "../../../services/sponsors";
import "./Sponsors.css";
import IconButton from "@mui/material/IconButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import upload from "../../../assets/sponsors/upload.png";
import DialogBox from "../../../components/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";
import useSponsorDetails from "../../../hooks/Api/useSponsorsDetails";

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

const EditSponsors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  var id = location?.state?.id;
  var name = location?.state?.name;
  var fileUrl = location?.state?.fileUrl;
  var isactive = location?.state?.isactive;

  // const getImage = async (fileUrl) => {
  //   const res = await getSponsorImage(fileUrl);
  //   // setSelectedFile(res.data);
  //   setImgPreview(res.data);
  // };

  // useEffect(() => {
  //   getImage(fileUrl);
  // }, []);
  const { sponsorImage, isLoadingImage } = useSponsorDetails([], fileUrl);

  useEffect(() => {
    if (sponsorImage) {
      setImgPreview(sponsorImage);
    }
  }, [sponsorImage]);

  const [load, setLoad] = React.useState(false);
  const [sponsorId, setSponsorId] = React.useState(id);
  const [sponsorName, setSponsorName] = React.useState(name);
  const [selectedFile, setSelectedFile] = React.useState(fileUrl);
  const [isActive, setIsActive] = React.useState(isactive);
  const [imgPreview, setImgPreview] = React.useState(null);

  const validationSchema = yup.object().shape({
    name: yup.string().max(255).required("Name is required"),
    file: yup.mixed().required("Image is required"),
  });

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const notify = () =>
    toast.success("Sponsor Edited Successfully", {
      // theme: "colored",
      toastId: "editSuccessToast",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const activeSuccess = () =>
    toast.success("Status Edited Successfully", {
      // theme: "colored",
      toastId: "statusSuccessToast",
    });

  const imageIsRequired = () =>
    toast.warn("Image is required", {
      // theme: "colored",
      toastId: "imageRequired",
    });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      var name = data.name;
      var fileUrl = selectedFile;
      if (!selectedFile) {
        imageIsRequired();
      } else {
        setLoad(true);
        setShowDialog(false);
        const res = await editSponsor(id, {
          name,
          fileUrl,
        });
        if (res.status) {
          notify();
          setLoad(false);
        } else {
          requestFailed();
          setLoad(false);
        }
      }
    } catch (err) {
      console.log("submit error: ", err);
      requestFailed();
      setLoad(false);
    }
  };

  const cancelSponsor = (e) => {
    e.preventDefault();
    navigate("/all-sponsors");
  };

  const handleEditName = (e) => {
    setSponsorName(e.target.value);
  };

  // console.log("ERRORS: ", errors);

  const removeImage = () => {
    setImgPreview(null);
    setSelectedFile(null);
  };

  const handleActiveChange = async (sponsorId, event) => {
    setLoad(true);
    const activeChecked = event.target.checked;
    setIsActive(activeChecked);

    const res = await editSponsorStatus(sponsorId, activeChecked);
    if (res.status === 200) {
      setLoad(false);
      activeSuccess();
    } else {
      setLoad(false);
      requestFailed();
    }
  };

  const handleSponsorInput = (event) => {
    var name = event.target.value;
    // setSponsorName(name);
    if (name) {
      // console.log("Name...", name);
      setShowDialog(true);
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
            <Link to="/all-sponsors">Sponsors</Link> |{" "}
            <span
              style={{
                color: "#4b8ac0",
                cursor: "pointer",
              }}
            >
              Edit Sponsor
            </span>
          </p>
          <p className="sponsor-heading">Edit Sponsor</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="upload-body">
              <p className="uploadText">Upload Logo</p>
              {/* <img src={jeep} className="uploadImg" />
          <img src={edit} className="editIcon" /> */}

              {imgPreview === null ? (
                <>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden={true}
                      accept="image/*"
                      name="file"
                      type="file"
                      {...register("file", { required: true })}
                      onChange={(event) => {
                        var file = event.target.files[0];
                        const reader = new FileReader();
                        var url = reader.readAsDataURL(file);
                        // setFieldValue("file", event.target.files[0]);
                        reader.onloadend = function (e) {
                          setImgPreview([reader.result]);
                        };
                        setSelectedFile(file);
                        setShowDialog(true);
                      }}
                    />
                    <img src={upload} className="uploadImg" />
                  </IconButton>
                  <span style={{ color: "#3661eb", marginLeft: "1%" }}>
                    {errors.file?.message}
                  </span>
                </>
              ) : (
                <>
                  <div className="uploadAfterBody">
                    <button
                      style={{
                        position: "absolute",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => removeImage()}
                    >
                      <FaTimesCircle
                        style={{
                          fontSize: "20px",
                          color: "red !important",
                          marginLeft: "60px",
                        }}
                      />
                    </button>
                    <img src={imgPreview} className="uploadImgAfter" />
                  </div>
                  <span style={{ color: "#3661eb", marginLeft: "1%" }}>
                    {errors.file?.message}
                  </span>
                </>
              )}
            </div>
            <div className="uploadField">
              <label className="uploadInputLabel">Name</label>
              <Row>
                <Col md={6}>
                  {/* <input className="nameField" type="text" /> */}
                  <input
                    className="nameField"
                    type="text"
                    defaultValue={sponsorName}
                    // onChange={handleEditName}
                    {...register("name", { required: true })}
                    onChange={handleSponsorInput}
                  />
                  <span style={{ color: "#3661eb", marginTop: "1%" }}>
                    {errors.name?.message}
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
                <Col md={3}>
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
                    <div className="toggleContainer">
                      <p className="generalHead">Active</p>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AntSwitch
                          checked={isActive}
                          onChange={(event) =>
                            handleActiveChange(sponsorId, event)
                          }
                          inputProps={{ "aria-label": "ant design" }}
                        />
                      </Stack>
                    </div>
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
                      onClick={cancelSponsor}
                    >
                      Cancel
                    </button>
                    <button className="sponsorCreateButton" type="submit">
                      Save Changes
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditSponsors;
