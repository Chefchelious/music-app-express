import React from 'react';
import { IAlbumMutation } from './types';

export const apiUrl = 'http://localhost:8000';

export const GOOGLE_CLIENT_ID = '931812952407-4h7cgkcd1d53ss1cp8bqts6mae6r03rj.apps.googleusercontent.com';

export const formWorkInput =
  (setState:  React.Dispatch<React.SetStateAction<IAlbumMutation>>, e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({...prevState, [e.target.name]: e.target.value}));
};
