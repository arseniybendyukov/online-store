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
  SavedProductVariant,
  CartItem,
  OderedProductInput,
  Order,
  OrderDetail,
  VoteOnReviewInput,
  ReviewCreationInput,
  CategoryIds,
} from '../../types/data';
import { CatalogFilters } from '../../types/filters';
import { baseQueryWithReauth } from '../baseQuery';
import { UserCounts } from '../../types/auth';
import { composeParams, listQueryParam, optionalWithValue } from '../../utils/queryParams';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart', 'Order', 'OrderDetail', 'Reviews', 'MyReviews'],
  endpoints: (builder) => ({
    getProducts: builder.query<ListProduct[], CatalogFilters>({
      query: ({
        search,
        ordering,
        tag,
        category,
        minPrice,
        maxPrice,
        brandIds=[],
        limit,
      }) => {
        const brandListParams = listQueryParam('brand_id[]', brandIds);
        const composedParams = composeParams([brandListParams]);

        return {
          url: `products/` + composedParams,
          params: {
            search,
            ordering,
            tags__id: optionalWithValue(tag, 0),
            category: optionalWithValue(category, null),
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
      providesTags: ['Reviews'],
    }),

    getTags: builder.query<Tag[], void>({
      query: () => `product-tags/`,
    }),

    getMinMaxPrice: builder.query<MinMax, void>({
      query: () => `min-max-price/`,
    }),

    getCategories: builder.query<ListCategory[], void>({
      query: () => `categories/`,
    }),

    getCategoryIds: builder.query<CategoryIds[], void>({
      query: () => `category-ids/`,
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
      providesTags: ['MyReviews'],
    }),

    getSavedProductVariants: builder.query<SavedProductVariant[], void>({
      query: () => `saved-products/`,
      providesTags: ['SavedProduct'],
    }),

    addToSaved: builder.mutation<void, { variant_id: number; }>({
      query: (data) => ({
        url: `add-to-saved/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    removeFromSaved: builder.mutation<void, { variant_id: number; }>({
      query: (data) => ({
        url: `remove-from-saved/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    toggleSaved: builder.mutation<void, { variant_id: number; }>({
      query: (data) => ({
        url: `toggle-saved/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    getCart: builder.query<CartItem[], void>({
      query: () => `cart/`,
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<void, { variant: number; amount: number; }>({
      query: (data) => ({
        url: `add-to-cart/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    // todo: переименовать все входные данные под camelCase
    removeFromCart: builder.mutation<void, { variant_id: number; }>({
      query: (data) => ({
        url: `remove-from-cart/`,
        method: 'DELETE',
        body: data,
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
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation<{ id: number }, OderedProductInput[]>({
      query: (data) => ({
        url: `create-order/`,
        method: 'POST',
        body: { products: data },
      }),
      invalidatesTags: ['Order', 'Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    getOrderDetail: builder.query<OrderDetail, { id: string }>({
      query: ({ id }) => `order/${id}`,
      providesTags: ['OrderDetail'],
    }),

    cancelOrder: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `cancel-order/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Order', 'OrderDetail'],
    }),

    voteOnReview: builder.mutation<void, VoteOnReviewInput>({
      query: (data) => ({
        url: 'vote/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews', 'MyReviews'],
    }),

    createReview: builder.mutation<void, ReviewCreationInput>({
      query: (data) => ({
        url: 'create-review/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews', 'MyReviews'],
    }),
  }),
});

export function useToggleCart({
  variantId,
  isInCart,
  amount,
}: {
  variantId: number;
  isInCart: boolean;
  amount: number;
}) {
  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();

  const isLoading = isAddLoading || isRemoveLoading;

  function toggleCart() {
    if (isInCart) {
      removeFromCart({ variant_id: variantId });
    } else {
      addToCart({
        variant: variantId,
        amount,
      });
    }
  }

  return { toggleCart, isLoading };
}

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetReviewsByIdQuery,
  useGetTagsQuery,
  useGetMinMaxPriceQuery,
  useGetCategoriesQuery,
  useGetCategoryIdsQuery,
  useGetBrandsQuery,
  useVoteOnReviewMutation,

  // Profile API
  useGetMyCountsQuery,
  useGetMyReviewsQuery,
  useGetSavedProductVariantsQuery,
  useAddToSavedMutation,
  useRemoveFromSavedMutation,
  useToggleSavedMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartAmountMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useGetOrderDetailQuery,
  useCreateReviewMutation,
} = productsApi;
