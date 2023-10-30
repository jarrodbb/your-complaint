import "./Homepage.css";
import React, { useState } from "react";
import ComplaintForm from "../../components/complaintForm/complaintForm";

// import {complainCategories} from "../../components/utils/";
// import MainFeaturedPost from "../../components/FeaturedPost/FeaturedPost";
// import Post from "../../components/posts/Post";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LatestComplaint from "../../components/latestComplaint";
import DisplayTopVoted from "../../components/DisplayTopVoted";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_COMPLAINT } from "../../utils/actions";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebars/sidebar";
import { useEffect } from "react";
const theme = createTheme();

const sections = [
  { title: "General", url: "/category/General" },
  { title: "Food", url: "/category/Food" },
  { title: "Work", url: "/category/Work" },
  { title: "Finance", url: "/category/Finance" },
  { title: "Life", url: "/category/Life" },
  { title: "Health", url: "/category/Health" },
  { title: "Technology", url: "/category/Technology" },
  { title: "Random", url: "/category/Random" },
];

const sidebar = {
  title: "About",
  description: "Complaining is a way of life",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Homepage() {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (Auth.loggedIn()) {
      const userInfo = Auth.getProfile().data.isModerator;
      console.log(userInfo);
      setIsAdmin(userInfo);
    } else {
      setIsAdmin(false);
    }
  }, []);

  console.log(isAdmin);

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
      <Container style={{paddingTop: "90px"}} maxWidth="lg">
        <Header title="" sections={sections} />
        <DisplayTopVoted />
        <LatestComplaint isAdmin={isAdmin} />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={10}
          sx={{ mt: 10, height: "100vh" }}
        >
          <Grid item xs={12} md={6}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

//   return (

//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Container maxWidth="lg">
//         <div>
//           <DisplayTopVoted />
//           <LatestComplaint />
//           <button onClick={openModal} className="make-complaint-button">
//           Make a Complaint
//           </button>
//           {isModalOpen && <ComplaintForm closeModal={closeModal} />}
//         </div>
//              <Grid container spacing={5} sx={{ mt: 3 }}>
//             <Sidebar
//               title={sidebar.title}
//               description={sidebar.description}
//               archives={sidebar.archives}
//               social={sidebar.social}
//             />
//           </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }
