import { configureStore } from '@reduxjs/toolkit'
import { artistsReducer } from '../store/artistsSlice';
import { albumsReducer } from '../store/albumsSlice';
import { tracksReducer } from '../store/tracksSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
