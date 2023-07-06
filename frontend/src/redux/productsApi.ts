import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ListBrand,
  ListCategory,
  MinMax,
  ListProduct,
  Tag,
  DetailProduct,
  Review
} from '../types/data';
import { CatalogOrdering } from '../types/filters';

const BASE_URL = 'http://127.0.0.1:8000/api/';

interface ProductFilters {
  search: string;
  ordering: CatalogOrdering;
  tag: number;
  minPrice: number;
  maxPrice: number;
  subcategoryIds: number[];
  brandIds: number[];
}

function optionalWithValue(arg: number, value: number) {
  return arg !== value ? arg : undefined;
}

function listQueryParam(name: string, ids: number[]) {
  return ids.map((id) => `${name}=${id}`).join('&');
}

function composeParams(params: string[]) {
  return `?${params.join('&')}`;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ListProduct[], ProductFilters>({
      query: ({
        search,
        ordering,
        tag,
        minPrice,
        maxPrice,
        subcategoryIds,
        brandIds,
      }) => {
        const subcategoryListParams = listQueryParam('subcategory_id[]', subcategoryIds);
        const brandListParams = listQueryParam('brand_id[]', brandIds);
        const composedParams = composeParams([subcategoryListParams, brandListParams]);

        return {
          url: `products/` + composedParams,
          params: {
            search: search,
            ordering: ordering,
            tags__id: optionalWithValue(tag, 0),
            min_price: optionalWithValue(minPrice, 0),
            max_price: optionalWithValue(maxPrice, 0),
          }
        }
      },
    }),

    getProductDetail: builder.query<DetailProduct, { id: string }>({
      query: ({ id }) => `product/${id}`,
    }),

    getReviewsById: builder.query<Review[], {
      id: number,
      ordering: string,
    }>({
      query: ({ id, ordering }) => ({
        url: `reviews/${id}`,
        params: { ordering },
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
  useGetProductDetailQuery,
  useGetReviewsByIdQuery,
  useGetTagsQuery,
  useGetMinMaxPriceQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
} = productsApi;
