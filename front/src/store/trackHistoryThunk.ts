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