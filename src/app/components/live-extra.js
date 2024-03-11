// FileUpload.js
"use client";
import React, { useState } from "react";
import { Button, Container, TextField, Stack, Chip, Typography } from "@mui/material";
import { setFile, selectFile } from "../../redux/media-upload-slice";
import { useSelector, useDispatch } from "react-redux";
import {
    setLiveTitle,
    selectLiveTitle,
    setLiveDescription,
    selectLiveDescription,
} from "../../redux/live-upload-slice";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useQueries } from "convex/react";
import { api } from "../../../convex/_generated/api";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const LiveExtra = () => {

    // const result = useQueries(api.genre.get, {})
    const genres = ["Jazz", "Acoustic"];
    const file = useSelector(selectFile);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        dispatch(setFile(file));
    };

    //check if the file is media file
    const isMediaFile = (file) => {
        // List of allowed MIME types for media files
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
        ];

        // Check if the file's MIME type is in the allowedTypes list
        return allowedTypes.includes(file.type);
    };


    const handleTitleChange = (event) => {
        dispatch(setLiveTitle(event.target.value));
    };

    const handleDescriptionChange = (event) => {
        dispatch(setLiveDescription(event.target.value));
    };

    return (
        <Container>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput" // Add an id to link with the label
            />

            <label
                htmlFor="fileInput"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "7rem",
                    background: "gray",
                    color: "#fff",
                    borderRadius: 12,
                    cursor: "pointer",
                }}
            >
                <div style={{ alignItems: "center" }}>
                    <FileUploadIcon />
                </div>
                <Typography>{file ? file.name : "Choose image for event"}</Typography>
            </label>

            <Stack direction="row" gap={1} flexWrap="wrap" padding="1rem">
                {genres.map((genre, index) => (
                    <Chip
                        key={index}
                        label={"#" + genre}
                        variant={"filled"}
                        onClick={() => {
                            // setSelectedTopics((prev) => prev.filter((t) => t !== topic));
                            // postSelectedTopics(selectedTopics.filter((t) => t !== topic));
                        }}
                        color="primary"
                    />))
                }
            </Stack>

        </Container>
    );
};
