import { useState, useEffect } from "react";
// import { useStoreContext } from '../../utils/GlobalState';

import { useQuery } from "@apollo/client";
import { GET_COMPLAINTS } from "../../utils/queries";

import Container from "@mui/material/Container";
import Post from "../../components/posts/Post";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
const theme = createTheme();

function LatestComplaint() {
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];

  //   useEffect(() => {
  //     if (data) {
  //       setComplaints(complaintData);
  //     } else if (!loading) {
  //       console.log("there is an error");
  //     }
  //   }, []);

  console.log(complaintData);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid item xs={12} md={6}>
            {console.log("hell" + complaintData)}
            <div className="col-12 col-md-10 my-3">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {complaintData.map((complaint) => (
                    <div key={complaint._id}>
                      <Post complaint={complaint} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default LatestComplaint;
