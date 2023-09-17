import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { artistsReducer } from '../store/artistsSlice';
import { albumsReducer } from '../store/albumsSlice';
import { tracksReducer } from '../store/tracksSlice';
import { usersReducer } from '../store/usersSlice';
import { trackHistoryReducer } from '../store/trackHistorySlice';

const usersPersistConfig = {
  key: 'music:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  trackHistory: trackHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);