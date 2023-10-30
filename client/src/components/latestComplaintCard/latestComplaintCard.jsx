import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AdminConditionalButton from "../adminConditionalButton/adminConditionalButton";

export default function LatestComplaintCard({ complaint, isAdmin }) {
  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";
  return (
    <Grid>
      <CardActionArea
        component="a"
        href={`/Complaint/${complaint._id}`}
        key={complaint._id}
      >
        <Card sx={{ display: "flex", width: "100%" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {complaint.title}
            </Typography>
            <Typography component="h2" variant="h5">
              {complaint.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {complaint.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {complaint.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={complaint.image || defaultImageLink}
            alt="text"
          />
        </Card>
      </CardActionArea>

      <AdminConditionalButton complaint={complaint} isAdmin={isAdmin} />
    </Grid>
    //  {isAdmin === true ? (
    //     <div>
    //       <Button onClick={handleOpen}>Admin Delete</Button>
    //       <>
    //         <Modal
    //           open={open}
    //           onClose={handleClose}
    //           aria-labelledby="parent-modal-title"
    //           aria-describedby="parent-modal-description"
    //         >
    //           <Box sx={{ ...style, width: 400 }}>
    //             <h2 id="parent-modal-title"></h2>
    //             <DeleteAdmin complaintID={complaint._id} complaintUsername={complaint.username} />
    //           </Box>
    //         </Modal>
    //       </>
    //     </div>
    //   ) : (
    //     <div></div>
    //   )}
  );
}
