import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Payment } from '../types/data';

export const paymentApi = createApi({
  reducerPath: 'payment-api',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Basic ${btoa(`${process.env.REACT_APP_SHOP_ID}:${process.env.REACT_APP_SECRET_KEY}`)}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPayment: builder.mutation<Payment, { orderId: number; sum: number; }>({
      query: ({ orderId, sum }) => ({
        url: `v3/payments`,
        method: 'POST',
        headers: { 'Idempotence-Key': `${Math.floor(Math.random() * (10000))  + Date.now()}` },
        body: {
          "amount": {
            "value": sum,
            "currency": "RUB"
          },
          "confirmation": {
            "type": "embedded"
          },
          "capture": true,
          "description": `Заказ №${orderId}`,
        },
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
} = paymentApi;
