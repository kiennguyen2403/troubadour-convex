// FileUpload.js
import React, { useState } from "react";
import { Chip, Container, Typography, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFile, selectFile, setGenre, selectGenre } from "../../redux/media-upload-slice";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const UploadForm = () => {
  const genres = useQuery(api.genre.get, {}) || [];
  const mediaGenre = useSelector(selectGenre);
  const file = useSelector(selectFile);
  const dispatch = useDispatch();

  //check if the file is media file
  const isMediaFile = (file) => {
    // List of allowed MIME types for media files
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "audio/mpeg",
      "audio/wav" /* Add more as needed */,
    ];

    // Check if the file's MIME type is in the allowedTypes list
    return allowedTypes.includes(file.type);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (isMediaFile(file)) {
      dispatch(setFile(file));
    } else {
      // event.target.files = [];
      alert("Only image or audio allowed");
    }
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
        <Typography>{file ? file.name : "Choose File"}</Typography>
      </label>
      <Stack direction="row" gap={1} flexWrap="wrap" padding="1rem">
        {genres.map((genre, index) => (
          <Chip
            key={index}
            label={"#" + genre.name}
            variant={"filled"}
            onClick={() => {
              dispatch(setGenre([genre._id, ...mediaGenre]));
            }}
            color="primary"
          />
        ))}
      </Stack>
    </Container>
  );
};
