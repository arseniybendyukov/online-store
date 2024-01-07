import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';
import { BlogDetail, BlogList, Tag } from '../../types/data';
import { optionalWithValue } from '../../utils/queryParams';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogList[], { tag?: number }>({
      query: ({ tag }) => ({
        url: `blogs/`,
        params: {
          tags__id: optionalWithValue(tag, 0),
        },
      }),
    }),

    getBlogDetail: builder.query<BlogDetail, { id: string }>({
      query: ({ id }) => `blogs/${id}/`,
    }),

    getBlogTags: builder.query<Tag[], void>({
      query: () => `tags/blog/`,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailQuery,
  useGetBlogTagsQuery,
} = blogApi;
