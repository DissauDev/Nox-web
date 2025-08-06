// src/store/services/storeConfigApi.ts

import { apiSlice } from './apiSlice';

export interface StoreConfig {
  
  taxEnabled: boolean;
  taxPercent: number;
  taxFixed: number;
}

export const storeConfigApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getStoreConfig: build.query<StoreConfig, void>({
      query: () => '/settings/tax',
      providesTags: ['StoreConfig'],
    }),
    updateStoreConfig: build.mutation<StoreConfig, Partial<StoreConfig>>({
      query: (body) => ({
        url: '/settings/tax',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['StoreConfig'],
    }),
  }),
});

export const {
  useGetStoreConfigQuery,
  useUpdateStoreConfigMutation,
} = storeConfigApi;
