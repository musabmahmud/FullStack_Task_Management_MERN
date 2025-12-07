// fraudCheckApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FraudData {
  total_parcels: number;
  total_delivered: number;
}

export const fraudCheckApi = createApi({
  reducerPath: 'fraudCheckApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portal.packzy.com/api/v1/',
  }),
  endpoints: (builder) => ({
    getFraudData: builder.query<FraudData, string>({
      query: (phone) => `fraud_check/${phone}`,
    }),
  }),
});

export const { useGetFraudDataQuery } = fraudCheckApi;
