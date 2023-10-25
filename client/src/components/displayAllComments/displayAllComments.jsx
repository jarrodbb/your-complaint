import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function DisplayAllComments({ comment }) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {comment.author}
            {console.log("test" + comment.description)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {comment.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {comment.createdAt}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          image="https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
          alt="text"
        />
      </Card>
    </Grid>
  );
}

export default DisplayAllComments;
