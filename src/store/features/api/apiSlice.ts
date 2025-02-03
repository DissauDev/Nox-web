import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // Nombre del slice en el store
  baseQuery: fetchBaseQuery({ baseUrl: 'http://jump2bot.online' }), // URL base para las solicitudes
  endpoints: (builder) => ({
    getItems: builder.query<unknown[], void>({
      query: () => '/user/all', // Ruta de la API
    }),
    addItem: builder.mutation<void, { name: string }>({
      query: (item) => ({
        url: '/items',
        method: 'POST',
        body: item,
      }),
    }),
  }),
});

// Exportar hooks generados automáticamente por RTK Query
export const { useGetItemsQuery, useAddItemMutation } = apiSlice;
