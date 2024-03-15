"use client";
import { React, useEffect, useState } from "react";
import ClippedDrawer from "@/app/components/header";
import { Box, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from "@mui/material/Switch";

export default function Setting() {
    const [language, setLanguage] = useState(10);
    const [isCompact, setIsCompact] = useState(false);
    const [isShowNowPlaying, setIsShowNowPlaying] = useState(false);


    const getCustomSetting = async () => {

    }

    const Title = <Typography variant="h4" textAlign="start">
        Settings
    </Typography>


    const LanguageSetting =
        <Box sx={{ textAlign: "start", marginTop: "3%", marginBottom: "3%" }}>
            <Typography variant="h6">
                Language
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ textAlign: "start", fontWeight: 500, }} color="text.secondary" gutterBottom>
                    Choose language - Changes will be applied after restarting the application
                </Typography>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value) }}
                    size="small"
                    sx={{ width: "20%", fontSize: "0.8rem" }}
                >
                    <MenuItem value={10}>English</MenuItem>
                    <MenuItem value={20}>Vietnamese</MenuItem>
                </Select>

            </Box>
        </Box>

    const LibrarySetting =
        <Box sx={{ textAlign: "start", marginTop: "3%", marginBottom: "3%" }}>
            <Typography variant="h6">
                Library
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ textAlign: "start", fontWeight: 500, }} color="text.secondary" gutterBottom>
                    Use compact library layout
                </Typography>
                <Switch />
            </Box>
        </Box>

    const DisplaySetting =
        <Box sx={{ textAlign: "start", marginTop: "3%", marginBottom: "3%" }}>
            <Typography variant="h6">
                Display
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ textAlign: "start", fontWeight: 500, }} color="text.secondary" gutterBottom>
                    Show the now-playing panel on click of play
                </Typography>
                <Switch />
            </Box>
        </Box>

    return (
        <ClippedDrawer Component={[Title, LanguageSetting, LibrarySetting, DisplaySetting]} />
    );
}