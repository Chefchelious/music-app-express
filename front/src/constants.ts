import React from 'react';
import { IAlbumMutation } from './types';

export const apiUrl = 'http://localhost:8000';

export const formWorkInput = (setState:  React.Dispatch<React.SetStateAction<IAlbumMutation>>, e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({...prevState, [e.target.name]: e.target.value}));
};
