import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import mediaReducer from './media-slice';
import settingReducer from './setting-slice';
import mediaUploadReducer from './media-upload-slice';
import liveUploadReducer from './live-upload-slice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        media: mediaReducer,
        mediaUpload: mediaUploadReducer,
        liveUpload: liveUploadReducer,
    },
})