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
} from '../../types/data';
import { CatalogFilters } from '../../types/filters';
import { baseQueryWithReauth } from '../baseQuery';
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
  tagTypes: ['Product', 'SavedProduct', 'MyCounts', 'ProductDetail', 'Cart', 'Order', 'Reviews', 'MyReviews'],
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
      providesTags: ['Reviews'],
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
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation<void, OderedProductInput[]>({
      query: (data) => ({
        url: `create-order/`,
        method: 'POST',
        body: { products: data },
      }),
      invalidatesTags: ['Order'],
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

export function useToggleCart(agrs: {
  productId: number;
  productVariantId: number;
  isInCart: boolean;
  amount: number;
}) {
  const { productId, productVariantId, isInCart, amount } = agrs;

  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();

  const isLoading = isAddLoading || isRemoveLoading;

  function toggleCart() {
    if (isInCart) {
      // todo: удалять по variant_id. В целом сделать возможность хранить варианты одного и того же товара
      removeFromCart({ productId });
    } else {
      addToCart({
        variant_id: productVariantId,
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
