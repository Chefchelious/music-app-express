import { ITracksByAlbum } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchTracks } from './tracksThunk';

interface TracksState {
  items: ITracksByAlbum | null;
  fetchLoading: boolean;
}

const initialState: TracksState = {
  items: null,
  fetchLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
        state.fetchLoading = false;
        state.items = tracks;
      })
      .addCase(fetchTracks.rejected, state => {
        state.fetchLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) => state.tracks.fetchLoading;