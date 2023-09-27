import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbumMutation, IAlbumsByArtist } from '../types';
import axiosApi from '../axiosApi';

export const fetchAlbumsByArtist = createAsyncThunk<IAlbumsByArtist, string>(
  'albums/fetchByArtist',
  async (id) => {
    const { data } = await axiosApi(`/albums?artist=${id}`);

    return data;
  },
);

export const createAlbum = createAsyncThunk<void, IAlbumMutation>(
  'albums/create',
  async (album) => {
     const formData = new FormData();

     const keys = Object.keys(album) as (keyof IAlbumMutation)[];

     keys.forEach(key => {
       const value = album[key];

       if(value !== null) {
         formData.append(key, value);
       }
     });

     await axiosApi.post('/albums', formData);
  },
);