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
import CardActionArea from "@mui/material/CardActionArea";

// const theme = createTheme();

function DisplayTopVoted() {
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];
  console.log("test test" + complaintData);

  // Find the complaint with the highest votes using sorting
  let maxVotesComplaint = null;
  for (let i = 0; i < complaintData.length; i++) {
    if (
      !maxVotesComplaint ||
      complaintData[i].votes > maxVotesComplaint.votes
    ) {
      maxVotesComplaint = complaintData[i];
    }
  }
  console.log("maxVotesComplaint is", maxVotesComplaint);

  return (
    <CardActionArea component="a" href="">
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage:
            "url('https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg')",
        }}
      >
        {/* Render the complaint with the highest votes */}
        {maxVotesComplaint && (
          <div>
            <img
              style={{ display: "none" }}
              src={maxVotesComplaint.image}
              alt={maxVotesComplaint.imageText}
            />
            <Box
              sx={{
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.3)",
              }}
            >
              <Grid container>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      {maxVotesComplaint.title}
                    </Typography>

                    <Typography variant="h5" color="inherit" paragraph>
                      {maxVotesComplaint.description}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {maxVotesComplaint.date}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>
        )}
      </Paper>
    </CardActionArea>
  );
}

export default DisplayTopVoted;
