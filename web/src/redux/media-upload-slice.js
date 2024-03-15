import { createSlice } from "@reduxjs/toolkit";

export const mediaUploadSlice = createSlice({
    name: "mediaUpload",
    initialState: {
        file: null,
        title: "",
        description: "",
        genre: [],
        collaborators: [],
        privacy: "",
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
        setCollaborators: (state, action) => {
            state.collaborators = action.payload
        },
        setPrivacy: (state, action) => {
            state.privacy = action.payload
        },
    }
});

export const { setFile, setTitle, setDescription, setGenre, setCollaborators, setPrivacy } = mediaUploadSlice.actions;

export const selectFile = (state) => state.mediaUpload.file;
export const selectTitle = (state) => state.mediaUpload.title;
export const selectDescription = (state) => state.mediaUpload.description;
export const selectGenre = (state) => state.mediaUpload.genre;
export const selectCollaborators = (state) => state.mediaUpload.collaborators;
export const selectPrivacy = (state) => state.mediaUpload.privacy;

export default mediaUploadSlice.reducer;