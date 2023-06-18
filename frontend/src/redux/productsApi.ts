import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/data'; 

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products/`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
