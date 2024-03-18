"use client";
import { React, useState, useEffect } from "react";
import axios from "axios";
import ClippedDrawer from "@/app/components/header";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Box } from "@mui/material";
import VideoButton from "@/app/components/video-button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { selectUserID } from "@/redux/auth-slice";
import {
  setMedias,
  setIsPlaying,
  setCurrentMedia,
  setCurrentMediaTitle,
  selectCurrentMediaArtist,
  selectCurrentMedia,
  selectIsPlaying,
  selectCurrentMediaTitle,
  setCurrentMediaArtist,
} from "@/redux/media-slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useUser } from "@clerk/clerk-react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";

export default function History(props) {
  const router = useRouter();
  const userId = useSelector(selectUserID) ?? "";
  const user = useUser().user;
  const { fullName, imageUrl } = user ?? {};
  const tickets = useQuery(api.ticket.getByUser, { userId }) ?? [];
  const recentHistory =
    useQuery(api.history.getByUserID, { userID: userId }) ?? [];
  const playlists = recentHistory.recentPlaylist;
  const events = recentHistory.recentEvents;
  const medias = recentHistory.recentMedias;
  const dispatch = useDispatch();
  const media = useSelector(selectCurrentMedia);
  const isPlaying = useSelector(selectIsPlaying);
  const title = useSelector(selectCurrentMediaTitle);
  const artist = useSelector(selectCurrentMediaArtist);

  const handleItemClick = (media, mediaURL, title, artist = "Unknown") => {
    try {
      dispatch(setMedias([mediaURL]));
      dispatch(setIsPlaying(!isPlaying));
      dispatch(setCurrentMedia(media._id));
      dispatch(setCurrentMediaTitle(title));
      dispatch(setCurrentMediaArtist(artist));
    } catch (err) {
      console.log(err);
    }
  };

  const Playlist = (
    <Box sx={{ marginTop: "3%" }}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Recently Playlists
      </Typography>
      <Grid container spacing={2}>
        {playlists?.length > 0 ? (
          playlists.map((item) => (
            <Grid item xs={4}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    router.push("/playlist/" + item._id);
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        <SubscriptionsIcon sx={{ marginRight: 2 }} />{" "}
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.privacy}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            gutterBottom
            marginTop="5%"
            marginBottom="5%"
          >
            No recently watched videos
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Events = (
    <Box sx={{ marginTop: "1%" }}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Rcently Watched Events
      </Typography>
      <Grid container spacing={2}>
        {events?.length > 0 ? (
          events.map((item) => (
            <Grid item xs={4}>
              <VideoButton
                image={item.image}
                title={item.name}
                description={item.description}
                eventHandler={(videoID) => {
                  router.push("/video/" + item._id);
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            gutterBottom
            marginTop="5%"
            marginBottom="5%"
          >
            No playlists found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Medias = (
    <Box sx={{ marginTop: "3%" }}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Recent Medias
      </Typography>
      {medias?.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {medias.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() =>
                handleItemClick(item, item.fileUrl, item.name, fullName)
              }
            >
              {/* You can adjust the ListItemText props according to your item properties */}
              <ListItemText primary={item.name} secondary={item.description} />
              <IconButton
                edge="end"
                aria-label="arrow"
                onClick={() =>
                  handleItemClick(item, item.fileUrl, item.name, fullName)
                }
              >
                <PlayCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          textAlign="center"
          width="100%"
          gutterBottom
          marginTop="5%"
          marginBottom="5%"
        >
          No playlists found
        </Typography>
      )}
    </Box>
  );
  return <ClippedDrawer Component={[Events, Playlist, Medias]} />;
}
