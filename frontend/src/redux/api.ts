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
  BlogList,
  BlogDetail,
  AppealInput,
  Promocode,
} from '../types/data';
import { CatalogFilters } from '../types/filters';
import { baseQueryWithReauth } from './baseQuery';
import { composeParams, listQueryParam, optionalWithValue } from '../utils/queryParams';
import { LocalCartItem } from './slices/localCart';
import { ActivateEmailInput, LoginInput, RegisterInput, Tokens, UpdateMeInput, User } from '../types/auth';
import { logout, setTokens, setUser } from './slices/userSlice';
import { toast } from 'react-toastify';
import { getTypedStorageItem } from '../localStorageServices';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'SavedProduct', 'ProductDetail', 'Cart', 'Order', 'OrderDetail', 'Reviews', 'MyReviews', 'User', 'IsAuthenticated'],
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
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart', 'User'],
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
      invalidatesTags: ['Product', 'SavedProduct', 'ProductDetail', 'Cart', 'User'],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => `orders/`,
      providesTags: ['Order'],
    }),

    getOrderDetail: builder.query<OrderDetail, { id: string }>({
      query: ({ id }) => `orders/${id}/`,
      providesTags: ['OrderDetail'],
    }),

    createOrder: builder.mutation<{ id: number }, OderedProductInput>({
      query: (data) => ({
        url: `orders/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order', 'Product', 'SavedProduct', 'ProductDetail', 'Cart', 'User'],
    }),

    getPromocode: builder.query<Promocode, string>({
      query: (name) => `promocodes/${name}`,
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
      invalidatesTags: ['Reviews', 'MyReviews', 'Order', 'OrderDetail'],
    }),

    getLocalCart: builder.query<CartVariant[], { items: LocalCartItem[] }>({
      query: ({ items }) => {
        const variantListParams = listQueryParam('variant_id[]', items.map((item) => item.variantId));

        return {
          url: `local-cart-variants/?${variantListParams}`,
        };
      },
    }),

    // Auth
    register: builder.mutation<void, RegisterInput>({
      query(data) {
        return {
          url: 'user/register/',
          method: 'POST',
          body: data,
        };
      },
    }),

    login: builder.mutation<Tokens, LoginInput>({
      query(data) {
        return {
          url: 'token/obtain/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: (result, error) => (
        error
        ? ['IsAuthenticated']
        : ['User', 'IsAuthenticated']
      ),
      transformResponse: (response: Tokens) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data));
          dispatch(api.util.resetApiState());
        } catch (error) {
          toast('Произошла ошибка авторизации!', { type: 'error' });
        }
      },
    }),

    whoAmI: builder.query<User, void>({
      query: () => `user/who-am-i/`,
      providesTags: ['User'],
      transformResponse: (response: User) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          // ...
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout/',
        method: 'POST',
        body: {
          refresh: getTypedStorageItem('refreshToken'),
        },
      }),
      invalidatesTags: ['User', 'IsAuthenticated'],
      async onQueryStarted(_, { dispatch }) {
        dispatch(logout());
        dispatch(api.util.resetApiState());
      },
    }),

    updateMe: builder.mutation<void, UpdateMeInput>({
      query: (data) => ({
        // 0 затычка. Пользователь берется из request.user
        url: `user/${0}/`,
        method: 'PATCH',
        body: {
          ...data,
          birthdate: data.birthdate === '' ? null : data.birthdate,
        },
      }),
      invalidatesTags: ['User'],
    }),

    updateAvatar: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `user/update-avatar/`,
        method: 'PATCH',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['User'],
    }),

    activateEmail: builder.mutation<void, ActivateEmailInput>({
      query: (data) => ({
        url: `email/activate/`,
        method: 'POST',
        body: data,
      }),
    }),

    resendActivation: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: `email/resend/`,
        method: 'POST',
        body: data,
      }),
    }),

    amIAuthenticated: builder.query<boolean, void>({
      query: () => `am-i-authenticated/`,
      providesTags: ['IsAuthenticated'],
    }),

    createAppeal: builder.mutation<void, AppealInput>({
      query: (data) => ({
        url: `create-appeal/`,
        method: 'POST',
        body: data,
      }),
    }),

    // Blog
    getBlogs: builder.query<BlogList[], { tag?: number }>({
      query: ({ tag }) => ({
        url: `blogs/`,
        params: {
          tags__id: optionalWithValue(tag, 0),
        },
      }),
    }),

    getBlogDetail: builder.query<BlogDetail, { id: string }>({
      query: ({ id }) => `blogs/${id}/`,
    }),

    getBlogTags: builder.query<Tag[], void>({
      query: () => `tags/blog/`,
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
  useGetPromocodeQuery,
  useCancelOrderMutation,
  useGetOrderDetailQuery,
  useCreateReviewMutation,

  // Auth
  useRegisterMutation,
  useLoginMutation,
  useWhoAmIQuery,
  useLogoutMutation,
  useUpdateMeMutation,
  useUpdateAvatarMutation,
  useActivateEmailMutation,
  useResendActivationMutation,
  useAmIAuthenticatedQuery,
  useCreateAppealMutation,

  // Blog
  useGetBlogsQuery,
  useGetBlogDetailQuery,
  useGetBlogTagsQuery,
} = api;
