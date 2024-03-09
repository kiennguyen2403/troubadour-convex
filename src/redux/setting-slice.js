import { createSlice } from "@reduxjs/toolkit";


export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        language: "en",
        library: true,
        display: true,
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setLibrary: (state, action) => {
            state.library = action.payload;
        },
        setDisplay: (state, action) => {
            state.display = action.payload;
        },
    }
});

export const { setLanguage, setDisplay, setLibrary } = settingSlice.actions;
export const selectLanguage = (state) => state.setting.language;
export const selectLibrary = (state) => state.setting.library;
export const selectDisplay = (state) => state.setting.display;