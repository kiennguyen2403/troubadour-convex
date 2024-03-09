import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/auth-slice";
import axios from "axios";
// import { api } from "../api/api";

export default function OptionLoginBox({ setIsOptionOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionClick = () => {
    setIsOptionOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#525252",
        position: "fixed",
        zIndex: 100000,
        marginTop: "3%",
        right: "2%",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              router("/account");
              handleOptionClick();
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              router("/privacy");
              handleOptionClick();
            }}
          >
            <ListItemIcon>
              <ShieldIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              router("/setting");
              handleOptionClick();
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disableGutters>
          <ListItemButton
            onClick={async () => {
              try {
                handleOptionClick();
                dispatch(setAuth({ token: null, isAuthenticated: false }));
                window.open(api.authentication.logout, "_self");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
