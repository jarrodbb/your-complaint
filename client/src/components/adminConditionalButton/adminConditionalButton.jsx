import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteAdmin from "../adminDelete/adminDelete";
import * as React from "react";
import Button from "@mui/material/Button";

import "./adminButton.css"

//modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AdminConditionalButton({ complaint, isAdmin }) {
  //State of Modal
  const [open, setOpen] = React.useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isAdmin === true ? (
        <div>
          <Button className={"delete-display"} onClick={handleOpen}>Admin Delete</Button>
          <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
             {/* complaintID and username passed as props to modal */}
                <DeleteAdmin
                  complaintID={complaint._id}
                  complaintUsername={complaint.username}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
          </>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
