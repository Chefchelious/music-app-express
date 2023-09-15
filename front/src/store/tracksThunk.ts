import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITracksByAlbum } from '../types';
import axiosApi from '../axiosApi';

export const fetchTracks = createAsyncThunk<ITracksByAlbum, string>(
  'tracks/fetchByAlbum',
  async (id) => {
    const { data } = await axiosApi(`/tracks?album=${id}`);
    
    return data;
  },
);