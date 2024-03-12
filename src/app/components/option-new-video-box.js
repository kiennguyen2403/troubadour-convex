import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import StreamIcon from '@mui/icons-material/Stream';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import axios from "axios"
// import { api } from "../api/api";


export default function OptionNewVideoBox({ setIsOptionOpen, setIsMultipleFormOpen, setIsLiveMultipleFormOpen }) {

    const handleOptionClick = () => {
        setIsOptionOpen(false);

    }
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: '#19191A',
            position: "fixed",
            zIndex: 100000,
            marginTop: "2.3%",
            right: "4%",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
        }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem disableGutters>
                    <ListItemButton onClick={() => {
                        handleOptionClick();
                        setIsLiveMultipleFormOpen(true);
                    }}>
                        <ListItemIcon>
                            <StreamIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Live Event" />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton onClick={() => {
                        handleOptionClick();
                        setIsMultipleFormOpen(true);
                    }}>
                        <ListItemIcon>
                            <SlideshowIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Media" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    )

}