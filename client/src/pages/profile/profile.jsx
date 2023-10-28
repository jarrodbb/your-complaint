import "./profile.css";
// import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import EditUserDetails from "../../components/editUserDetails/editUserDetails";

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

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
const Profile = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.me || {};
  const complaints = userData.complaints || [];
  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";

  return (
    <section id="profile">
      <h1>Profile</h1>
      {Auth.loggedIn() ? (
        <div>
          <Typography variant="body1">
            Your User ID: <strong>{userData._id}</strong>
          </Typography>
          <Button onClick={handleOpen}>Update Profile</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Text in a modal</h2>
              <EditUserDetails
                userID={userData._id}
                username={userData.username}
                email={userData.email}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
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
      ) : (
        <p>
          You need to be logged in to view your profile. Please{" "}
          <Link to="/SignIn">login</Link> or <Link to="/SignUp">signup.</Link>
        </p>
      )}
    </section>
  );
};

export default Profile;