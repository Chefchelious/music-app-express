import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbumsByArtist } from '../types';
import axiosApi from '../axiosApi';

export const fetchAlbumsByArtist = createAsyncThunk<IAlbumsByArtist, string>(
  'albums/fetchByArtist',
  async (id) => {
    const { data } = await axiosApi(`/albums?artist=${id}`);

    return data;
  },
);