import { createSlice } from "@reduxjs/toolkit";

export const playlistUploadSlice = createSlice({
  name: "playlistUpload",
  initialState: {
    title: "",
    privacy: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },
  },
});

export const { setTitle, setPrivacy } = playlistUploadSlice.actions;

export const selectTitle = (state) => state.playlistUpload.title;
export const selectPrivacy = (state) => state.playlistUpload.privacy;

export default playlistUploadSlice.reducer;
