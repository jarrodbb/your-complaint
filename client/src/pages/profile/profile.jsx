import "./profile.css";
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

const Profile = () => {
  // Fetch user data from the server
  const { loading, data } = useQuery(GET_ME);
  // Extract user data from the query response, or set it to an empty object if data is not available yet
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <section id="profile">
      <h1>Profile</h1>
      {Auth.loggedIn() ? (
        <p>
          User ID: {userData._id}
          <br />
          Complaint ID: {userData.complaintId}
        </p>
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
