import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterMutation, RegisterResponse, ValidationError } from '../types';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';

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