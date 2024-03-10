import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authState: false,
        token: null,
        username: null,
        image: null,
    },
    reducers: {
        setAuth: (state, action) => {
            state.authState = action.payload.authState
            state.token = action.payload.token
            state.username = action.payload.username
            state.image = action.payload.photo
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth.authState;
export const selectToken = (state) => state.auth.token;
export const selectImage = (state) => state.auth.image
export const selectUsername = (state) => state.auth.username


export default authSlice.reducer