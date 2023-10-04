import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectArtists } from '../../store/artistsSlice';
import { fetchArtists } from '../../store/artistsThunk';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../FileInput/FileInput';
import { selectCreateAlbumLoading } from '../../store/albumsSlice';
import { createAlbum } from '../../store/albumsThunk';
import { IAlbumMutation } from '../../types';
import { formWorkInput } from '../../constants';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectCreateAlbumLoading);

  const [state, setState] = useState<IAlbumMutation>({
    artist: '',
    name: '',
    year: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createAlbum(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('invalid field...');
    }
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    formWorkInput(setState, e);
  };

  return !artists.length ? (
    <h3>Page updating, sorry...</h3>
  ) : (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            required
            select
            label="artist"
            value={state.artist}
            onChange={inputChangeHandler}
            name="artist"
          >
            <MenuItem value="" disabled>
              select artist...
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="name"
            label="album name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            size="small"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            type="number"
            id="year"
            label="year"
            value={state.year}
            onChange={inputChangeHandler}
            name="year"
            size="small"
            required
            inputProps={{
              min: 0,
            }}
          />
        </Grid>

        <Grid item xs>
          <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
        </Grid>

        <Grid item xs>
          <LoadingButton
            type="submit"
            size="small"
            endIcon={<SendIcon />}
            loadingPosition="end"
            variant="contained"
            loading={loading}
          >
            <span>Send</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;
