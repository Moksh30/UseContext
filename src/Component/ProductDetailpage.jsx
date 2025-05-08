import Modal from "@mui/material/Modal";
import * as React from "react";
import Box from "@mui/material/Box";

function BasicModal(props) {
  console.log("props", props);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  if (!props?.isOpen) return null;
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props?.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
