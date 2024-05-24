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
import { api } from './api';
import { paymentApi } from './payment-api';
import { userSlice } from './slices/userSlice';
import { localCartSlice } from './slices/localCart';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
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
      api.middleware,
      paymentApi.middleware
    ]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
