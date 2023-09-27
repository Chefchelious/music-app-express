import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist, IArtistMutation, ValidationError } from '../types';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<IArtist[]>(
  'artists/fetchAll',
  async () => {
    const { data } = await axiosApi<IArtist[]>('/artists');

    return data;
  },
);

export const createArtist = createAsyncThunk<void, IArtistMutation, { rejectValue: ValidationError }>(
  'artists/create',
  async (artist, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(artist) as (keyof IArtistMutation)[];

      keys.forEach(key => {
        const value = artist[key];

        if(value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/artists', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);