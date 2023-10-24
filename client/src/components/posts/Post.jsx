import "./Post.css";
import { useState, useEffect } from "react";
import * as React from "react";
// import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import {
//   createTheme,
//   ThemeProvider,
//   alpha,
//   getContrastRatio,
// } from "@mui/material/styles";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

function Post({ complaint }) {

  const commentLength = complaint.comments.length;
  console.log(commentLength);

  const [categoryStyle, setStyle] = useState("");

  const complaintCategory = complaint.category;
  console.log(complaintCategory);

  useEffect(() => {
    if (complaintCategory) {
      switch (complaintCategory) {
      case "General":
        setStyle("#ffb8b0");
        break;
      case "Food":
        setStyle("#fdffba");
        break;
      case "Traffic":
        setStyle("#b7ffff");
        break;
      case "Work":
        setStyle("#ffd6c5");
        break;
      case "Finance":
        setStyle("#ffffca");
        break;
      case "Life":
        setStyle("#ffcdf8");
        break;
      case "Health":
        setStyle("#ceebff");
        break;
      case "Technology":
        setStyle("#c4ffd4");
        break;
      case "Random":
        setStyle("#c9c4ff");
        break;
      default:
        alert("I don't know such values");
        return;
      }
    }
  }, []);

  console.log(categoryStyle);

  // const backgroundColorMain = alpha(categoryStyle, 0.7);
  // const theme = createTheme({
  //   pallette: {
  //     test: {
  //       main: backgroundColorMain,
  //       light: alpha(categoryStyle, 0.5),
  //       dark: alpha(categoryStyle, 0.9),
  //       contrastText:
  //         getContrastRatio(backgroundColorMain, "#fff") > 4.5 ? "#fff" : "#111",
  //     },
  //   },
  // });
  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={`/Complaint/${complaint._id}`}>
        <Card sx={{ display: "flex" }}>
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
              {commentLength} Comments
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

// HigherOrderComponent.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// Post.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default Post;

// const backgroundColorMain = alpha(categoryStyle, 0.7);
// const theme = createTheme({
//   pallette: {
//     test: {
//       main: backgroundColorMain,
//       light: alpha(categoryStyle, 0.5),
//       dark: alpha(categoryStyle, 0.9),
//       contrastText:
//         getContrastRatio(backgroundColorMain, "#fff") > 4.5 ? "#fff" : "#111",
//     },
//   },
// });