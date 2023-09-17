import { ITrackHistory } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { addTrackToTrackHistory, fetchTrackHistory } from './trackHistoryThunk';

interface TrackHistoryState {
  items: ITrackHistory[];
  fetchLoading: boolean;
  addTrackLoading: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  fetchLoading: false,
  addTrackLoading: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload: trackHistory }) => {
        state.fetchLoading = false;
        state.items = trackHistory;
      })
      .addCase(fetchTrackHistory.rejected, state => {
        state.fetchLoading = false;
      });

    builder
      .addCase(addTrackToTrackHistory.pending, state => {
        state.addTrackLoading = true;
      })
      .addCase(addTrackToTrackHistory.fulfilled, state => {
        state.addTrackLoading = false;
      })
      .addCase(addTrackToTrackHistory.rejected, state => {
        state.addTrackLoading = false;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;