"use client";
import { React, useEffect, useState } from "react";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
import { useRouter } from "next/navigation";
// import { api } from "../../api/api";
import { Grid, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { Box } from "@mui/material";
import SearchBar from "@/app/components/search";
import GenreButton from "@/app/components/genre-button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TopResultButton from "@/app/components/top-result-button";
import { selectToken } from "@/redux/auth-slice";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArtistButton from "@/app/components/artist-button";
import {
  setCurrentMedia,
  setIsPlaying,
  setMedias,
  setCurrentMediaArtist,
  setCurrentMediaTitle,
} from "@/redux/media-slice";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Search() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //   const [songs, setSongs] = useState([]);
  //   const [videos, setVideos] = useState([]);
  //   const [albums, setAlbums] = useState([]);
  //   const [artist, setArtists] = useState([]);
  const [resultDisplay, setResultDisplay] = useState(null);
  const [topResult, setTopResult] = useState(null);

  const genres = useQuery(api.genre.get, {});
  const medias = useQuery(api.media.getByName, { name: searchValue });
  const artists = useQuery(api.user.getByName, { name: searchValue });

  useEffect(() => {
    if (searchValue === null || searchValue === "") {
      setResultDisplay(BrowseAll);
      return;
    }

    getSearch();
  }, [searchValue, genres, medias, artists]);

  const getSearch = async () => {
    console.log(medias);
    console.log(artists);
    try {
      if (!medias && !artists) {
        setResultDisplay(Loading);
        return;
      }
      //   setSongs(medias);
      //   setArtists(artists);
      if (artists && artists.length > 0) {
        setTopResult({
          title: artists[0].name,
          //   image: artist[0].profilePicture,
          type: "Artist",
        });
        setResultDisplay(Result);
        return;
      }
      if (medias && medias.length > 0) {
        setTopResult({
          title: medias[0].name,
          //   artist: songs[0].artist,
          type: "Song",
        });
        setResultDisplay(Result);
        return;
      }
      setResultDisplay(NoResult);
      return;
    } catch (error) {
      console.log(error);
      setResultDisplay(NoResult);
      setIsLoading(false);
    }
  };

  const generateColor = (index, totalCards) => {
    const hue = (index / totalCards) * 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getMedia = async (videoID) => {
    router.push("/media", videoID);
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

  const NoResult = (
    <Box sx={{ width: "100%", marginBottom: "3%" }}>
      <Typography variant="h6" textAlign="start">
        No Result
      </Typography>
    </Box>
  );

  //   const NowPlaying = (
  //     <Box sx={{ width: "100%", marginBottom: "3%" }}>
  //       <Typography variant="h6" textAlign="start">
  //         Now Playing
  //       </Typography>
  //       <Grid container spacing={5} sx={{ marginTop: "3%" }}>
  //         {videos.map((video, index) => {
  //           return (
  //             <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
  //               <VideoButton
  //                 title={video.title}
  //                 eventHandler={() => {
  //                   getMedia(video.videoID);
  //                 }}
  //                 color={generateColor(index, videos.length)}
  //               />
  //             </Grid>
  //           );
  //         })}
  //       </Grid>
  //     </Box>
  //   );

  const BrowseAll = genres ? (
    <Box sx={{ width: "100%", marginBottom: "3%" }}>
      <Typography variant="h6" textAlign="start">
        Browse All
      </Typography>
      <Grid container spacing={5} sx={{ marginTop: "3%" }}>
        {genres.map(({ name }, index) => {
          return (
            <Grid key={index} item xs={6} sm={4} md={4} lg={2} xl={2}>
              <GenreButton
                title={name}
                eventHandler={() => {}}
                color={generateColor(index, genres.length)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  ) : (
    <></>
  );

  const Loading = (
    <Box sx={{ width: "100%", height: "100%", marginTop: "20%" }}>
      <CircularProgress />
    </Box>
  );

  const Result =
    medias && artists ? (
      <Box sx={{ width: "100%", height: "100%", marginBottom: "3%" }}>
        <Grid container spacing={5} sx={{ marginTop: "3%" }}>
          <Grid item xs={6}>
            <Box sx={{ width: "100%", marginBottom: "3%", borderRadius: "12px" }}>
              <Typography variant="h6" textAlign="start">
                Top Result
              </Typography>
              {topResult ? (
                <TopResultButton
                  title={topResult.title}
                  subtitle={topResult.type}
                  eventHandler={() => {}}
                />
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: "100%", marginBottom: "3%", borderRadius: "12px" }}>
              <Typography variant="h6" textAlign="start">
                Songs
              </Typography>
              <List>
                {medias.map((item) => (
                  <ListItemButton
                    style={{ background: "#292929" }}
                    onClick={() => getAudio(item.fileUrl, item.title)}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.artist ? item.artist : "N/A"}
                      />
                      <ListItemIcon>
                        <PlayArrowIcon style={{ background: "#73726f", borderRadius: 12 }} />
                      </ListItemIcon>
                    </ListItem>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%", marginBottom: "3%" }}>
              <Typography variant="h6" textAlign="start">
                Artists
              </Typography>
              <Box sx={{ borderRadius: "12px" }}>
                {artists.map((item) => (
                  <ArtistButton
                    title={item.name}
                    eventHandler={() => {}}
                    image={item.profilePicture}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={12} >
                    <Box sx={{ width: "100%", marginBottom: "3%", }}>
                        <Typography variant="h6" textAlign="start">
                            Albums
                        </Typography>
                        <Box sx={{ borderRadius: "12px", }}>
                            {
                                artist.map((item) =>
                                    <ArtistButton title={item.accountname} eventHandler={() => { }} image={item.profilePicture} />
                                )}
                        </Box>

                    </Box>
                </Grid> */}
          <Grid item xs={12}>
            <Box sx={{ width: "100%", marginBottom: "3%" }}>
              <Typography variant="h6" textAlign="start">
                Now Playing
              </Typography>
              <Box sx={{ borderRadius: "12px" }}>
                {artists.map((item) => (
                  <VideoButton title={item.name} />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    ) : (
      <></>
    );

  const Search = (
    <Box sx={{ width: "100%", marginBottom: "3%" }}>
      <SearchBar setValue={setSearchValue} value={searchValue} />
    </Box>
  );

  return <ClippedDrawer Component={[Search, isLoading ? Loading : resultDisplay]} />;
}
