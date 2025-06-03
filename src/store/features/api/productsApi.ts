/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/products/productsApi.ts

import { Product, ProductOption } from '@/types/system';
import { apiSlice } from '../api/apiSlice';
interface Menu {
    category: string
    shortDescription: string,
    longDescription: string,
    items: Product[]
}
export const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // 1. Obtener todos los productos
    getProducts: build.query<Product[], void>({
      query: () => ({ url: '/products', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Product' as const, id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Product' as const, id })),
      ],
    }),

    // 2. Obtener un producto por ID
    getProduct: build.query<Product, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Product' as const, id }],
    }),

    // 3. Crear producto
    createProduct: build.mutation<Product, Partial<Product>>({
      query: (newProd) => ({
        url: '/products',
        method: 'POST',
        body: newProd,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    // 4. Actualizar producto
    updateProduct: build.mutation<Product, Product>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product' as const, id }],
    }),

    // 5. Borrar producto
    deleteProduct: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Product' as const, id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    // 6. Cambiar estado (PATCH /products/:id/status)
    updateProductStatus: build.mutation<Product, { id: string; status: 'AVAILABLE' | 'DISABLED' }>({
      query: ({ id, status }) => ({
        url: `/products/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product' as const, id }],
    }),

    // 7. Asignar opciones a un producto
    setProductOptions: build.mutation<ProductOption[], { id: string; options: Partial<ProductOption>[] }>({
      query: ({ id, options }) => ({
        url: `/products/${id}/options`,
        method: 'POST',
        body: options,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product' as const, id }],
    }),
      // 7. Asignar opciones a un producto
    getMenu: build.query<Menu[], void>({
      query: () => ({
        url: `/menu`,
        method: 'GET',
      }),

    }),


    // 8. Listar opciones de un producto
    getProductOptions: build.query<ProductOption[], string>({
      query: (id) => ({ url: `/products/${id}/options`, method: 'GET' }),
      providesTags: (result = [], _err,) => [
        { type: 'ProductOptions' as const, id: 'LIST' },
        ...result.map(({ id: optId }) => ({ type: 'ProductOptions' as const, id: optId })),
      ],
    }),
   // 10. Obtener sugerencias para un producto
    getProductSuggestions: build.query<Product[], string>({
      query: (id) => ({
        url: `/products/${id}/suggestions`,
        method: 'GET',
      }),
      providesTags: (_res, _err, id) => [
        { type: 'ProductSuggestions' as const, id },
      ],
    }),
  }),
  overrideExisting: false,
});

// Hooks auto-generados
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
  useSetProductOptionsMutation,
  useGetProductOptionsQuery,
  useGetProductSuggestionsQuery,
  useGetMenuQuery
} = productsApi;
