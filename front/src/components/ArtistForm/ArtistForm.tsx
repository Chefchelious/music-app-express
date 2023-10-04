import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../FileInput/FileInput';
import { IArtistMutation } from '../../types';
import { selectCreateArtistError, selectCreateArtistLoading } from '../../store/artistsSlice';
import { createArtist } from '../../store/artistsThunk';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectCreateArtistError);
  const loading = useAppSelector(selectCreateArtistLoading);

  const [state, setState] = useState<IArtistMutation>({
    name: '',
    info: '',
    image: null,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createArtist(state)).unwrap();
      navigate('/');
    } catch (e) {
      // nothing
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
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="artist name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            size="small"
            required
            error={!!getFieldError('name')}
            helperText={getFieldError('name')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="info"
            label="artist info"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
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

export default ArtistForm;
