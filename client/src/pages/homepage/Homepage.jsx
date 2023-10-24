import "./Homepage.css";
import React, { useState } from "react";
import ComplaintForm from "../../components/complaintForm/complaintForm";

// import {complainCategories} from "../../components/utils/";
// import MainFeaturedPost from "../../components/FeaturedPost/FeaturedPost";
// import Post from "../../components/posts/Post";

// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LatestComplaintList from "../../components/latestComplaint";
import DisplayTopVoted from "../../components/DisplayTopVoted";
const theme = createTheme();

export default function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <LatestComplaintList />
      <DisplayTopVoted />
      <button onClick={openModal} className="make-complaint-button">
          Make a Complaint
      </button>
      {isModalOpen && <ComplaintForm closeModal={closeModal} />}
    </div>
  );
}