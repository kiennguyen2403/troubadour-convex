// FileUpload.js
import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setLiveTitle, selectLiveTitle, setLiveDescription, selectLiveDescription } from '@/redux/live-upload-slice';

export const LiveDetail = () => {
    const mediaTitle = useSelector(selectLiveTitle);
    const mediaDescription = useSelector(selectLiveDescription);
    const dispatch = useDispatch();



    const handleTitleChange = (event) => {
        dispatch(setLiveTitle(event.target.value));
    };

    const handleDescriptionChange = (event) => {
        dispatch(setLiveDescription(event.target.value));
    };

    return (
        <Container>
            <TextField
                label="Media Title"
                variant="outlined"
                value={mediaTitle}
                onChange={handleTitleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Media Description"
                variant="outlined"
                value={mediaDescription}
                onChange={handleDescriptionChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
        </Container>
    );
};

