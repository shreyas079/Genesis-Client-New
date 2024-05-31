import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Stack, Box, TextField, Checkbox } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Row, Col } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import { getAllSystemCountries } from "../../../../services/system_country";
import {
  createSystemLanaguage,
  getSystemLanguageById,
  editSystemLanguage,
} from "../../../../services/system_language";

import "../../Users/User.css";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 12,
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

const EditLanguages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

  const [load, setLoad] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [checked, setChecked] = React.useState(false);
  const [checkCountriesId, setCheckCountriesId] = React.useState("");
  const [systemCountries, setSystemCountries] = React.useState([]);

  const notify = () =>
    toast.success("Language Edited Successfully", {
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
    // short_name: yup.string().required("This field is required"),
    isRightToLeft: yup.bool().oneOf([true, false], "Right to left is required"),
    // default: yup.bool().oneOf([true, false], "Default is required"),
    // translation_approved: yup
    //   .bool()
    //   .oneOf([true, false], "Translation approved is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createLanguageSchema),
  });

  const fetchLanguageById = async (id) => {
    try {
      const res = await getSystemLanguageById(id);
      if (res.status) {
        const {
          cultureName,
          displayName,
          name,
          isRightToLeft,
          systemCountryId,
        } = res.data;
        setChecked(isRightToLeft);
        setCheckCountriesId(systemCountryId);
        reset({ cultureName, name, displayName, isRightToLeft });
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchLanguageById(id);
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await editSystemLanguage(id, data);
      if (res.status) {
        // navigate("/system-settings");
        notify();
      }
    } catch (err) {
      requestFailed();
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
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

  React.useEffect(() => {
    fetchSystemCountries();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/system-settings");
  };

  return (
    <>
      {load ? (
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
      ) : (
        <div className="content-body">
          <p className="admin-link" style={{ fontWeight: "600" }}>
            <Link to="/homepage">Home</Link> |{" "}
            <Link to="/system-settings">System Settings</Link> |{" "}
            <span
              style={{
                color: "#4b8ac0",
                cursor: "pointer",
              }}
            >
              Edit Language
            </span>
          </p>

          <div>
            <DialogBox
              showDialog={showPrompt}
              confirmNavigation={confirmNavigation}
              cancelNavigation={cancelNavigation}
            />
          </div>

          <Box sx={{ marginTop: "2%" }}>
            <p className="user-heading">Edit Language</p>
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
                      value={checkCountriesId}
                      {...register("systemCountryId")}
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e) => {
                        setValue("systemCountryId", e.target.value, {
                          shouldValidate: true,
                        });
                        setCheckCountriesId(e.target.value);
                        setShowDialog(true);
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Region</em>
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
                    style={{ fontSize: "15px" }}
                    checked={checked}
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

              {/* <Row style={{ marginTop: "2%" }}>
              <Col md={5}>
                <label className="uploadInputLabel">Approve Translation</label>

                <Checkbox
                  className="blueCheckbox"
                  style={{ fontSize: "15px" }}
                  // checked={checked}
                  // onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  {...register("translation_approved", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                <span
                  style={{
                    color: "#3661eb",
                    marginTop: "1%",
                    fontSize: "12px",
                  }}
                >
                  {errors.translation_approved?.message}
                </span>
              </Col>
              <Col md={2}></Col>
              <Col md={5}></Col>
            </Row> */}

              {/* <Row style={{ marginTop: "2%" }}>
              <Col md={5}>
                <label className="uploadInputLabel">Default</label>

                <Checkbox
                  className="blueCheckbox"
                  style={{ fontSize: "15px" }}
                  // checked={checked}
                  // onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  {...register("default", {
                    onChange: (e) => {
                      setShowDialog(true);
                    },
                  })}
                />
                <span
                  style={{
                    color: "#3661eb",
                    marginTop: "1%",
                    fontSize: "12px",
                  }}
                >
                  {errors.default?.message}
                </span>
              </Col>
              <Col md={2}></Col>
              <Col md={5}></Col>
            </Row> */}

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
      )}
    </>
  );
};

export default EditLanguages;
