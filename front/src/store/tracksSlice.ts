import { ITracksByAlbum } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {createTrack, fetchTracks} from './tracksThunk';

interface TracksState {
  items: ITracksByAlbum | null;
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TracksState = {
  items: null,
  fetchLoading: false,
  createLoading: false,
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

    builder
      .addCase(createTrack.pending, state => {
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, state => {
        state.createLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) => state.tracks.fetchLoading;
export const selectCreateTrackLoading = (state: RootState) => state.tracks.createLoading;