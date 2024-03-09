"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Container, IconButton, Grid, Icon } from "@mui/material";
import MuxPlayer from "@mux/mux-player-react";
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';
import ClippedDrawer from "@/app/components/header";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import "@mux/mux-player/themes/minimal";


export default function Explore() {


    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(-1);

    const handleGetVideo = async () => {
        try {
            // const result = await axios.get(api.media.short, {
            //     withCredentials: true,
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Credentials": true,
            //     }
            // });
            // setVideoList([...result.data]);
        } catch (error) {
            console.log(error)
        }
    }

    const handleNextVideo = async () => {
        // await handleGetVideo();
        // setCurrentVideo(currentVideo + 1);
    }

    const handlePreviousVideo = async () => {
        // await handleGetVideo();
        // setCurrentVideo(currentVideo - 1);

    }


    const ShortVideo =

        <Box
            sx={{

                height: "220%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <Box>
                <IconButton style={{ background: "#73726f" }} onClick={handlePreviousVideo}>
                    <NavigateBeforeIcon />
                </IconButton>
            </Box>
            <Grid container style={{ height: "100%", display: "flex", justifyContent: "center" }}>
                <Grid
                    style={{ height: "100%" }}
                    item
                    xs={6}>
                    <MuxPlayer
                        streamType="on-demand"
                        // theme="minimal"
                        style={{ height: "100%", width: "70%", borderRadius: 12 }}
                        playbackId={videoList[currentVideo]}
                        controls={false}
                        metadataVideoId="Test video"
                        metadataViewerUserId="user-id-007"/>
                </Grid>
                <Grid
                    item
                    style={{
                        height: "100%",
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    xs={1}>
                    <IconButton >
                        <StarIcon />
                    </IconButton>

                    <IconButton>
                        <CommentIcon />
                    </IconButton>

                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>

                </Grid>
            </Grid>
            <Box>
                <IconButton style={{ background: "#73726f" }} onClick={handleNextVideo}>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Box >




    return (
        <ClippedDrawer Component={[ShortVideo]} />
    );
}