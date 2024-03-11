"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { redirect, useRouter } from "next/navigation";
import { Button, Grid } from "@mui/material";
import MediaControl from "./media-controller";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAuth, selectImage } from "../../redux/auth-slice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MultipleStepForm from "./multiple-step-form";
import MultipleStepFormLive from "./multiple-step-form-live";
import { UploadForm } from "./upload-form";
import { MediaDetail } from "./media-details";
import Confirm from "./confirm";
import { LiveDetail } from "./live-detail";
import LiveConfirm from "./live-confirm";
import VideoButton from "./video-button";
import OptionLoginBox from "./option-login-box";
import OptionNewVideoBox from "./option-new-video-box";
import React from "react";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { SignIn } from "@clerk/clerk-react";
import useStoreUserEffect from "@/convex/useStoreUserEffect";

const drawerWidth = 240;

export default function ClippedDrawer({ Component }) {
  const isLogin = useSelector(selectAuth);
  const image = useSelector(selectImage);
  const router = useRouter();
  const [playLists, setPlayLists] = useState([]);
  const [isOptionLoginOpen, setIsOptionLoginOpen] = useState(false);
  const [isOptionUploadOpen, setIsOptionUploadOpen] = useState(false);
  const [isMultipleFormOpen, setIsMultipleFormOpen] = useState(false);
  const [isLiveMultipleFormOpen, setIsLiveMultipleFormOpen] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useStoreUserEffect();

  const handleOptionLoginClick = () => {
    setIsOptionLoginOpen(!isOptionLoginOpen);
    if (!isOptionLoginOpen) {
      setIsOptionUploadOpen(false);
    }
  };

  const handleOptionUploadClick = () => {
    setIsOptionUploadOpen(!isOptionUploadOpen);
    if (!isOptionUploadOpen) {
      setIsOptionLoginOpen(false);
    }
  };

  const getPlayLists = async () => {
    try {
      const result = await axios.get(api.media);
      if (result) {
        setPlayLists(result.data.playlists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlayList = async () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    setPlayLists([...playLists, "New PlayList#" + playLists.length]);
  };

  useEffect(() => {
    getPlayLists();
  }, []);

  const getFirstSection = () =>
    [
      { title: "Home", component: <HomeIcon /> },
      { title: "Search", component: <SearchIcon /> },
      { title: "Explore", component: <ExploreIcon /> },
      { title: "History", component: <HistoryIcon /> },
    ].map((text, index) => (
      <ListItem key={text.title} disablePadding>
        <ListItemButton
          onClick={() => {
            if (text.title === "Home") router.push("/");
            else router.push("/" + text.title.toLowerCase());
          }}
        >
          <ListItemIcon>{text.component}</ListItemIcon>
          <ListItemText primary={text.title} />
        </ListItemButton>
      </ListItem>
    ));

  const getSecondSection = () =>
    playLists.map((text) => (
      <ListItem key={text} disablePadding>
        <ListItemButton
          onClick={() => {
            router.push("/playlist/" + text);
          }}
        >
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Troubadour
          </Typography>
          <IconButton
            style={{ marginLeft: "90%" }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              if (isAuthenticated) {
                handleOptionUploadClick();
              } else {
                router.push("/");
              }
            }}
          >
            <VideoCallIcon />
          </IconButton>
          {isAuthenticated ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div>
              <IconButton
                style={{ marginLeft: "auto" }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  router.push("/sign-in");
                }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>{getFirstSection()}</List>
          <Divider />
          <List>
            <ListItem key={"Create Playlist"} disablePadding>
              <ListItemButton
                onClick={() => {
                  console.log("clicked");
                  handleAddPlayList();
                }}
              >
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Playlist"} />
              </ListItemButton>
            </ListItem>
            {getSecondSection()}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {Component.map((component, index) => component)}
      </Box>
      <MediaControl />
      {isOptionLoginOpen ? (
        <OptionLoginBox setIsOptionOpen={setIsOptionLoginOpen} />
      ) : null}
      {isOptionUploadOpen ? (
        <OptionNewVideoBox
          setIsOptionOpen={setIsOptionUploadOpen}
          setIsMultipleFormOpen={setIsMultipleFormOpen}
          setIsLiveMultipleFormOpen={setIsLiveMultipleFormOpen}
        />
      ) : null}
      <MultipleStepForm
        isOptionOpen={isMultipleFormOpen}
        setIsOptionOpen={setIsMultipleFormOpen}
        component={[<UploadForm />, <MediaDetail />, <Confirm />]}
        steps={["Upload your file", "Provide information", "Confirm"]}
      />

      <MultipleStepFormLive
        isOptionOpen={isLiveMultipleFormOpen}
        setIsOptionOpen={setIsLiveMultipleFormOpen}
        component={[<LiveDetail />, <LiveConfirm />]}
        steps={["Provide information", "Confirm"]}
      />
    </Box>
  );
}
