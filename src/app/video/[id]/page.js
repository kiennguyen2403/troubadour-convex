"use client";
import { React, useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
// import { api } from "../../api/api";
import CustomVideo from "@/app/components/video";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useStoreUserEffect from "@/convex/useStoreUserEffect";


export default function ({ params }) {
    const { id } = params;
    const router = useRouter();
    const userId = useStoreUserEffect();
    const isUserPurchaseTicket = useQuery(api.event.isUserPurchaseTicket, { 
        eventID: id, 
        userID: userId ?? ""
    });

    if (!isUserPurchaseTicket && userId != null) router.push("/event/" + id);


    const Player = <CustomVideo playbackId={id} title="Text" description="Description" />


    return (
        <ClippedDrawer Component={[Player]} />
    );
}