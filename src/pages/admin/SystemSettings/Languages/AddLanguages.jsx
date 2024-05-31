import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Box, TextField, Checkbox } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";

import { createSystemLanaguage } from "../../../../services/system_language";
import { getAllSystemCountries } from "../../../../services/system_country";

import "../../Users/User.css";

const AddLanguages = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [systemCountries, setSystemCountries] = React.useState([]);

  const notify = () =>
    toast.success("System Language Created Successfully", {
      // theme: "colored",
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      // theme: "colored",
      toastId: "requestFailed",
    });

  const createLanguageSchema = yup.object().shape({
    cultureName: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    displayName: yup.string().required("This field is required"),
    systemCountryId: yup.string().required("This field is required"),
    isRightToLeft: yup.bool().oneOf([true, false], "Right to left is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createLanguageSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await createSystemLanaguage(data);
      if (res.status) {
        setLoad(false);
        // navigate("/system-settings");
        notify();
      }
    } catch (err) {
      setLoad(false);
      requestFailed();
      console.log("Error: ", err.message);
    }
  };

  const fetchSystemCountries = async () => {
    try {
      const res = await getAllSystemCountries();
      if (res.status) {
        setSystemCountries(res.data);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/system-settings");
  };

  React.useEffect(() => {
    fetchSystemCountries();
  }, []);

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
            <p className="admin-link" style={{ fontWeight: "600" }}>
              <Link to="/homepage">Home</Link> |{" "}
              <Link to="/system-settings">System Settings</Link> |{" "}
              <Link to="/system-settings/languages-add">Add Language</Link>
            </p>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

            <Box sx={{ marginTop: "2%" }}>
              <p className="user-heading">Add Language</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Culture Name {/* {errors.cultureName?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>
                    <input
                      className="nameField"
                      type="text"
                      name="cultureName"
                      {...register("cultureName", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">
                      {errors.cultureName?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Name {/* {errors.name?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>

                    <input
                      className="nameField"
                      type="text"
                      name="name"
                      {...register("name", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">{errors.name?.message}</span>
                  </Col>
                </Row>

                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Display Name {/* {errors.displayName?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>
                    <input
                      className="nameField"
                      type="text"
                      name="displayName"
                      {...register("displayName", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">
                      {errors.displayName?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Countries {/* {errors.systemCountryId?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>

                    <FormControl className="nameField">
                      <Select
                        name="systemCountryId"
                        {...register("systemCountryId")}
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => {
                          setValue("systemCountryId", e.target.value, {
                            shouldValidate: true,
                          });
                          setShowDialog(true);
                        }}
                      >
                        <MenuItem value="">
                          <em>Select Country</em>
                        </MenuItem>
                        {systemCountries.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <span className="error-text">
                      {errors.systemCountryId?.message}
                    </span>
                  </Col>
                </Row>

                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Right To Left{" "}
                      {errors.isRightToLeft?.message ? (
                        <span className="error-highlight">*</span>
                      ) : (
                        <></>
                      )}
                    </label>
                    <Checkbox
                      className="blueCheckbox"
                      style={{ fontSize: "25px" }}
                      // checked={checked}
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("isRightToLeft", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">
                      {errors.isRightToLeft?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "3%" }}>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <div className="createSponsor-buttons">
                      <button
                        className="sponsorCancelButton"
                        onClick={(e) => {
                          handleCancel(e);
                        }}
                      >
                        Cancel
                      </button>
                      <button className="sponsorCreateButton" type="submit">
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default AddLanguages;
