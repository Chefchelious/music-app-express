import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackHistory } from '../types';
import { RootState } from '../app/store';
import axiosApi from '../axiosApi';

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], undefined, { state: RootState }>(
  'trackHistory/fetchByUser',
  async () => {

    const { data } = await axiosApi('/track_history');

    return data;
  },
);

export const addTrackToTrackHistory = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/addTrack',
  async (trackID) => {

    await axiosApi.post('/track_history', {track: trackID});
  },
);