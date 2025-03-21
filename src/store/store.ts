import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import exampleReducer from './features/exampleSlice';
import    addressReducer  from "./features/slices/addressSlice"
import  ordersReducer from "./features/slices/orderSlice"
import authSlice from './features/slices/authSlice';

export const store = configureStore({
  reducer: {
    address: addressReducer,
    auth: authSlice,
    example: exampleReducer,
    orders: ordersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Integrar RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Añadir middleware de RTK Query
});

// Tipos para TypeScript
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
