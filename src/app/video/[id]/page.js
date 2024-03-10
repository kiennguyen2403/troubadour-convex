"use client";
import { React, useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
// import { api } from "../../api/api";
import CustomVideo from "@/app/components/video";

import { selectToken } from "@/redux/auth-slice";
import { useSelector } from "react-redux";


export default function Video({ params }) {
    const token = useSelector(selectToken);
    const id = params.id;

    const Player = <CustomVideo playbackId={id} title="Text" description="Description" />


    return (
        <ClippedDrawer Component={[Player]} />
    );
}