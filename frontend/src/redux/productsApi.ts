import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListBrand, ListCategory, MinMax, Product, Tag } from '../types/data';
import { Ordering } from '../types/filters';

const BASE_URL = 'http://127.0.0.1:8000/api/';

interface ProductFilters {
  search: string;
  ordering: Ordering;
  tag: number | undefined;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductFilters>({
      query: (args) => ({
        url: `products/`,
        params: {
          search: args.search,
          ordering: args.ordering,
          tags__id: args.tag !== 0 ? args.tag : undefined,
        }
      }),
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
