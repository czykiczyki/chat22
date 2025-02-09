import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { usersApi } from '../../api';

export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
};

export interface UserState {
  user?: UserType;
  isLoggedIn?: boolean;
}

const initialState: UserState = {
  user: {
    id: undefined,
    name: undefined,
    email: undefined,
    photoUrl: undefined,
  },
  isLoggedIn: undefined,
};

export const getCurrentUserAsync = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const response = await usersApi.getUser();
    return response;
  },
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user?: UserType; isLoggedIn?: boolean }>,
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: state => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUserAsync.pending, () => {})
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUserAsync.rejected, () => {});
  },
});

export const { login, logout, setUser } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.user;

export default authSlice.reducer;
