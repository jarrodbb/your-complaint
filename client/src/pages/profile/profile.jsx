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
  console.log("username" + userData.username);
  console.log("User Data is", userData);

  return (
    <section id="profile">
      <h1>Profile</h1>
      {Auth.loggedIn() ? (
        <div>
          <p> Your: User ID: {userData._id}</p>
          <h2>Complaints:</h2>
          <div>
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
          </div>
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id}>
                <strong>Title:</strong> {complaint.title}
                <br />
                Description: {complaint.description}
                <br />
                Category: {complaint.category}
                <hr />
              </li>
            ))}
          </ul>
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
