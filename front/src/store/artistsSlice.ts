import { createSlice } from '@reduxjs/toolkit';
import { createArtist, fetchArtists } from './artistsThunk';
import { RootState } from '../app/store';
import { IArtist, ValidationError } from '../types';

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  createError: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.fetchLoading = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, state => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
        state.createError = null;
      })
      .addCase(createArtist.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) => state.artists.fetchLoading;
export const selectCreateArtistLoading = (state: RootState) => state.artists.createLoading;
export const selectCreateArtistError= (state: RootState) => state.artists.createError;