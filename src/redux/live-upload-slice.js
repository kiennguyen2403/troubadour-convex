import { createSlice } from "@reduxjs/toolkit";

export const liveUploadSlice = createSlice({
    name: "liveUpload",
    initialState: {
        title: "",
        description: "",
        genre: [],
    },
    reducers: {
        setLiveTitle: (state, action) => {
            state.title = action.payload
        },
        setLiveDescription: (state, action) => {
            state.description = action.payload
        },
        setLiveGenre: (state, action) => {
            state.genre = action.payload
        }
    }
});

export const { setLiveTitle, setLiveDescription, setLiveGenre } = liveUploadSlice.actions;


export const selectLiveTitle = (state) => state.liveUpload.title;
export const selectLiveDescription = (state) => state.liveUpload.description;
export const selectLiveGenre = (state) => state.liveUpload.genre;

export default liveUploadSlice.reducer;