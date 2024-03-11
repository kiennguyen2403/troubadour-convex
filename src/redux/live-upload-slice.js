import { createSlice } from "@reduxjs/toolkit";

export const liveUploadSlice = createSlice({
    name: "liveUpload",
    initialState: {
        title: "",
        description: "",
        genre: [],
        location: "",
        date: "",
        file: "",
        isOffline: false,
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
        },
        setLiveLocation: (state, action) => {
            state.location = action.payload
        },
        setLiveDate: (state, action) => {
            state.date = action.payload
        },
        setFile: (state, action) => {
            state.file = action.payload
        },
        setisOffline: (state, action) => {
            state.isOffline = action.payload
        }
    }
});

export const { setLiveTitle, setLiveDescription, setLiveGenre, setLiveLocation, setLiveDate, setFile, setisOffline } = liveUploadSlice.actions;


export const selectLiveTitle = (state) => state.liveUpload.title;
export const selectLiveDescription = (state) => state.liveUpload.description;
export const selectLiveGenre = (state) => state.liveUpload.genre;
export const selectLiveLocation = (state) => state.liveUpload.location;
export const selectLiveDate = (state) => state.liveUpload.date;
export const selectFile = (state) => state.liveUpload.file;
export const selectisOffline = (state) => state.liveUpload.isOffline;


export default liveUploadSlice.reducer;