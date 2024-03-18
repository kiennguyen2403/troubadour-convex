import { createSlice } from "@reduxjs/toolkit";

export const mediaSlice = createSlice({
  name: "media",
  initialState: {
    medias: [],
    currentMedia: null,
    currentMediaTitle: null,
    currentMediaArtist: null,
    isPlaying: false, // Set it to `false` to represent the initial state as not playing
  },
  reducers: {
    setMedias: (state, action) => {
      state.medias = action.payload;
    },
    setCurrentMedia: (state, action) => {
      state.currentMedia = action.payload;
    },
    setCurrentMediaId: (state, action) => {
      state.currentMediaId = action.payload;
    },
    setCurrentMediaTitle: (state, action) => {
      state.currentMediaTitle = action.payload;
    },
    setCurrentMediaArtist: (state, action) => {
      state.currentMediaArtist = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setMedias,
  setCurrentMedia,
  setIsPlaying,
  setCurrentMediaArtist,
  setCurrentMediaTitle,
  setCurrentMediaId,
} = mediaSlice.actions;

export const selectMedias = (state) => state.media.medias;
export const selectCurrentMedia = (state) => state.media.currentMedia;
export const selectCurrentMediaId = (state) => state.media.currentMediaId;
export const selectCurrentMediaTitle = (state) => state.media.currentMediaTitle;
export const selectCurrentMediaArtist = (state) => state.media.currentMediaArtist;
export const selectIsPlaying = (state) => state.media.isPlaying;

export default mediaSlice.reducer;
