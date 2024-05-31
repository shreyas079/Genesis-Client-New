import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { Row, Col } from "react-bootstrap";

import "../pages/admin/Sponsors/Sponsors.css";

const DialogBox = ({ showDialog, cancelNavigation, confirmNavigation }) => {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "transparent",
    boxShadow: 24,
    filter: "drop-shadow(0px 1px 1.41px rgba(0, 0, 0, 0.2))",
    borderRadius: "10px",
  };

  return (
    <>
      <Modal
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "0px",
            }}
          >
            <div className="leaveSiteText">
              <Col md={12}>
                <div className="navigateText1Body">
                  Are you sure you want to leave this page?
                </div>
                <div className="navigateText2Body">
                  Changes you made may not be saved.
                </div>
                <div className="navigateTextButton">
                  <button
                    className="navigateConfirmBtn"
                    onClick={confirmNavigation}
                  >
                    Leave
                  </button>
                  <button className="navigateNoBtn" onClick={cancelNavigation}>
                    Cancel
                  </button>
                </div>
              </Col>
            </div>
          </Row>
        </Box>
      </Modal>
    </>
  );
};
export default DialogBox;
