// FileUpload.js
import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Container,
  TextField,
  FormLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  selectTitle,
  setDescription,
  selectDescription,
  setPrivacy,
  selectPrivacy,
} from "../../redux/media-upload-slice";

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

  const handlePrivacyChange = (event) => {
    dispatch(setPrivacy(event.target.value));
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
      <FormLabel id="privacy">Privacy</FormLabel>
      <RadioGroup row aria-labelledby="privacy">
        <FormControlLabel
          value="public"
          control={<Radio />}
          label="Public"
          onClick={handlePrivacyChange}
        />
        <FormControlLabel
          value="private"
          control={<Radio />}
          label="Private"
          onClick={handlePrivacyChange}
        />
      </RadioGroup>
    </Container>
  );
};
