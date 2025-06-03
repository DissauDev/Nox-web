// src/features/pages/pagesApi.ts

import { apiSlice } from '../api/apiSlice'


export interface Page {
  id: number;
  title: string;
  slug: string;
  layout: unknown;      // Json
  isPublished: boolean;
  createdAt: string;    // DateTime viene como ISO string
  updatedAt: string;    // DateTime viene como ISO string
  author?: string | 
  null;
}

export interface PaginatedMeta {
  total: number;  // total de registros
  page: number;   // página actual
  limit: number;  // elementos por página

}

export const pagesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // 1) Listado con búsqueda, orden y paginación
    getPages: build.query<
      { data: Page[]; meta: PaginatedMeta },
      { search?: string; sort?: 'newest' | 'oldest'; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/pages',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Page' as const, id })),
              { type: 'Page', id: 'LIST' },
            ]
          : [{ type: 'Page', id: 'LIST' }],
    }),

    // 2) Obtener una página por slug
    getPageBySlug: build.query<Page, string>({
      query: (slug) => ({
        url: `/pages/${slug}`,
        method: 'GET',
      }),
      providesTags: (result, error, slug) => [{ type: 'Page' as const, id: slug }],
    }),

    // 3) Crear página
    createPage: build.mutation<Page, Partial<Page>>({
      query: (body) => ({
        url: '/pages',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Page', id: 'LIST' }],
    }),

    // 4) Actualizar página
    updatePage: build.mutation<Page, { id: string; data: Partial<Page> }>({
      query: ({ id, data }) => ({
        url: `/pages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Page' as const, id },
        { type: 'Page', id: 'LIST' },
      ],
    }),

    // 5) Eliminar página
    deletePage: build.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/pages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Page' as const, id },
        { type: 'Page', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPagesQuery,
  useGetPageBySlugQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pagesApi
