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
  tagTypes: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart', 'Order', 'Reviews', 'MyReviews'],
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

    removeFromCart: builder.mutation<void, { variantId: number }>({
      query: ({ variantId }) => ({
        url: `remove-from-cart/${variantId}`,
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
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation<{ id: number }, OderedProductInput[]>({
      query: (data) => ({
        url: `create-order/`,
        method: 'POST',
        body: { products: data },
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart'],
    }),

    getOrderDetail: builder.query<OrderDetail, { id: string }>({
      query: ({ id }) => `order/${id}`,
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

export function useToggleSaved(id: number, isSaved: boolean) {
  const [addToSaved, { isLoading: isAddLoading }] = useAddToSavedMutation();
  const [removeFromSaved, { isLoading: isRemoveLoading }] = useRemoveFromSavedMutation();

  const isLoading = isAddLoading || isRemoveLoading;

  function toggleSaved() {
    if (isSaved) {
      removeFromSaved({ id });
    } else {
      addToSaved({ id });
    }
  }

  return { toggleSaved, isLoading };
}

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
      removeFromCart({ variantId });
    } else {
      addToCart({
        variant_id: variantId,
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
  useGetSavedProductsQuery,
  useAddToSavedMutation,
  useRemoveFromSavedMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartAmountMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderDetailQuery,
  useCreateReviewMutation,
} = productsApi;
