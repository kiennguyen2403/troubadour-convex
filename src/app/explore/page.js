"use client";
import React, { useState, useEffect } from "react";
import ClippedDrawer from "@/app/components/header";
import "@mux/mux-player/themes/minimal";
import Map from "./components/map";


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

    
    return (
        <ClippedDrawer Component={[<Map/>]} />
    );
}