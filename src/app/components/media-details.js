// FileUpload.js
import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTitle, selectTitle, setDescription, selectDescription } from '@/redux/media-upload-slice';

export const MediaDetail = () => {
    const mediaTitle = useSelector(selectTitle);
    const mediaDescription = useSelector(selectDescription);
    const dispatch = useDispatch();


 
    const handleTitleChange = (event) => {
        dispatch(setTitle(event.target.value));
    };

    const handleDescriptionChange = (event) => {
        dispatch(setDescription(event.target.value));
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

