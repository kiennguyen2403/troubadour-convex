import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: false,
    token: null,
    username: null,
    image: null,
    userId: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload.authState;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.image = action.payload.photo;
      state.userId = action.payload.userId;
    },
    setUserID: (state, action) => {
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUserID } = authSlice.actions;
export const selectAuth = (state) => state.auth.authState;
export const selectToken = (state) => state.auth.token;
export const selectImage = (state) => state.auth.image;
export const selectUsername = (state) => state.auth.username;
export const selectUserID = (state) => state.auth.userId;

export default authSlice.reducer;
