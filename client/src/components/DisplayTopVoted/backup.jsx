import { useState, useEffect } from "react";
// import { useStoreContext } from '../../utils/GlobalState';

import { useQuery } from "@apollo/client";
import { GET_COMPLAINTS } from "../../utils/queries";

import Container from "@mui/material/Container";

import TopVote from "../../components/topVotedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const theme = createTheme();

function DisplayTopVoted() {
  const [allComplaints, setComplaints] = useState([]);

  const { loading, data } = useQuery(GET_COMPLAINTS);
  console.log(data);
  const complaintData = data?.complaints || [];

  //   function sortedComplaints() {
  //    const test =  complaintData.sort(function (a, b) {
  //         return a.votes - b.votes
  //     })
  // console.log(test)
  //   }




  //     useEffect(() => {
  //       if (data) {
  //         sortedComplaints()
  //       } else if (!loading) {
  //         console.log("there is an error");
  //       }
  //     }, []);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Grid container spacing={4}>
              <h1>Top Voted</h1>
              {console.log("hell" + complaintData)}
              <div className="col-12 col-md-10 my-3">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    {complaintData.map((complaint) => (
                      <div key={complaint._id}>
                        <TopVote complaint={complaint} />
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


export default DisplayTopVoted;
