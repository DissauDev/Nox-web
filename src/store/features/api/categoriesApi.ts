// src/features/categories/categoriesApi.ts
import { Category } from '@/types/system';
import { apiSlice } from '../api/apiSlice';


export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    
    // 1. Listar todas las categorías
    getCategories: build.query<Category[], void>({
      query: () => ({ url: '/categories', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Category' as const, id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
      ],
    }),
       getCategoriesWhithSales: build.query<Category[], void>({
      query: () => ({ url: '/categories-with-sales', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Category' as const, id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
      ],
    }),
      getCategoriesAvailable: build.query<Category[], void>({
      query: () => ({ url: '/categories?avaible=AVAILABLE', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Category' as const, id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
      ],
    }),
       getCategoriesAvailableOnCarousel: build.query<Category[], void>({
      query: () => ({ url: '/categories-available-carousel', method: 'GET' }),
      providesTags: (result = []) => [
        { type: 'Category' as const, id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
      ],
    }),
    // 2. Obtener una categoría por ID
    getCategory: build.query<Category, string>({
      query: (id) => ({ url: `/categories/${id}`, method: 'GET' }),
      providesTags: (_result, _error, id) => [
        { type: 'Category' as const, id },
      ],
    }),
    // 3. Crear una nueva categoría
    createCategory: build.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    // 4. Actualizar una categoría existente
    updateCategory: build.mutation<Category, Category>({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category' as const, id },
      ],
    }),
   
        updateCategoryStatus: build.mutation<Category, { id: string; status: 'AVAILABLE' | 'DISABLED' }>({
          query: ({ id, status }) => ({
            url: `/categories/${id}/status`,
            method: 'PATCH',
            body: { status },
          }),
          invalidatesTags: (_res, _err, { id }) => [{ type: 'Category' as const, id }],
        }),
    // 5. Borrar una categoría
    deleteCategory: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Category' as const, id },
        { type: 'Category', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

// Exportar los hooks generados para usar en tus componentes:
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesAvailableQuery,
  useGetCategoriesWhithSalesQuery,
  useUpdateCategoryStatusMutation,
  useGetCategoriesAvailableOnCarouselQuery
} = categoriesApi;
