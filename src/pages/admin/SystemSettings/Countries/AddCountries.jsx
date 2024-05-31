import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Row, Col } from "react-bootstrap";
import BeatLoader from "react-spinners/BeatLoader";
import { useCallbackPrompt } from "../../../../hooks/useCallbackPrompt";
import DialogBox from "../../../../components/DialogBox";
import {
  getAllRegions,
  createSystemCountry,
} from "../../../../services/system_country";

import "../../Users/User.css";

const AddCountries = () => {
  const navigate = useNavigate();

  const [load, setLoad] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);
  const [regionsData, setRegionsData] = React.useState([]);

  const fetchRegionData = async () => {
    try {
      const res = await getAllRegions();
      setRegionsData(res.data);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  React.useEffect(() => {
    fetchRegionData();
  }, []);

  const notify = () =>
    toast.success("System Country Created Successfully", {
      toastId: "form-creation",
    });

  const requestFailed = () =>
    toast.error("Something went wrong", {
      toastId: "requestFailed",
    });

  const createCountrySchema = yup.object().shape({
    name: yup.string().required("This field is required"),
    isoId: yup.string().required("This field is required"),
    regionId: yup.string().required("This field is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createCountrySchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      setShowDialog(false);
      const res = await createSystemCountry(data);
      if (res.status) {
        setLoad(false);
        notify();
      }
    } catch (err) {
      setLoad(false);
      requestFailed();
      console.log("Error: ", err.message);
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
              <Link to="/system-settings/countries-add">Add Country</Link>
            </p>

            <div>
              <DialogBox
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
              />
            </div>

        <Box sx={{ marginTop: "2%" }}>
          <p className="user-heading">Add Country</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row style={{ marginTop: "2%" }}>
              <Col md={5}>
                <label className="uploadInputLabel">
                  Name{" "}
                  {/* {errors.name?.message ? ( */}
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
                  ISO Code{" "}
                  {/* {errors.isoId?.message ? ( */}
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
                  Region{" "}
                  {/* {errors.regionId?.message ? ( */}
                    <span className="error-highlight">*</span>
                  {/* ) : (
                    <></>
                  )} */}
                </label>

                    <FormControl className="nameField">
                      <Select
                        name="regionId"
                        {...register("regionId")}
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => {
                          setValue("regionId", e.target.value, {
                            shouldValidate: true,
                          });
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

export default AddCountries;
