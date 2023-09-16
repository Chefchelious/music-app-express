import { configureStore } from '@reduxjs/toolkit'
import { artistsReducer } from '../store/artistsSlice';
import { albumsReducer } from '../store/albumsSlice';
import { tracksReducer } from '../store/tracksSlice';
import { userReducer } from '../store/usersSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
