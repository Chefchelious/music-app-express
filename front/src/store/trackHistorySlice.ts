import { ITrackHistory } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchTrackHistory } from './trackHistoryThunk';

interface TrackHistoryState {
  items: ITrackHistory[];
  fetchLoading: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  fetchLoading: false,
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
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;