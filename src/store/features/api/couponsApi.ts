// src/features/coupons/couponsApi.ts

import { apiSlice } from './apiSlice'

export type CouponType = 'PERCENTAGE' | 'AMOUNT';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  discountValue: number;      // porcentaje (ej. 25) o monto fijo (ej. 10.50)
  expiresAt: string | null;   // ISO date string, o null
  isLimited: boolean;
  usageLimit?: number | null; // límite de usos si isLimited = true
  usageCount: number;         // cuántas veces se ha usado
  createdAt: string;          // ISO date string
  updatedAt: string;          // ISO date string
}

export interface CouponRedemption {
  id: string;
  couponId: string;
  userId?: string | null;
  orderId?: string | null;
  redeemedAt: string;         // ISO date string
}

// Resultado al redimir un cupón
export interface RedeemResult {
  updated: Coupon;             // cupón con usageCount ya incrementado
  redemption: CouponRedemption;// registro de la redención
}

export const couponsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // 1) Listar todos los cupones
    getCoupons: build.query<Coupon[], void>({
      query: () => ({
        url: '/coupons',
        method: 'GET',
           headers: { 'Content-Type': 'application/json' },
        // 2) convertir tú mismo a string
       
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Coupon' as const, id })),
              { type: 'Coupon', id: 'LIST' },
            ]
          : [{ type: 'Coupon', id: 'LIST' }],
    }),

    // 2) Obtener un cupón por ID
    getCouponById: build.query<Coupon, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Coupon' as const, id }],
    }),

 createCoupon: build.mutation<Coupon, Partial<Coupon>>({
  query: (body) => {
    console.log('[couponsApi] sending body:', body);
    return {
      url: '/coupons',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  },
  invalidatesTags: [{ type: 'Coupon', id: 'LIST' }],
}),


    // 4) Actualizar cupón
    updateCoupon: build.mutation<Coupon, { id: string; data: Partial<Coupon> }>({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Coupon' as const, id },
        { type: 'Coupon', id: 'LIST' },
      ],
    }),

    // 5) Eliminar cupón
    deleteCoupon: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Coupon' as const, id },
        { type: 'Coupon', id: 'LIST' },
      ],
    }),

    // 6) Redimir cupón
    redeemCoupon: build.mutation<RedeemResult, { code: string; userId?: string; orderId?: string }>({
      query: (body) => ({
        url: '/coupons/redeem',
        method: 'POST',
        body,
      }),
      // No invalidamos lista completa; el contador de usos ya se actualiza en back
      invalidatesTags: (result) =>
        result
          ? [{ type: 'Coupon' as const, id: result.updated.id }]
          : [],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useRedeemCouponMutation,
} = couponsApi
