import { createSlice } from "@reduxjs/toolkit";

export const mediaUploadSlice = createSlice({
    name: "mediaUpload",
    initialState: {
        file: null,
        title: "",
        description: "",
        genre: [],
    },
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setGenre: (state, action) => {
            state.genre = action.payload
        },

    }
});

export const { setFile, setTitle, setDescription, setGenre } = mediaUploadSlice.actions;

export const selectFile = (state) => state.mediaUpload.file;
export const selectTitle = (state) => state.mediaUpload.title;
export const selectDescription = (state) => state.mediaUpload.description;
export const selectGenre = (state) => state.mediaUpload.genre;

export default mediaUploadSlice.reducer;