import { configureStore } from '@reduxjs/toolkit'
import { artistsReducer } from '../store/artistsSlice';
import { albumsReducer } from '../store/albumsSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
