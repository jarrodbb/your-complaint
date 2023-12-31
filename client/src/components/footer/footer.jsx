//import css for footer
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import icons
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";



//Copyright details for footer
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Complain.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//create theme from MUI
const defaultTheme = createTheme();

//footer
export default function FooterBottom() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              Made by Brian Trang, Jarrod Blanning and Kalid Nadere
            </Typography>
            <div className="social-icons">
              <a href="https://github.com/MakeRedundant">
                <FontAwesomeIcon icon={faGithub} size="2x" className="icon" />
              </a>
              <a href="https://www.linkedin.com/in/brian-t-webdeveloper/">
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="icon" />
              </a>
              <a href="https://twitter.com/fireship_dev">
                <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
              </a>
            </div>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}