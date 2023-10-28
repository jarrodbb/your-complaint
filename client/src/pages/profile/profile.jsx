import "./profile.css";
// import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.me || {};
  const complaints = userData.complaints || [];
  console.log("User Data is", userData);

  return (
    <section id="profile">
      <h1>Profile</h1>
      {Auth.loggedIn() ? (
        <div>
          <p> Your: User ID: {userData._id}</p>
          <h2>Complaints:</h2>
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
