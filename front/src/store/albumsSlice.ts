import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { createAlbum, deleteAlbum, fetchAlbumsByArtist, toggleAlbumPublished } from './albumsThunk';
import { IAlbumsByArtist } from '../types';

interface AlbumsState {
  items: IAlbumsByArtist | null;
  fetchLoading: boolean;
  createLoading: boolean;
  publishedLoading: boolean;
  deleteLading: boolean;
}

const initialState: AlbumsState = {
  items: null,
  fetchLoading: false,
  createLoading: false,
  publishedLoading: false,
  deleteLading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload: albums }) => {
        state.fetchLoading = false;
        state.items = albums;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(toggleAlbumPublished.pending, (state) => {
        state.publishedLoading = true;
      })
      .addCase(toggleAlbumPublished.fulfilled, (state) => {
        state.publishedLoading = false;
      })
      .addCase(toggleAlbumPublished.rejected, (state) => {
        state.publishedLoading = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteLading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchLoading;
export const selectCreateAlbumLoading = (state: RootState) => state.albums.createLoading;
