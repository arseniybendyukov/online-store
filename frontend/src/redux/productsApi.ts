import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Tag } from '../types/data'; 

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products/`,
    }),

    getTags: builder.query<Tag[], void>({
      query: () => `tags/`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTagsQuery,
} = productsApi;
