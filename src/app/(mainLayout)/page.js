"use client";
import { React, useEffect, useState } from "react";
import ClippedDrawer from "../components/header";
import VideoButton from "../components/video-button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { api } from "../../api/api";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { selectToken } from "../../redux/auth-slice";
import {
  setCurrentMedia,
  setIsPlaying,
  setMedias,
  setCurrentMediaArtist,
  setCurrentMediaTitle,
} from "../../redux/media-slice";
import { selectMedias, selectCurrentMedia } from "../../redux/media-slice";
import AudioButton from "../components/audio-button";

export default function Home() {
  const token = useSelector(selectToken);
  const medias = useSelector(selectMedias);
  const media = useSelector(selectCurrentMedia);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [live, setLive] = useState([]);
  const [custom, setCustom] = useState([]);
  const [recent, setRecent] = useState([]);
  const [top, setTop] = useState([]);

  const getMedias = async () => {
    try {
      setIsLoading(true);
      const top = await axios.get(api.media.top, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + token,
        },
      });
      const recent = await axios.get(api.media.recent, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + token,
        },
      });

      const live = await axios.get(api.media.live, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + token,
        },
      });

      const custom = await axios.get(api.media.personal, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + token,
        },
      });
      setIsLoading(false);
      setCustom(custom.data);
      setTop(top.data);
      setRecent(recent.data);
      setLive(live.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getMedia = (videoID) => {
    router.push("/video/" + videoID);
  };

  const getAudio = (mediaURL, title, artist = "Unknown") => {
    try {
      dispatch(setMedias([mediaURL]));
      dispatch(setIsPlaying(true));
      dispatch(setCurrentMedia(0));
      dispatch(setCurrentMediaTitle(title));
      dispatch(setCurrentMediaArtist(artist));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMedias();
  }, []);

  const LiveStream = (
    <Box
      sx={{
        marginTop: "3%",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Live Events
      </Typography>
      <Grid container spacing={2}>
        {live.length > 0 ? (
          live.map((item) => (
            <Grid item xs={4}>
              <VideoButton
                image={item.image}
                title={item.title}
                description={item.description}
                eventHandler={() => {
                  console.log("Video:" + item.playbackId);
                  getMedia(item.playbackId);
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            marginTop="5%"
            marginBottom="5%"
          >
            No media found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Custom = (
    <Box
      sx={{
        marginTop: "5%",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Custom
      </Typography>
      <Grid container spacing={2}>
        {custom.length > 0 ? (
          custom.map((item) => (
            <Grid item xs={4}>
              <AudioButton
                image={item.image}
                title={item.title}
                artist={item.description}
                eventHandler={() => getAudio(item.url, item.title, item.artist)}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            marginTop="5%"
            marginBottom="5%"
          >
            No media found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Recent = (
    <Box
      sx={{
        marginTop: "5%",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Recent
      </Typography>
      <Grid container spacing={2}>
        {recent.length > 0 ? (
          recent.map((item) => (
            <Grid item xs={4}>
              <AudioButton
                image={item.image}
                title={item.title}
                artist={item.description}
                eventHandler={() => getAudio(item.url, item.title, item.artist)}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            marginTop="5%"
            marginBottom="5%"
          >
            No media found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Top = (
    <Box
      sx={{
        marginTop: "5%",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Top Trending
      </Typography>
      <Grid container spacing={2}>
        {top.length > 0 ? (
          top.map((item) => (
            <Grid item xs={4}>
              <AudioButton
                image={item.image}
                title={item.title}
                artist={item.description}
                eventHandler={() => getAudio(item.url, item.title, item.artist)}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            marginTop="5%"
            marginBottom="5%"
          >
            No media found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Loading = (
    <Box sx={{ width: "100%", height: "100%", marginTop: "20%" }}>
      <CircularProgress />
    </Box>
  );

  return (
    <ClippedDrawer
      Component={isLoading ? [Loading] : [LiveStream, Custom, Recent, Top]}
    />
  );
}
