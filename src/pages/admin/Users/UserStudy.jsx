import React from "react";

import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Menu from "@mui/material/Menu";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";

import BeatLoader from "react-spinners/BeatLoader";

import { ToastContainer, toast } from "react-toastify";

import {
  getStudyRoles,
  getStudyRoleById,
  assignStudyRoles,
} from "../../../services/study_roles";

import { Container, Row, Col } from "react-bootstrap";

import jeep from "../../../assets/sponsors/jeep.png";
import arrowDown from "../../../assets/svgs/arrow_down.svg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  width: "80%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicCard({ siteName }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Site
        </Typography>
        <Typography color="text.secondary">{siteName}</Typography>
      </CardContent>
    </Card>
  );
}

const UserStudy = ({ study, key1, roleUserId }) => {
  const [load, setLoad] = React.useState(true);
  const [studyRoles, setStudyRoles] = React.useState([]);

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [roleBtnDisabled, setRoleBtnDisabled] = React.useState(true);
  const [assignStudyData, setAssignStudyData] = React.useState({});

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const open1 = Boolean(anchorEl1);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const fetchStudyRoles = async () => {
    try {
      setLoad(true);
      const res = await getStudyRoles();
      setStudyRoles(res.data);

      if (res.status === 200) {
        setLoad(false);
      }
    } catch (err) {
      setLoad(false);
      console.log("Error: ", err.message);
    }
  };

  const roleIdRequired = () =>
    toast.warn("Role id is not found", {
      // theme: "colored",
      toastId: "roleIdRequired",
    });

  const roleAssigned = () =>
    toast.success("Role assigned successfully", {
      // theme: "colored",
      toastId: "roleAssigned",
    });

  const roleAlreadyAssigned = () =>
    toast.warn("Study role is already assigned", {
      // theme: "colored",
      toastId: "roleAssigned",
    });

  const studyIdNotFound = () =>
    toast.warn("Study id not found", {
      // theme: "colored",
      toastId: "studyIdRequired",
    });

  const userIdNotFound = () =>
    toast.warn("User id not found", {
      // theme: "colored",
      toastId: "userIdRequired",
    });

  React.useEffect(() => {
    setLoad(true);

    fetchStudyRoles();
  }, []);

  React.useEffect(() => {}, [studyRoles]);

  const handleRole1Click = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleRole1Close = () => {
    setAnchorEl1(null);
  };

  const handleRoleId = async (item, studyId, roleUserId, key2) => {
    setSelectedIndex(key2);
    if (!item) {
      roleIdRequired();
    } else if (!studyId) {
      studyIdNotFound();
    } else if (!roleUserId) {
      userIdNotFound();
    } else {
      const data = {
        studyRoleId: item,
        studiesId: studyId,
        userId: roleUserId,
      };

      setAssignStudyData(data);
      setRoleBtnDisabled(false);
    }
  };

  const handleAssignRole = async (assignStudyData) => {
    setAnchorEl1(null);
    const filterId = assignStudyData.studyRoleId;
    setLoad(true);
    try {
      const res = await assignStudyRoles(assignStudyData);
      if (res.status === 200) {
        setLoad(false);
        let filterRoles = studyRoles.filter((item) => item.id !== filterId);
        setStudyRoles(filterRoles);
        roleAssigned();
      }
    } catch (err) {
      setLoad(false);
      roleAlreadyAssigned();
      console.log("Error: ", err);
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
        <div className="sponsorBodyUser">
          <div className="sponsorBodyUser" key={study.id}>
            <img src={jeep} className="sponsorImageUser" />
            <div className="userTextContainer">
              <p className="sponsorSubUser">{study?.name}</p>
              <p className="sponsorSubUser" onClick={handleRole1Click}>
                Role & Sites{" "}
                <img className="admin-arrow" src={arrowDown} alt="Arrow Down" />
              </p>
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  ></Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl1}
                open={open1}
                onClose={handleRole1Close}
                transformOrigin={{
                  horizontal: "350px",
                  vertical: "top",
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div className="dropdown-body">
                  <div className="dropdown-head">
                    <Row
                      className="d-flex justify-content-center align-items-center"
                      style={{ padding: "5%" }}
                    ></Row>
                  </div>
                  <div className="dropdown-content">
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Roles and Site
                      </FormLabel>

                      <Button
                        variant="outlined"
                        disabled={roleBtnDisabled}
                        onClick={() => handleAssignRole(assignStudyData)}
                      >
                        Save
                      </Button>

                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        {studyRoles.map((role, key2) => (
                          <>
                            <FormControlLabel
                              key={role.id}
                              value={role.id}
                              studyId={study.id}
                              control={<Radio />}
                              label={role.description}
                              onChange={(event) =>
                                handleRoleId(
                                  role.id,
                                  study.id,
                                  roleUserId,
                                  key2
                                )
                              }
                            />
                            {selectedIndex === key2 && (
                              <BasicCard siteName={role.site} />
                            )}
                          </>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </Menu>
              {/* <div>
                {studyRoles.map((role, key2) => (
                  <Button
                    onClick={() => {
                      setModalData(role);
                      setModalOpen(true);
                    }}
                  >
                    Open Modal
                  </Button>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserStudy;
