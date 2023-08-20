import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { BlogDetail, BlogList } from '../../types/data';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogList[], void>({
      query: () => `blog/`,
    }),

    getBlogDetail: builder.query<BlogDetail, { id: string }>({
      query: ({ id }) => `blog/${id}`,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailQuery,
} = blogApi;
