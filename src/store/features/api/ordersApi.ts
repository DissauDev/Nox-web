// src/features/orders/ordersApi.ts

import { Order} from '@/types/system';
import { apiSlice } from '../api/apiSlice';


interface UserOrder {
orders: Order[]

}

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getOrders: build.query<{ orders: Order[]; totalPage: number }, {
  status?: string;
  customerType?: string;
  dateFilter?: string;
  page?: number;
  perPage?: number;
  origin?: 'pickup' | 'delivery';
  orderNumber?: string     
}>({
  query: ({ status, customerType, dateFilter, page, perPage,orderNumber, origin}) => ({
    url: '/orders',
    method: 'GET',
    params: { status, customerType, dateFilter, page, perPage,orderNumber, origin  }
  }),
  providesTags: (result) =>
    result
      ? [
          ...result.orders.map(({ id }) => ({ type: 'Order' as const, id })),
          { type: 'Order', id: 'LIST' },
        ]
      : [{ type: 'Order', id: 'LIST' }],
}),

    

    // 2. Obtener órdenes de un usuario por email
    getUserOrders: build.query<UserOrder, string>({
      query: (email) => ({ url: `/orders/user/${email}`, method: 'GET' }),
      providesTags: (result , _err, email) => [
        { type: 'Order' as const, id: `USER_${email}` },
       
      ],
    }),

    // 3. Obtener una orden por ID
    getOrder: build.query<Order, string>({
      query: (orderId) => ({ url: `/orders/${orderId}`, method: 'GET' }),
      providesTags: (_res, _err, orderId) => [{ type: 'Order' as const, id: orderId }],
    }),

    // 4. Crear una nueva orden
    createOrder: build.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),


    // 5. Actualizar una orden existente
    updateOrder: build.mutation<Order, Order>({
      query: ({ id, ...patch }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Order' as const, id }],
    }),
      // 5. Actualizar una orden existente
    updateOrderStatus: build.mutation<Order, Order>({
      query: ({ id, ...patch }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Order' as const, id }],
    }),
      refundOrder: build.mutation<Order, Order>({
      query: ({ id, totalAmount }) => ({
        url: `/orders/${id}/refund`,
        method: 'POST',

        body: totalAmount != null ? { totalAmount } : {},
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Order' as const, id }],
    }),


    // 6. Borrar una orden
    deleteOrder: build.mutation<{ success: boolean; id: string }, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, orderId) => [
        { type: 'Order' as const, id: orderId },
        { type: 'Order', id: 'LIST' },
      ],
    }),

  }),
  overrideExisting: false,
});

// Hooks auto-generados
export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useRefundOrderMutation
} = ordersApi;
