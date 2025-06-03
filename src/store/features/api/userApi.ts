// src/features/users/usersApi.ts

import { User } from '@/types/system';
import { apiSlice } from '../api/apiSlice';
// Importar las acciones necesarias de authSlice
import {
  loginSuccess,
  authFailure,
  logout as logoutAction,
  refreshTokens as refreshTokensAction,
} from '../slices/authSlice';


export interface PaginatedMeta {
  totalItems: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface CustomerDetail {
  id: string;
  name: string;
  email: string;
  region?: string;
  postalCode?: string;
  registeredAt: string;
  lastOrderDate: string | null;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}

export interface UsersStats {
  totalUsers: number;
  averageOrdersPerUser: number;
  averageLifetimeSpend: number;
  averageOrderValue: number;
}

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // 1) Crear usuario
 createUser: build.mutation<
      { user: User; accessToken: string; refreshToken: string },
      { name: string; email: string; password: string; role?: string }
    >({
      query: (body) => ({
        url: '/user/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
      // Cuando la mutación se cumple, guardamos user + tokens en auth slice
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            loginSuccess({
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch {
          dispatch(authFailure());
        }
      },
    }),

   // 2) Login
    login: build.mutation<{ accessToken: string; refreshToken: string; user: User }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
      // Al resolverse la mutación, guardamos user + tokens en authSlice
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // data debe tener { accessToken, refreshToken, user }
          dispatch(
            loginSuccess({
              user: data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch {
          dispatch(authFailure());
        }
      },
    }),
   logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Limpiar estado de auth sin importar resultado
          dispatch(logoutAction());
        }
      },
      invalidatesTags: ['User'],
    }),
    // 2.1) Refresh Tokens (opcional si quieres exponerlo aquí en vez del wrapper del apiSlice)
    refreshToken: build.mutation<{ accessToken: string; refreshToken: string }, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: '/user/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            refreshTokensAction({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );
        } catch {
          dispatch(logoutAction());
        }
      },
    }),
    // 3) Obtener todos los usuarios (con búsqueda y paginación)
    getAllUsers: build.query<
      { users: User[]; totalPage: number },
      { search?: string; page?: number; perPage?: number }
    >({
      query: ({ search, page, perPage }) => ({
        url: '/user/all',
        method: 'GET',
        params: { search, page, perPage },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // 4) Obtener usuario por ID
    getUserById: build.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // 5) Actualizar datos de un usuario
    updateUser: build.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),

    // 6) Actualizar contraseña
    updatePassword: build.mutation<{ success: boolean }, { id: string; password: string }>({
      query: ({ id, password }) => ({
        url: `/user/password/${id}`,
        method: 'PUT',
        body: { password },
      }),
    }),

    // 7) Eliminar usuario
    deleteUser: build.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),
  getStaffUsers: build.query<
      { data: User[]; meta: PaginatedMeta },
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search, page, limit }) => ({
        url: '/users/staff',
        method: 'GET',
        params: { search, page, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    // 8) Detalle de clientes con métricas, búsqueda y paginación
    getCustomers: build.query<
      { data: CustomerDetail[]; meta: PaginatedMeta },
      { search?: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: '/user-customers',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Customer' as const, id })),
              { type: 'Customer', id: 'LIST' },
            ]
          : [{ type: 'Customer', id: 'LIST' }],
    }),

    // 9) Estadísticas globales de clientes
    getUsersStats: build.query<UsersStats, void>({
      query: () => ({
        url: '/user-stats',
        method: 'GET',
      }),
    }),

   resetPassword: build.mutation<
  { message: string },
  { token: string; password: string }
>({
  query: ({ token, password }) => ({
    url: '/user/reset-password',  // corregir typo: reset-password
    method: 'POST',
    body: { token, password },
  }),
}),
forgotPassword: build.mutation<
  { message: string },
  { email: string }
>({
  query: ({ email }) => ({
    url: '/user/forgot-password',
    method: 'POST',
    body: { email },
  }),
}),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useDeleteUserMutation,
  useGetCustomersQuery,
  useGetStaffUsersQuery,
  useGetUsersStatsQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = usersApi;
