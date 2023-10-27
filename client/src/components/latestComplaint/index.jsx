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
import { useStoreContext } from "../../utils/GlobalState";


const theme = createTheme();

function LatestComplaint() {
  const [state, dispatch] = useStoreContext();

  const {complaints} = state

  console.log(complaints)
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];

  //   useEffect(() => {
  //     if (data) {
  //       setComplaints(complaintData);
  //     } else if (!loading) {
  //       console.log("there is an error");
  //     }
  //   }, []);

  console.log(complaintData);

  return (
    <Grid item xs={12} md={6}>
      {complaintData.map(complaint => (
        <CardActionArea component="a" href={`/Complaint/${complaint._id}`} key={complaint._id}>
          <Card sx={{ display: "flex", width: "100%" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {complaint.title}
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
              image="https://source.unsplash.com/random?wallpapers"
              alt="text"
            />
          </Card>
        </CardActionArea>
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
    title: PropTypes.string.isRequired
  }).isRequired
};

export default LatestComplaint;
