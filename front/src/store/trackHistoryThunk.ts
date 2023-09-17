import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackHistory } from '../types';
import { RootState } from '../app/store';
import axiosApi from '../axiosApi';

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], undefined, { state: RootState }>(
  'trackHistory/fetchByUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().users.user?.token;

    const { data } = await axiosApi('/track_history', {
      headers: {
        'Authorization': token,
      },
    });

    return data;
  },
);

export const addTrackToTrackHistory = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/addTrack',
  async (trackID, thunkAPI) => {
    const token = thunkAPI.getState().users.user?.token;

    await axiosApi.post('/track_history', {track: trackID}, {
      headers: {
        'Authorization': token,
      },
    });
  },
);