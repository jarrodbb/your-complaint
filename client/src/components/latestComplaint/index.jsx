import { useState, useEffect } from "react";
// import { useStoreContext } from '../../utils/GlobalState';

import { useQuery } from "@apollo/client";
import { GET_COMPLAINTS } from "../../utils/queries";

import Container from "@mui/material/Container";
import Post from "../../components/posts/Post";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useStoreContext } from "../../utils/GlobalState";
import Modal from "@mui/material/Modal";
import LatestComplaintCard from "../latestComplaintCard/latestComplaintCard";

import * as React from "react";
import Box from "@mui/material/Box";
import DeleteAdmin from "../adminDelete/adminDelete";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };

const theme = createTheme();

function LatestComplaint({ isAdmin }) {
  const [open, setOpen] = React.useState(false);
  console.log("is this person admin " + isAdmin);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [state, dispatch] = useStoreContext();

  const { complaints } = state;

  console.log(complaints);
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];

  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";

  const handleDelete = async (e) => {
    console.log;
  };

  return (
    <Grid item xs={12} md={6}>
      {complaintData.map((complaint) => (
        <div key={complaint._id}>
          <LatestComplaintCard complaint={complaint} isAdmin={isAdmin}/>

          {/* {isAdmin === true ? (
            <div>
              <Button onClick={handleOpen}>Admin Delete</Button>
              <>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title"></h2>
                    <DeleteAdmin complaintID={complaint._id} complaintUsername={complaint.username} />
                  </Box>
                </Modal>
              </>
            </div>
          ) : (
            <div></div>
          )} */}
        </div>
      ))}
    </Grid>
  );
}
PropTypes.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestComplaint;

// return (
//   {isAdmin ? (
//     <div>
//       <Button onClick={handleOpen}>Confirm</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, width: 400 }}>
//           <h2 id="parent-modal-title"></h2>
//         </Box>
//       </Modal>
//     </div>
//   ) : (
//     <div></div>
//   )}
// )
