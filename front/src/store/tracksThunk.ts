import { createAsyncThunk } from '@reduxjs/toolkit';
import {ITrackMutation, ITracksByAlbum} from '../types';
import axiosApi from '../axiosApi';

export const fetchTracks = createAsyncThunk<ITracksByAlbum, string>(
  'tracks/fetchByAlbum',
  async (id) => {
    const { data } = await axiosApi(`/tracks?album=${id}`);
    
    return data;
  },
);

export const createTrack = createAsyncThunk<void, ITrackMutation>(
  'tracks/create',
  async (track) => {
    await axiosApi.post('/tracks', track);
  },
);

export const toggleTrackPublished = createAsyncThunk<void, string>(
  'tracks/published',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteOne',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);