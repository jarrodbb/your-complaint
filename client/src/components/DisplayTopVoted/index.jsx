import { useState, useEffect } from "react";
// import { useStoreContext } from '../../utils/GlobalState';

import { useQuery } from "@apollo/client";
import { GET_COMPLAINTS } from "../../utils/queries";

import Container from "@mui/material/Container";

import TopVote from "../../components/topVotedPost";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// const theme = createTheme();

function DisplayTopVoted() {
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg')`
      }}
    >
      {/* Increase the priority of the hero background image */}
      {complaintData.map(complaint => (
        <div key={complaint._id}>
          <img
            style={{ display: "none" }}
            src={complaint.image}
            alt={complaint.imageText}
          />
          <Box
            sx={{
              // position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)"
            }}
          >
            <Grid container>
              <Grid item md={6}>
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 }
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {complaint.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {complaint.description}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {complaint.date}
                  </Typography>
                  <Link variant="subtitle1" href={complaint.linkText}>
                    {complaint.linkText}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      ))}
    </Paper>
  );
}

export default DisplayTopVoted;
