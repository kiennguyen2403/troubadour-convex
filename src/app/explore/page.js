"use client";
import React, { useState, useEffect } from "react";
import ClippedDrawer from "@/app/components/header";
import "@mux/mux-player/themes/minimal";
import Map from "./components/map";


export default function Explore() {

    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(-1);
    
    return (
        <ClippedDrawer Component={[<Map/>]} />
    );
}