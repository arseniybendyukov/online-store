import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productsApi } from './apis/productsApi';
import { appealsApi } from './apis/appealsApi';
import { authApi } from './apis/authApi';
import { blogApi } from './apis/blogApi';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [appealsApi.reducerPath]: appealsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    userState: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    appealsApi.middleware,
    authApi.middleware,
    productsApi.middleware,
    blogApi.middleware,
  ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
