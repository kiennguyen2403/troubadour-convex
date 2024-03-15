"use client";
import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useRouter } from "next/navigation";
import MediaControl from "./media-controller";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MultipleStepForm from "./multiple-step-form";
import MultipleStepFormLive from "./multiple-step-form-live";
import { UploadForm } from "./upload-form";
import { MediaDetail } from "./media-details";
import Confirm from "./confirm";
import { LiveDetail } from "./live-detail";
import LiveConfirm from "./live-confirm";
import OptionNewVideoBox from "./option-new-video-box";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth, useQuery } from "convex/react";
import { LiveExtra } from "./live-extra";
import PlaylistForm from "./playlist-form";
import { api } from "../../../convex/_generated/api";
import { selectUserID } from "@/redux/auth-slice";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function ClippedDrawer({ Component }) {
  const router = useRouter();
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [isOptionLoginOpen, setIsOptionLoginOpen] = useState(false);
  const [isOptionUploadOpen, setIsOptionUploadOpen] = useState(false);
  const [isMultipleFormOpen, setIsMultipleFormOpen] = useState(false);
  const [isLiveMultipleFormOpen, setIsLiveMultipleFormOpen] = useState(false);
  const [isPlaylistFormOpen, setIsPlaylistFormOpen] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useSelector(selectUserID) ?? "";

  
  const playlist = useQuery(api.playlist.getByUserId, { userId }) ?? [];
  const handleOptionLoginClick = () => {
    setIsOptionLoginOpen(!isOptionLoginOpen);
    if (!isOptionLoginOpen) {
      setIsOptionUploadOpen(false);
    }
  };

  const handleOptionUploadClick = () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    setIsOptionUploadOpen(!isOptionUploadOpen);
    if (!isOptionUploadOpen) {
      setIsOptionLoginOpen(false);
    }
  };

  const handleAddPlayList = async () => {
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }
    setIsPlaylistFormOpen(true);
  };

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

  const getSecondSection = () => {
    return playlist ? (
      playlist.map(({ _id, name }) => (
        <ListItemButton
          sx={{ pl: 4 }}
          key={name}
          onClick={() => {
            router.push("/playlist/" + _id);
          }}
        >
          <ListItemIcon>
            <LibraryMusicIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      ))
    ) : (
      <></>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Troubadour
          </Typography>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ marginRight: "2rem" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                if (isAuthenticated) {
                  handleOptionUploadClick();
                } else {
                  router.push("/sign-in");
                }
              }}
            >
              <VideoCallIcon />
            </IconButton>

            {isAuthenticated ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <IconButton
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
            )}
          </div>
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
                  handleAddPlayList();
                }}
              >
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Playlist"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"My Playlist"} disablePadding>
              <ListItemButton
                onClick={() => {
                  setPlaylistOpen(!playlistOpen);
                }}
              >
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary={"My Playlist"} />
                {playlistOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={playlistOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getSecondSection()}
              </List>
            </Collapse>
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
        component={[<LiveDetail />, <LiveExtra />, <LiveConfirm />]}
        steps={["Provide information", "Extra Information", "Confirm"]}
      />

      <PlaylistForm isOptionOpen={isPlaylistFormOpen} setIsOptionOpen={setIsPlaylistFormOpen} />
    </Box>
  );
}
