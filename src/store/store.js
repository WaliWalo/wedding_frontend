import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import postsReducer from './counter/postsSlice'
import profileReducer from './profile/profileSlice'
import weddingReducer from './wedding/weddingSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        wedding: weddingReducer,
        profile: profileReducer,
    },
})