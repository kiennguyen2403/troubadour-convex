import { Box, Grid, Avatar, Typography } from "@mui/material";

export default function ChannelInformation({ fullName, imageUrl, medias, playlists }) {
  return (
    <Box sx={{ flexGrow: 1, marginLeft: "2rem" }}>
      <Grid container>
        <Grid item xs={2} sx={{ minWidth: "10rem" }}>
          <Avatar alt={fullName} src={imageUrl} sx={{ width: "10rem", height: "10rem" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            textAlign="left"
            marginLeft="2rem"
            marginTop="2rem"
          >
            {fullName}
          </Typography>
          <Typography variant="body2" gutterBottom textAlign="left" marginLeft="2rem">
            {medias?.length} videos ‧ {playlists?.length} playlists
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
