// FileUpload.js
import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFile, selectFile } from '@/redux/media-upload-slice';
import FileUploadIcon from '@mui/icons-material/FileUpload';


export const UploadForm = () => {

    const file = useSelector(selectFile);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        dispatch(setFile(file));
    };

    //check if the file is media file
    const isMediaFile = (file) => {
        // List of allowed MIME types for media files
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'audio/mpeg', 'audio/wav', /* Add more as needed */];

        // Check if the file's MIME type is in the allowedTypes list
        return allowedTypes.includes(file.type);
    };



    return (
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput" // Add an id to link with the label
            />

            <label htmlFor="fileInput" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '7rem',
                background: "gray",
                color: '#fff',
                borderRadius: 12,
                cursor: 'pointer',
            }}>
                <div style={{ alignItems: "center" }}>
                    <FileUploadIcon />
                </div>
                <Typography>
                    {file ? file.name : "Choose File"}
                </Typography>

            </label>
        </Container>
    );
};

