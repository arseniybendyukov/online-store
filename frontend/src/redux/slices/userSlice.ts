import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessToken, Tokens, User } from '../../types/auth';
import { redirect } from 'react-router-dom';
import { NavPaths } from '../../navigation';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setTokens: (_, action: PayloadAction<Tokens>) => {
      localStorage.setItem('accessToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.access);
    },

    refreshToken: (_, action: PayloadAction<AccessToken>) => {
      localStorage.setItem('accessToken', action.payload.access);
    },
    
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      redirect(NavPaths.MAIN);
    },
  },
});

export const {
  setUser,
  setTokens,
  refreshToken,
  logout,
} = userSlice.actions;
