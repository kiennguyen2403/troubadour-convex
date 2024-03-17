"use client";
import { React, useEffect, useState } from "react";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Box } from "@mui/material";
import SearchBar from "@/app/components/search";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import DetailModal from "./components/detail-modal";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { selectUserID } from "@/redux/auth-slice";
import ErrorPage from "next/error";
import { useUser } from "@clerk/clerk-react";
import millisecondsToDdMm from "@/utils/millisecondsToDdMm";
import {
  setCurrentMedia,
  setIsPlaying,
  selectIsPlaying,
  setMedias,
  setCurrentMediaArtist,
  setCurrentMediaTitle,
} from "@/redux/media-slice";
import { useSelector, useDispatch } from "react-redux";

export default function Playlist({ params }) {
  const id = params.id;
  const userId = useSelector(selectUserID);
  const user = useUser().user;
  const { fullName } = user ?? {};
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);

  const updateHistory = useMutation(api.history.updatePlaylistHistory);
  const playlist = useQuery(api.playlist.getById, { id });
  const assets = playlist?.medias ?? [];

  const getAudio = (media, artist = "Unknown") => {
    try {
      dispatch(setMedias([media.fileUrl]));
      dispatch(setIsPlaying(!isPlaying));
      dispatch(setCurrentMedia(media._id));
      dispatch(setCurrentMediaTitle(media.name));
      dispatch(setCurrentMediaArtist(artist));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const updatePlaylistHistory = async () => {
      if (playlist && userId) {
        await updateHistory({ userID: userId, playlist: id });
      }
    };
    updatePlaylistHistory();
  }, [playlist, userId]);

  const Information = (
    <Box sx={{ flexGrow: 1, marginLeft: "2rem" }}>
      <Grid container>
        <Grid item xs={2} sx={{ minWidth: "10rem" }}>
          <Avatar
            alt={playlist?.name ?? "Name"}
            src={"url"}
            sx={{ width: "10rem", height: "10rem" }}
          />
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
            {playlist?.name}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            textAlign="left"
            marginLeft="2rem"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {playlist?.privacy == "public" ? (
              <>
                <PublicIcon /> Public
              </>
            ) : playlist?.privacy == "private" ? (
              <>
                <LockIcon /> Private
              </>
            ) : (
              <></>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const Divide = <Divider style={{ marginTop: "2%" }} />;

  const Assets = (
    <Box sx={{ flexGrow: 1 }}>
      {assets.length > 0 ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">#</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Date added</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                  onClick={() => getAudio(item, fullName)}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <CardMedia
                          component="img"
                          height={50}
                          width={50}
                          image={
                            item.imageUrl
                              ? item.imageUrl
                              : "https://mui.com/static/images/cards/contemplative-reptile.jpg"
                          }
                          alt="green iguana"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          textAlign="left"
                          marginLeft="2%"
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="caption" gutterBottom textAlign="left" marginLeft="2%">
                          {fullName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="left">{millisecondsToDdMm(item._creationTime)}</TableCell>
                  <TableCell>
                    <PlayArrowIcon style={{ background: "#73726f", borderRadius: 12 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" gutterBottom textAlign="start" marginTop="5%" marginBottom="5%">
          No assets in this playlist
        </Typography>
      )}
    </Box>
  );

  const Adds = (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom textAlign="start" marginTop="2%" marginBottom="2%">
        Let's find something for your playlist
      </Typography>
      {/* <SearchBar setValue={setSearch} value={search} /> */}
      {/* {searchAssets.length > 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.pater" }}>
          {searchAssets.map((item) => (
            <ListItemButton>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.artist ? item.artist : "N/A"} />
                <Button variant="contained" color="primary" onClick={() => handleAddAsset(item)}>
                  Add
                </Button>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      ) : null} */}
    </Box>
  );

  return playlist === null ? (
    <ErrorPage statusCode={404} />
  ) : (
    <ClippedDrawer Component={[Information, Divide, Assets, Divide]} />
  );
}
