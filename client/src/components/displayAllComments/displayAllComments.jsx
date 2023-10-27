import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import EditCommentForm from "../../components/editCommentForm/editCommentForm";

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

function DisplayAllComments({ complaintID, comment, currentUser }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {comment.author}
            {console.log("test" + comment.description)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {comment.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {comment.createdAt}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          image="https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
          alt="text"
        />
      </Card>

      {currentUser === comment.author ? (
        <div>
          <Button onClick={handleOpen}>Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Text in a modal</h2>
              <EditCommentForm
                complaintID={complaintID}
                comment={comment}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
        </div>
      ) : (
        <div></div>
      )}
    </Grid>
  );
}

export default DisplayAllComments;
