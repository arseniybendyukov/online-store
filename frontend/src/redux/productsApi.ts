import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListBrand, ListCategory, MinMax, Product, Tag } from '../types/data'; 

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

    getMinMaxPrice: builder.query<MinMax, void>({
      query: () => `min-max-price/`,
    }),

    getCategories: builder.query<ListCategory[], void>({
      query: () => `categories/`,
    }),

    getBrands: builder.query<ListBrand[], void>({
      query: () => `brands/`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTagsQuery,
  useGetMinMaxPriceQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
} = productsApi;
