import React, { useContext } from "react";
import SponsorContext from "../../../context/sponsor/SponsorContext";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { FaTimesCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "./Sponsors.css";
import { createSponsor } from "../../../services/sponsors";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconButton from "@mui/material/IconButton";
import upload from "../../../assets/sponsors/upload.png";
import DialogBox from "../../../components/DialogBox";
import { useCallbackPrompt } from "../../../hooks/useCallbackPrompt";

const CreateSponsors = () => {
  const { sponsorCreation } = useContext(SponsorContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sponsorName, setSponsorName] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imgPreview, setImgPreview] = React.useState(null);
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [load, setLoad] = React.useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().max(255).required("Name is required"),
    file: yup.mixed().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const successToast = "sponsor-success";

  const notify = () =>
    toast.success("Sponsor Created Successfully", {
      // theme: "colored",
      toastId: "createSponsorSuccessToast",
    });

  const imageIsRequired = () =>
    toast.warn("Image is required", {
      // theme: "colored",
      toastId: "imageRequired",
    });

  const requestFailed = (msg) =>
    toast.error(`${msg}`, {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const cancelSponsor = (e) => {
    e.preventDefault();
    navigate("/all-sponsors");
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setLoad(true);
      var name = data.name;
      var fileUrl = selectedFile;
      if (!selectedFile) {
        imageIsRequired();
      } else {
        setShowDialog(false);
        // const res = await sponsorCreation(name, fileUrl);
        const res = await createSponsor({
          name,
          fileUrl,
        });
        if (res.status) {
          // navigate("/all-sponsors");
          notify();
        }
      }
    } catch (err) {
      console.log("submit error: ", err);
      requestFailed(err.message);
    } finally {
      setLoad(false);
    }
  };

  const removeImage = () => {
    setImgPreview(null);
    setSelectedFile(null);
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
            <Link to="/create-sponsor">Create Sponsor</Link>
          </p>
          <p className="sponsor-heading">Create Sponsor</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="upload-body">
              <p className="uploadText">Upload Logo</p>
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
              <label className="uploadInputLabel">Name {sponsorName}</label>
              <Row>
                <Col md={6}>
                  <input
                    // defaultValue={sponsorName}
                    className="nameField"
                    type="text"
                    {...register("name", { required: true })}
                    onChange={handleSponsorInput}
                  />
                  <span style={{ color: "#3661eb", marginTop: "1%" }}>
                    {errors.name?.message}
                  </span>
                </Col>
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
                      Create
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

export default CreateSponsors;
