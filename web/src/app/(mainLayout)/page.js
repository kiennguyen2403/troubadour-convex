"use client";
import { React, use, useEffect, useState } from "react";
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
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/convex/useStoreUserEffect";


export default function Home() {
  const token = useSelector(selectToken);
  const medias = useSelector(selectMedias);
  const media = useSelector(selectCurrentMedia);
  const userID = useStoreUserEffect();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const live = useQuery(api.event.get, {});
  let custom = []
  if (userID)
    custom = useQuery(api.media.getByUserId, { userId: userID });
  else
    custom = useQuery(api.media.get, {});

  const top = useQuery(api.media.get, {});
  const recent = [];

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
        {live?.length > 0 ? (
          live.map((item, index) => (
            <Grid item xs={4}>
              <VideoButton
                image={item?.image ?? "https://picsum.photos/500?random=" + index}
                title={item.name}
                description={item.description}
                eventHandler={() => {
                  getMedia(item._id);
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
        {custom?.length > 0 ? (
          custom.map((item, index) => (
            <Grid item xs={4}>
              <AudioButton
                image={item?.image ?? "https://picsum.photos/500?random=" + index}
                title={item.title}
                artist={item.description}
                eventHandler={() => getAudio(item.fileUrl, item.title)}
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
          recent.map((item, index) => (
            <Grid item xs={4}>
              <AudioButton
                image={item?.image ?? "https://picsum.photos/500?random=" + index}
                title={item.title}
                artist={item.description}
                eventHandler={() => getAudio(item.fileUrl, item.title)}
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
        {top?.length > 0 ? (
          top.map((item, index) => (
            <Grid item xs={4}>
              <AudioButton
                image={item?.image ?? "https://picsum.photos/500?random=" + index}
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
      // Component={isLoading ? [Loading] : [LiveStream, Custom, Recent, Top]}
      Component={isLoading ? [Loading] : [LiveStream, Custom, Top]}
    />
  );
}
