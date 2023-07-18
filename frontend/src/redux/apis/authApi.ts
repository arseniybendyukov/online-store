import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginInput, RefreshToken, RegisterInput, Tokens, User, UserWithTokens } from '../../types/auth';
import { logout, setTokens, setUser } from '../slices/userSlice';
import { baseQueryWithReauth } from '../baseQueryWithReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<UserWithTokens, RegisterInput>({
      query(data) {
        return {
          url: 'register/',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: UserWithTokens) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: { tokens, ...user } } = await queryFulfilled;
          dispatch(setTokens(tokens));
          dispatch(setUser(user));
        } catch (error) {
          // ...
        }
      },
    }),

    obtainTokens: builder.mutation<Tokens, LoginInput>({
      query(data) {
        return {
          url: 'token/obtain/',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: Tokens) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
        } catch (error) {
          // ...
        }
      },
    }),

    whoAmI: builder.query<User, void>({
      query: () => `who-am-i/`,
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

    logout: builder.mutation<void, RefreshToken>({
      query(data) {
        return {
          url: 'logout/',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());
        } catch (error) {
          // ...
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useObtainTokensMutation,
  useWhoAmIQuery,
  useLogoutMutation,
} = authApi;
