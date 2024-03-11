// FileUpload.js
"use client";
import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
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

  const handleIsRecurringChange = (event) => {

  }

  const handleDateChange = (event) => {

  }

  const handleLocationChange = (event) => {

  }

  return (
    <Container>
      <TextField
        label="Event Title"
        variant="outlined"
        value={mediaTitle}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Description"
        variant="outlined"
        value={mediaDescription}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider>
      <FormControlLabel
        control={<Checkbox />}
        label="Is this a recurring event?"
        onChange={() => {

        }}
      />

      <TextField
        label="Event Location"
        variant="outlined"
        value={mediaDescription}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        rows={4}
      />


    </Container>
  );
};
