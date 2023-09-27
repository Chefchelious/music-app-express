import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError } from '../types';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import { RootState } from '../app/store';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: ValidationError}
>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/users/sessions', {
      headers: { 'Authorization': token },
    });

    dispatch(unsetUser());
  },
);
