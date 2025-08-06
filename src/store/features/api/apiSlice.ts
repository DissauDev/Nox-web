// src/features/api/apiSlice.ts
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/store'; // ← así debe importarse
import { logout, refreshTokens } from '../slices/authSlice';


//export  const baseUrl = 'https://app.nox.dissau.online/api'
export  const baseUrl = 'http://localhost:3000/api'
const baseQueryJson = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryForm = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});
/**
 * Wrapper que, ante un 401 de accessToken expirado, intenta refrescar antes de reintentar la petición.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1) Ejecuta la petición original
    const isUpload =
    typeof args !== 'string' &&
    typeof args.url === 'string' &&
    args.url.includes('/upload/create');

  // 3.1) Lanzar la petición original con el baseQuery adecuado
  const rawBase = isUpload ? baseQueryForm : baseQueryJson;

  let result = await rawBase(args, api, extraOptions);

  // 2) Si obtuvo 401 (token expirado o inválido), intentamos refresh
  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      // Llamamos al endpoint de refresh
      const refreshResult = await baseQueryJson(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Si obtuvimos nuevos tokens, los guardamos en authSlice
        const data = refreshResult.data as { accessToken: string; refreshToken: string };
        api.dispatch(
          refreshTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        // Reintentamos la petición original con el nuevo accessToken
        result = await rawBase(args, api, extraOptions);
      } else {
        // Si el refresh falló, forzamos logout
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Dispatch',
    'Category',
    'UNAUTHORIZED',
    'UNKNOWN_ERROR',
    'Register',
    'Customer',
    'Analytics',
    'Coupon',
    'ProductOptionItems',
    'Page',
    'ProductSuggestions',
    'Order',
    'Product',
    'StoreConfig',
    'Images',
    'ProductOptions',
    'OptionGroup',
    'OptionValue',
  ],
    //  + Estas tres opciones globales evitan refetchs automáticos
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

  //  + El tiempo en segundos que RTK Query deja los datos "vivos" en caché
  //    (por defecto son 60 segundos). Puedes alargarlo para que, al cambiar de ruta,
  //    los datos sigan disponibles.
  keepUnusedDataFor: 300, // p.ej. 5 minutos

  endpoints: () => ({}), // Se inyectarán en slices específicos como userApi
});
