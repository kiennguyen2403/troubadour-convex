"use client";
import { React, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ClippedDrawer from "../components/header";

export default function Privacy() {
    const [user, setUser] = useState(null);

    const Title = <Typography variant="h4" textAlign="start">
        Privacy
    </Typography>

    return (
        <ClippedDrawer Component={[Title]} />
    );
}