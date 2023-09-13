import { IArtist } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunk';
import { RootState } from '../app/store';

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
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
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) => state.artists.fetchLoading;