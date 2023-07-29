import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput, RegisterInput, Tokens, UpdateMeInput, User } from '../../types/auth';
import { logout, setTokens, setUser } from '../slices/userSlice';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { productsApi } from './productsApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterInput>({
      query(data) {
        return {
          url: 'register/',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.login.initiate({ email, password }));
        } catch (error) {
          // ...
        }
      },
    }),

    login: builder.mutation<Tokens, LoginInput>({
      query(data) {
        return {
          url: 'token/obtain/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['User'],
      transformResponse: (response: Tokens) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
          
          // todo: сделать ?функцию? и не копипастить один и тот же код для сброса состояния
          // Сброс состояния, чтобы новый пользовательfetch не увидел данные старого пользователя
          dispatch(authApi.util.resetApiState());
          dispatch(productsApi.util.resetApiState());

          await dispatch(authApi.endpoints.whoAmI.initiate());
        } catch (error) {
          // ...
        }
      },
    }),

    whoAmI: builder.query<User, void>({
      query: () => `who-am-i/`,
      providesTags: ['User'],
      transformResponse: (response: User) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          // ...
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query() {
        const refresh = localStorage.getItem('refreshToken') || '';

        return {
          url: 'logout/',
          method: 'POST',
          body: { refresh },
        };
      },
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());

          // Сброс состояния, чтобы новый пользователь не увидел данные старого пользователя
          dispatch(authApi.util.resetApiState());
          dispatch(productsApi.util.resetApiState());
        } catch (error) {
          // ...
        }
      },
    }),

    updateMe: builder.mutation<void, UpdateMeInput>({
      query: (data) => ({
        url: `update-me/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useWhoAmIQuery,
  useLogoutMutation,
  useUpdateMeMutation,
} = authApi;
