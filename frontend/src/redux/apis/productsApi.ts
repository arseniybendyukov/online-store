import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BrandImage,
  BrandCount,
  TreeCategory,
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
  CartVariant,
  MinMax,
} from '../../types/data';
import { CatalogFilters } from '../../types/filters';
import { baseQueryWithReauth } from '../baseQuery';
import { composeParams, listQueryParam, optionalWithValue } from '../../utils/queryParams';
import { LocalCartItem } from '../slices/localCart';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'SavedProduct', 'ProductDetail', 'Cart', 'Order', 'OrderDetail', 'Reviews', 'MyReviews'],
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
        // TODO: реорганизовать query params
        const brandListParams = listQueryParam('brand_id[]', brandIds);
        const composedParams = composeParams([brandListParams]);

        return {
          url: `products/` + composedParams,
          params: {
            search,
            ordering,
            tags__id: optionalWithValue(tag, 0),
            category: optionalWithValue(category, null),
            min_price: optionalWithValue(minPrice, null),
            max_price: optionalWithValue(maxPrice, null),
            limit,
          }
        }
      },
      providesTags: ['Product'],
    }),

    getProductDetail: builder.query<DetailProduct, { id: string }>({
      query: ({ id }) => `products/${id}`,
      providesTags: ['ProductDetail'],
    }),

    getReviewsById: builder.query<Review[], {
      id: number,
      ordering: string,
    }>({
      query: ({ id, ordering }) => ({
        url: `public-reviews/${id}`,
        params: { ordering },
      }),
      providesTags: ['Reviews'],
    }),

    getTags: builder.query<Tag[], void>({
      query: () => `tags/product/`,
    }),

    getMinMaxPrice: builder.query<MinMax, void>({
      query: () => `min-max-price/`,
    }),

    // TODO: соответственно переименовать url
    getCategories: builder.query<TreeCategory[], void>({
      query: () => `categories/tree/`,
    }),

    getCategoryIds: builder.query<CategoryIds[], void>({
      query: () => `categories/roots/`,
    }),

    getBrandImages: builder.query<BrandImage[], void>({
      query: () => `brands/images/`,
    }),

    getBrandCounts: builder.query<BrandCount[], void>({
      query: () => `brands/counts/`,
    }),

    // Profile API
    getMyReviews: builder.query<MyReview[], void>({
      query: () => `private-reviews/`,
      providesTags: ['MyReviews'],
    }),

    getSavedProductVariants: builder.query<SavedProductVariant[], void>({
      query: () => `saved-variants/`,
      providesTags: ['SavedProduct'],
    }),

    removeFromSaved: builder.mutation<void, { variantId: number; }>({
      query: ({ variantId }) => ({
        url: `saved-variants/${variantId}/remove/`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart'],
    }),

    toggleSaved: builder.mutation<void, { variantId: number; }>({
      query: ({ variantId }) => ({
        url: `saved-variants/${variantId}/toggle/`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart'],
    }),

    getCart: builder.query<CartItem[], void>({
      query: () => `cart-items/`,
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<void, { variant: number; amount: number; }>({
      query: (data) => ({
        url: `cart-items/`,
        method: 'POST',
        body: data,
      }),
      // TODO: update User (cart items count)
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart'],
    }),

    updateCartAmount: builder.mutation<void, { cartItemId: number; amount: number; }>({
      query: ({ cartItemId, amount }) => ({
        url: `cart-items/${cartItemId}/`,
        method: 'PATCH',
        body: { amount },
      }),
      invalidatesTags: ['Cart'],
    }),

    // TODO: переименовать все входные данные под camelCase
    removeFromCart: builder.mutation<void, { id: number; }>({
      query: ({ id }) => ({
        url: `cart-items/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart'],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => `orders/`,
      providesTags: ['Order'],
    }),

    getOrderDetail: builder.query<OrderDetail, { id: string }>({
      query: ({ id }) => `orders/${id}/`,
      providesTags: ['OrderDetail'],
    }),

    createOrder: builder.mutation<{ id: number }, OderedProductInput[]>({
      query: (data) => ({
        url: `orders/`,
        method: 'POST',
        body: { products: data },
      }),
      invalidatesTags: ['Order', 'Product', 'SavedProduct', 'ProductDetail', 'Cart'],
    }),

    cancelOrder: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `orders/${id}/cancel/`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Order', 'OrderDetail'],
    }),

    voteOnReview: builder.mutation<void, VoteOnReviewInput>({
      query: (data) => ({
        url: 'create-vote/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews', 'MyReviews'],
    }),

    createReview: builder.mutation<void, ReviewCreationInput>({
      query: (data) => ({
        url: 'private-reviews/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews', 'MyReviews'],
    }),

    getLocalCart: builder.query<CartVariant[], { items: LocalCartItem[] }>({
      query: ({ items }) => {
        const variantListParams = listQueryParam('variant_id[]', items.map((item) => item.variantId));

        return {
          url: `local-cart-variants/?${variantListParams}`,
        };
      },
    }),
  }),
});

export function useToggleRemoteCart({
  cartItemId,
  variantId,
  amount,
}: {
  cartItemId: number | null;
  variantId: number;
  amount: number;
}) {
  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();

  const isLoading = isAddLoading || isRemoveLoading;

  function toggleCart() {
    if (cartItemId !== null) {
      removeFromCart({ id: cartItemId });
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
  useGetBrandImagesQuery,
  useGetBrandCountsQuery,
  useVoteOnReviewMutation,
  useGetLocalCartQuery,

  // Profile API
  useGetMyReviewsQuery,
  useGetSavedProductVariantsQuery,
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
