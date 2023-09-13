import { IAlbumsByArtist } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { fetchAlbumsByArtist } from './albumsThunk';

interface AlbumsState {
  items: IAlbumsByArtist | null;
  fetchLoading: boolean;
}

const initialState: AlbumsState = {
  items: null,
  fetchLoading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, {payload: albums}) => {
        state.fetchLoading = false;
        state.items = albums;
      })
      .addCase(fetchAlbumsByArtist.rejected, state => {
        state.fetchLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchLoading;
