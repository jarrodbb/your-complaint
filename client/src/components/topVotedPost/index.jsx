
import { useState, useEffect } from "react";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";



function TopVote({ complaint }) {
    console.log(complaint.votes)

  
  const commentLength = complaint.comments.length;
  console.log(commentLength);

  const [categoryStyle, setStyle] = useState("");

  const complaintCategory = complaint.category;
  console.log(complaintCategory);


  console.log(categoryStyle);

  return (

      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ bgcolor: "test.main", display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {complaint.category}
                {console.log("test" + complaint.description)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {complaint.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {complaint.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {commentLength} comments
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {complaint.createdAt}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image="https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
              alt="text"
            />
          </Card>
        </CardActionArea>
      </Grid>

  );
}

export default TopVote