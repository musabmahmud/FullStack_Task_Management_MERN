// endpointApi.ts
import { baseApi } from '../../api/baseApi'

interface EndpointResponse {
  _id: string
  name: string
  method: string
  category: string
  route: string
  action: string
  resource?: string
  createdAt: string
  updatedAt: string
}

interface MetaResponse {
  totalData: number
  totalPage: number
  currentPage: number
  itemsPerPage: number
}

const endpointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEndpoint: builder.mutation({
      query: (endpointData) => ({
        url: '/end-points/create',
        method: 'POST',
        body: endpointData,
      }),
      invalidatesTags: ['endpoints'],
    }),

    allEndpoints: builder.query({
      query: (params: { search?: string; page: number; limit: number }) => ({
        url: '/end-points',
        method: 'GET',
        params: {
          search: params.search,
          page: params.page,
          limit: params.limit,
        },
      }),
      transformResponse: (response: {
        data: EndpointResponse[]
        meta: MetaResponse
      }) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ['endpoints'],
    }),

    updateEndpoint: builder.mutation({
      query: ({ id, ...endpointData }) => ({
        url: `/end-points/${id}/update`,
        method: 'PUT',
        body: endpointData,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'endpoints', id: arg.id }],
    }),

    deleteEndpoint: builder.mutation({
      query: (id) => ({
        url: `/end-points/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'endpoints', id }],
    }),
  }),
})

export const {
  useCreateEndpointMutation,
  useAllEndpointsQuery,
  useUpdateEndpointMutation,
  useDeleteEndpointMutation,
} = endpointApi
