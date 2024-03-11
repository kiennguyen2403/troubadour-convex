// FileUpload.js
"use client";
import React, { useState } from "react";
import { Button, Container, TextField, Stack, Chip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
    setFile,
    selectFile,
    setLiveGenre,
    selectLiveGenre,
} from "../../redux/live-upload-slice";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const LiveExtra = () => {

    // const result = useQueries(api.genre.get, {})
    const genres = ["Jazz", "Acoustic"];
    const file = useSelector(selectFile);
    const liveGenre = useSelector(selectLiveGenre);
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
                            dispatch(setLiveGenre([genre, ...liveGenre]));
                        }}
                        color="primary"
                    />))
                }
            </Stack>

        </Container>
    );
};
