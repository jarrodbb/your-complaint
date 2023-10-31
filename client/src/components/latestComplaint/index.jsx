import { useQuery } from "@apollo/client";
//import query
import { GET_COMPLAINTS } from "../../utils/queries";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
//Import component
import LatestComplaintCard from "../latestComplaintCard/latestComplaintCard";

import * as React from "react";

const theme = createTheme();

function LatestComplaint({ isAdmin }) {
  //query to get all complaints
  const { loading, data } = useQuery(GET_COMPLAINTS);
  const complaintData = data?.complaints || [];

  return (
    <Grid item xs={12} md={6}>
      {complaintData.map((complaint) => (
        <div key={complaint._id}>
          {/* pass complaint and isAdmin condition as props */}
          <LatestComplaintCard complaint={complaint} isAdmin={isAdmin} />
        </div>
      ))}
    </Grid>
  );
}
PropTypes.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestComplaint;
