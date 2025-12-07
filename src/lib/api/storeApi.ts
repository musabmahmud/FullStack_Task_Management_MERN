
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Constants
const OWNER_ID = '683affb1040c9f175ef78d59'
const BUSINESS_ID = '683b0074040c9f175ef78d91'
const PUBLIC_API_BASE_URL = 'https://backend.calquick.app/v2/api'
// const PUBLIC_API_BASE_URL = 'http://192.168.0.250:5000/v2/api'

// API Definition
export const siteStoreApi = createApi({
  reducerPath: 'siteStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: PUBLIC_API_BASE_URL }),
  tagTypes: ['Product', 'Products', 'Category'],
  endpoints: (builder) => ({
    getBusiness: builder.query<Business, void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) => res.data[0],
    }),

    getProducts: builder.query<
      Product[],
      Partial<{ search?: string; page?: number; limit?: number; _id?: string }>
    >({
      query: (params = {}) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/products`,
        params,
      }),
      transformResponse: (res: ApiResponse<Product[]>) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Product' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (productId) =>
        `/public/${OWNER_ID}/${BUSINESS_ID}/products?_id=${productId}`,
      transformResponse: (res: ApiResponse<Product>) => res.data,
      providesTags: (result) =>
        result
          ? [{ type: 'Product', id: result._id }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    createOnlineOrder: builder.mutation<
      OnlineOrderResponse,
      OnlineOrderPayload
    >({
      query: (orderData) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/online-order`,
        method: 'POST',
        body: orderData,
      }),
    }),

    getCategories: builder.query<Category[], void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) =>
        res.data[0].categories,
      providesTags: (result) =>
        result
          ? result.map((category) => ({
              type: 'Category' as const,
              id: category._id,
            }))
          : [],
    }),
  }),
})

// Export hooks
export const {
  useGetBusinessQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOnlineOrderMutation,
  useGetCategoriesQuery,
} = siteStoreApi
