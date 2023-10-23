import "./Homepage.css";
import React, { useState } from "react";
import ComplaintForm from "../../components/complaintForm/complaintForm";

// import {complainCategories} from "../../components/utils/";
import MainFeaturedPost from "../../components/FeaturedPost/FeaturedPost";
import Post from "../../components/posts/Post";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Homepage() {
  const mainFeaturedPost = {
    title: "Maccas gave me 9 nuggets instead of 10!!!",
    date: "9th September 1999",
    description:
    "Brave heroic Karen strikes down evil minimum wage maccas workers",
    image:
    "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg",
    imageText: "My Mug shot",
    imageLabel: "Mugshot",
    linkText: "Continue reading…"
  };

  const featuredPost = [
    {
      title: "Small complaint",
      date: "NOW",
      description:
      "This is a complaint",
      image:
      "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg",
      imageLabel: "Image Text"
    },
    {
      title: "I complain",
      date: "NOW",
      description:
      "This is a complaint",
      image:
      "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg",
      imageLabel: "Image Text"
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPost.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </Grid>
        </main>
        <button onClick={openModal} className="make-complaint-button">
          Make a Complaint
        </button>
        {isModalOpen && <ComplaintForm closeModal={closeModal} />}
      </Container>
    </ThemeProvider>
  );
}