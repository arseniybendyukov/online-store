import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { AppealInput } from '../../types/data';

export const appealsApi = createApi({
  reducerPath: 'appealsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createAppeal: builder.mutation<void, AppealInput>({
      query: (data) => ({
        url: `create-appeal/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateAppealMutation } = appealsApi;
