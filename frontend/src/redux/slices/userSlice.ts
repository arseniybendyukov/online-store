import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessToken, Tokens, User } from '../../types/auth';
import { removeTypedStorageItem, setTypedStorageItem } from '../../localStorageServices';

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
      setTypedStorageItem('accessToken', action.payload.access);
      setTypedStorageItem('refreshToken', action.payload.refresh);
    },

    refreshToken: (_, action: PayloadAction<AccessToken>) => {
      setTypedStorageItem('accessToken', action.payload.access);
    },
    
    logout: (state) => {
      state.user = null;
      removeTypedStorageItem('accessToken');
      removeTypedStorageItem('refreshToken');
    },
  },
});

export const {
  setUser,
  setTokens,
  refreshToken,
  logout,
} = userSlice.actions;
