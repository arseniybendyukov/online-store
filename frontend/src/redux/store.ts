import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsApi } from './apis/productsApi';
import { appealsApi } from './apis/appealsApi';
import { authApi } from './apis/authApi';
import { blogApi } from './apis/blogApi';
import { userSlice } from './slices/userSlice';
import { localCartSlice } from './slices/localCart';

const rootReducer = combineReducers({
  [appealsApi.reducerPath]: appealsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
  userState: userSlice.reducer,
  localCartState: localCartSlice.reducer,
});
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['localCartState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      appealsApi.middleware,
      authApi.middleware,
      productsApi.middleware,
      blogApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
