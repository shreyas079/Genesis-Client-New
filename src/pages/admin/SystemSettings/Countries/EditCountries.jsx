import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Stack, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";

import {
  getAllRegions,
  editSystemCountry,
  getSystemCountryById,
} from "../../../../services/system_country";

import "../../Users/User.css";

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

const EditCountries = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location?.state?.id;
  const status = location?.state?.status;

  const [load, setLoad] = React.useState(false);
  const [isActive, setIsActive] = React.useState(status);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [regionsData, setRegionsData] = React.useState([]);
  const [checkRegionId, setCheckRegionId] = React.useState("");

  const createCountrySchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    isoId: yup.string().required("This field is required"),
    regionId: yup.string().required("This field is required"),
    isActive: yup.bool().oneOf([true, false], "This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createCountrySchema),
  });

  const fetchRegionData = async () => {
    try {
      setLoad(true);
      const res = await getAllRegions();
      if (res.status) {
        setLoad(false);
        setRegionsData(res.data);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  const fetchCountryById = async (id) => {
    try {
      setLoad(true);
      const res = await getSystemCountryById(id);
      if (res.status) {
        setLoad(false);
        const { name, isoId, regionId, isActive } = res.data;
        setIsActive(isActive);
        setCheckRegionId(regionId);
        reset({ name, isoId, regionId, isActive });
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchCountryById(id);
  }, [id]);

  React.useEffect(() => {
    fetchRegionData();
  }, []);

  const notify = () =>
    toast.success("Country Edited Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      toastId: "requestFailed",
    });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await editSystemCountry(id, data);
      if (res.status) {
        setLoad(false);
        notify();
      }
    } catch (err) {
      requestFailed();
      console.log("Error: ", err.message);
    } finally {
      setLoad(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/system-settings");
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
            <p className="admin-link" style={{ fontWeight: "600" }}>
              <Link to="/homepage">Home</Link> |{" "}
              <Link to="/system-settings">System Settings</Link> |{" "}
              <span
                style={{
                  color: "#4b8ac0",
                  cursor: "pointer",
                }}
              >
                Edit Country
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
              <p className="user-heading">Edit Country</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{ marginTop: "2%" }}>
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
                  <Col md={2}></Col>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      ISO Code {/* {errors.isoId?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>

                    <input
                      className="nameField"
                      type="text"
                      name="isoId"
                      {...register("isoId", {
                        onChange: (e) => {
                          setShowDialog(true);
                        },
                      })}
                    />
                    <span className="error-text">{errors.isoId?.message}</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <Col md={5}>
                    <label className="uploadInputLabel">
                      Region {/* {errors.regionId?.message ? ( */}
                      <span className="error-highlight">*</span>
                      {/* ) : (
                    <></>
                  )} */}
                    </label>

                    <FormControl className="nameField">
                      <Select
                        name="regionId"
                        value={checkRegionId}
                        {...register("regionId")}
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => {
                          setValue("regionId", e.target.value, {
                            shouldValidate: true,
                          });
                          setCheckRegionId(e.target.value);
                          setShowDialog(true);
                        }}
                      >
                        <MenuItem value="">
                          <em>Select Region</em>
                        </MenuItem>
                        {regionsData.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <span className="error-text">
                      {errors.regionId?.message}
                    </span>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5}></Col>
                </Row>

                <Row style={{ marginTop: "2%", paddingLeft: "0.5%" }}>
                  <Col md={2}>
                    <div className="toggleContainerCountries">
                      <p className="generalHead">Active</p>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AntSwitch
                          defaultChecked={isActive}
                          // onChange={(event) => handleActiveChange(id, event)}
                          inputProps={{ "aria-label": "ant design" }}
                          {...register("isActive", {
                            onChange: (e) => {
                              setIsActive(!isActive);
                              setShowDialog(true);
                            },
                          })}
                        />
                      </Stack>
                    </div>
                  </Col>
                  <Col md={10}></Col>
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

export default EditCountries;
