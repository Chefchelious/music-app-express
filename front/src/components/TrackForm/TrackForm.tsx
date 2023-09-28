import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ITrackMutation } from '../../types';
import { Grid, MenuItem, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { fetchArtists } from '../../store/artistsThunk';
import { selectArtists } from '../../store/artistsSlice';
import { fetchAlbumsByArtist } from '../../store/albumsThunk';
import { selectAlbums } from '../../store/albumsSlice';
import {selectCreateTrackLoading} from "../../store/tracksSlice";
import {createTrack} from "../../store/tracksThunk";

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectCreateTrackLoading);

  const [artist, setArtist] = useState('');

  const [state, setState] = useState<ITrackMutation>({
    name: '',
    album: '',
    trackUrl: '',
    duration: '',
    numberInAlbum: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
      if (artist) {
        dispatch(fetchAlbumsByArtist(artist));
        setState(prevState => ({...prevState, album : ''}));
      }
  }, [dispatch, artist]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createTrack(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('invalid field...');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Grid container direction="column" spacing={2}>

        <Grid item xs>
          <TextField
            id="name" label="track name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            size="small"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            required
            select
            label="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            name="artist"
          >
            <MenuItem value="" disabled>select artist...</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        { albums && (
          <Grid item xs>
            <TextField
              required
              select
              label="album"
              value={state.album}
              onChange={inputChangeHandler}
              name="album"
            >
              <MenuItem value="" disabled>select album...</MenuItem>
              {albums.albums.map(album => (
                <MenuItem key={album._id} value={album._id}>
                  {album.name}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
        )}

        <Grid item xs>
          <TextField
            id="duration" label="track duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            size="small"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            type="number"
            id="numberInAlbum" label="number in album"
            value={state.numberInAlbum}
            onChange={inputChangeHandler}
            name="numberInAlbum"
            size="small"
            required
            inputProps={{
              min: 0
            }}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="trackUrl" label="youtube link"
            value={state.trackUrl}
            onChange={inputChangeHandler}
            name="trackUrl"
            size="small"
          />
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

export default TrackForm;