import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Brand,
  ListCategory,
  MinMax,
  ListProduct,
  Tag,
  DetailProduct,
  Review,
  MyReview,
  SavedProduct,
  CartItem,
  OderedProductInput,
  Order
} from '../../types/data';
import { CatalogFilters } from '../../types/filters';
import { baseQueryWithReauth } from '../baseQueryWithReauth';
import { UserCounts } from '../../types/auth';

function optionalWithValue(arg: number | undefined, value: number) {
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
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
  endpoints: (builder) => ({
    getProducts: builder.query<ListProduct[], CatalogFilters>({
      query: ({
        search,
        ordering,
        tag,
        minPrice,
        maxPrice,
        subcategoryIds=[],
        brandIds=[],
        limit,
      }) => {
        const subcategoryListParams = listQueryParam('subcategory_id[]', subcategoryIds);
        const brandListParams = listQueryParam('brand_id[]', brandIds);
        const composedParams = composeParams([subcategoryListParams, brandListParams]);

        return {
          url: `products/` + composedParams,
          params: {
            search,
            ordering,
            tags__id: optionalWithValue(tag, 0),
            min_price: optionalWithValue(minPrice, 0),
            max_price: optionalWithValue(maxPrice, 0),
            limit,
          }
        }
      },
      providesTags: ['Product'],
    }),

    getProductDetail: builder.query<DetailProduct, { id: string }>({
      query: ({ id }) => `product/${id}`,
      providesTags: ['ProductDetail'],
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

    getBrands: builder.query<Brand[], void>({
      query: () => `brands/`,
    }),

    // Profile API
    getMyCounts: builder.query<UserCounts, void>({
      query: () => `my-counts/`,
      providesTags: ['MyCounts'],
    }),

    getMyReviews: builder.query<MyReview[], void>({
      query: () => `my-reviews/`,
    }),

    getSavedProducts: builder.query<SavedProduct[], void>({
      query: () => `saved-products/`,
      providesTags: ['SavedProduct'],
    }),

    addToSaved: builder.mutation<void, { id: number; }>({
      query: ({ id }) => ({
        url: `add-to-saved/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    removeFromSaved: builder.mutation<void, { id: number; }>({
      query: ({ id }) => ({
        url: `remove-from-saved/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    getCart: builder.query<CartItem[], void>({
      query: () => `cart/`,
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<void, { variant_id: number; amount: number; }>({
      query: (data) => ({
        url: `add-to-cart/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    removeFromCart: builder.mutation<void, { productId: number }>({
      query: ({ productId }) => ({
        url: `remove-from-cart/${productId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    updateCartAmount: builder.mutation<void, { cartItemId: number; amount: number; }>({
      query: ({ cartItemId, amount }) => ({
        url: `update-cart-amount/${cartItemId}`,
        method: 'PATCH',
        body: { amount },
      }),
      invalidatesTags: ['Cart'],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => `orders/`,
    }),

    createOrder: builder.mutation<void, OderedProductInput[]>({
      query: (data) => ({
        url: `create-order/`,
        method: 'POST',
        body: { products: data },
      }),
    }),
  }),
});

export function useToggleSaved(id: number, isSaved: boolean) {
  const [addToSaved] = useAddToSavedMutation();
  const [removeFromSaved] = useRemoveFromSavedMutation();

  return () => {
    if (isSaved) {
      removeFromSaved({ id });
    } else {
      addToSaved({ id });
    }
  };
}

export function useToggleCart(agrs: {
  productId: number;
  productVariantId: number;
  isInCart: boolean;
  amount: number;
}) {
  const { productId, productVariantId, isInCart, amount } = agrs;

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  return () => {
    if (isInCart) {
      removeFromCart({ productId });
    } else {
      addToCart({
        variant_id: productVariantId,
        amount,
      });
    }
  };
}

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetReviewsByIdQuery,
  useGetTagsQuery,
  useGetMinMaxPriceQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,

  // Profile API
  useGetMyCountsQuery,
  useGetMyReviewsQuery,
  useGetSavedProductsQuery,
  useAddToSavedMutation,
  useRemoveFromSavedMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartAmountMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
} = productsApi;
