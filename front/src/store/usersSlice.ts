import { IUser } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { register } from './usersThunk';

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
    .addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = false;
    })

    .addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    })

    .addCase(register.rejected, (state) => {
      state.registerLoading = false;
      state.registerError = true;
    });
  },
});

export const userReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;