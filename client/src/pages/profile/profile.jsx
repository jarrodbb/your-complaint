import "./profile.css";
// import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.me || {};
  const complaints = userData.complaints || [];
  console.log("User Data is", userData); //Should return the object with id username and stuff

  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";

  return (
    <section id="profile">
      <Typography variant="h1">Profile</Typography>
      {Auth.loggedIn() ? (
        <div>
          <Typography variant="body1">
            Your User ID: <strong>{userData._id}</strong>
          </Typography>
          <Typography variant="h2"> Your Complaints:</Typography>
          {complaints.map((complaint) => (
            <CardActionArea
              component={Link}
              to={`/Complaint/${complaint._id}`}
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
                  sx={{
                    width: 160,
                    display: { xs: "none", sm: "block" },
                  }}
                  image={complaint.image || defaultImageLink}
                  alt="text"
                />
              </Card>
            </CardActionArea>
          ))}
        </div>
      ) : ( //Conditional statement if user is not logged in will render this
        <Typography variant="body1">
          You need to be logged in to view your profile. Please{" "}
          <Link to="/SignIn">login</Link> or <Link to="/SignUp">signup.</Link>
        </Typography>
      )}
    </section>
  );
};

export default Profile;
