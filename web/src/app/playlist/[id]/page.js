"use client";
import { React, useEffect, useState } from "react";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { api } from "../../api/api";
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
import DetailModal from "./components/detail-modal";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/auth-slice";

export default function Playlist({ params }) {
  const id = params.id;
  const router = useRouter();
  const [title, setTitle] = useState("Default Title");
  const [description, setDescription] = useState("Default Description");
  const [image, setImage] = useState(
    "https://mui.com/static/images/cards/contemplative-reptile.jpg"
  );
  const [assets, setAssets] = useState([]);
  const user = useSelector(selectUserID);
  const [searchAssets, setSearchAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const updateHistory = useMutation(api.history.updatePlaylistHistory);

  const getPlayList = async () => {
    try {
      await updateHistory({ userID: user, playlist: id });
      // const result = await axios.get(api.media);
      if (result.data) {
        setTitle(result.data.title);
        setDescription(result.data.description);
        setImage(result.data.image);
        setAssets(result.data.assets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = async () => {
    // const medias = await axios.get(api.media.search, {
    //     params: {
    //         query: search
    //     },
    //     withCredentials: true,
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": true,
    //         // Authorization: "Bearer " + token,
    //     }
    // });
    setSearchAssets(medias.data);
  };

  const handleUpdatePlaylist = async () => {
    try {
      // const result = await axios.put(api.media, {
      //     title: title,
      //     description: description,
      //     image: image,
      //     assets: assets
      // });
      // if (result.data) {
      //     console.log(result.data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAsset = async (item) => {
    setAssets([...assets, item]);
  };

  useEffect(() => {
    getPlayList();
  }, []);

  useEffect(() => {
    if (search === null || search === "") {
      return;
    }
    getSearch();
  }, [search]);

  const Information = (
    <Box sx={{ flexGrow: 1, opacity: "0.5" }}>
      <Grid container>
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: "10rem", height: "10rem" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            textAlign="left"
            marginLeft="2%"
            marginTop="8%"
            onClick={() => {
              setIsEditOpen(true);
              console.log("hello");
            }}
          >
            Title
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            textAlign="left"
            marginLeft="2%"
            onClick={() => {
              setIsEditOpen(true);
            }}
          >
            Description
          </Typography>
        </Grid>
      </Grid>
      <DetailModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={title}
        description={description}
        image={image}
      />
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
                <TableCell align="left">Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                  onClick={() => {}}
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
                            item.image
                              ? item.image
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
                          {item.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          gutterBottom
                          textAlign="left"
                          marginLeft="2%"
                        >
                          {item.artist ? item.artist : "N/A"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="left">{item.date}</TableCell>
                  <TableCell align="left">{item.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h6"
          gutterBottom
          textAlign="start"
          marginTop="5%"
          marginBottom="5%"
        >
          No assets in this playlist
        </Typography>
      )}
    </Box>
  );

  const Adds = (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        gutterBottom
        textAlign="start"
        marginTop="2%"
        marginBottom="2%"
      >
        Let's find something for your playlist
      </Typography>
      <SearchBar setValue={setSearch} value={search} />
      {searchAssets.length > 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.pater" }}>
          {searchAssets.map((item) => (
            <ListItemButton>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={item.artist ? item.artist : "N/A"}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddAsset(item)}
                >
                  Add
                </Button>
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      ) : null}
    </Box>
  );

  return (
    <ClippedDrawer Component={[Information, Divide, Assets, Divide, Adds]} />
  );
}
