import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
//import categories from utils
import { GET_COMPLAINTS_BY_CATEGORY } from "../../utils/queries";

const CategoryPage = () => {
  const { categoryName } = useParams();
 
  //Query to get complaint by category
  const { loading, error, data } = useQuery(GET_COMPLAINTS_BY_CATEGORY, {
    variables: { category: categoryName },
  });
  //if loading display loading
  if (loading) {
    return <p>Loading...</p>;
  }
  //if error display error
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const complaints = data?.complaintsByCategory || [];

  //if complaint in category display
  if (complaints.length > 0) {
    return (
      <Grid item xs={12} md={6}>
        <h2>Complaints in {categoryName}</h2>
        {complaints.map((complaint) => (
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
  } else {
    // display message if no complaints in that category
    return <p>No complaints found in this category.</p>;
  }
};

PropTypes.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryPage;
