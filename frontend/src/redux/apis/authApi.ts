import { createApi } from '@reduxjs/toolkit/query/react';
import { ActivateEmailInput, LoginInput, RegisterInput, Tokens, UpdateMeInput, User } from '../../types/auth';
import { logout, setTokens, setUser } from '../slices/userSlice';
import { baseQueryWithReauth } from '../baseQuery';
import { productsApi } from './productsApi';
import { toast } from 'react-toastify';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'IsAuthenticated'],
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterInput>({
      query(data) {
        return {
          url: 'register/',
          method: 'POST',
          body: data,
        };
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
      invalidatesTags: ['User', 'IsAuthenticated'],
      transformResponse: (response: Tokens) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
          dispatch(productsApi.util.resetApiState());
        } catch (error) {
          toast('Произошла ошибка авторизации!', { type: 'error' });
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

    amIAuthenticated: builder.query<boolean, void>({
      query: () => `am-i-authenticated/`,
      providesTags: ['IsAuthenticated'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout/',
        method: 'POST',
        body: {
          refresh: localStorage.getItem('refreshToken') || ''
        },
      }),
      invalidatesTags: ['User', 'IsAuthenticated'],
      async onQueryStarted(_, { dispatch }) {
        dispatch(logout());
        dispatch(productsApi.util.resetApiState());
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

    activateEmail: builder.mutation<void, ActivateEmailInput>({
      query: (data) => ({
        url: `activate-email/`,
        method: 'POST',
        body: data,
      }),
    }),

    resendActivation: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: `resend-activation/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useWhoAmIQuery,
  useAmIAuthenticatedQuery,
  useLogoutMutation,
  useUpdateMeMutation,
  useActivateEmailMutation,
  useResendActivationMutation,
} = authApi;
