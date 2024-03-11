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
  setisOffline,
  selectisOffline,
  setLiveDate,
  selectLiveDate,
  setLiveLocation,
  selectLiveLocation


} from "../../redux/live-upload-slice";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const LiveDetail = () => {

  const title = useSelector(selectLiveTitle);
  const description = useSelector(selectLiveDescription);
  const date = useSelector(selectLiveDate);
  const location = useSelector(selectLiveLocation);
  const isOffline = useSelector(selectisOffline);

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    dispatch(setLiveTitle(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    dispatch(setLiveDescription(event.target.value));
  };

  const handleIsOfflineChange = (event) => {
    console.log(event.target);
    dispatch(setisOffline(event.target.checked));
  }

  const handleDateChange = (event) => {

    dispatch(setLiveDate(event));
  }

  const handleLocationChange = (event) => {
    dispatch(setLiveLocation(event.target.value));
  }

  return (
    <Container>
      <TextField
        label="Event Title"
        variant="outlined"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Description"
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Basic date picker"
            value={date}
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
      <FormControlLabel
        control={<Checkbox />}
        value={isOffline}
        label="Is this a recurring event?"
        onChange={handleIsOfflineChange}
      />

      {isOffline ?
        <TextField
          label="Event Location"
          variant="outlined"
          value={location}
          onChange={handleLocationChange}
          fullWidth
          margin="normal"
          rows={4}
        /> : null
      }


    </Container>
  );
};
