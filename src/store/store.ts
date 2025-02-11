import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import exampleReducer from './features/exampleSlice';
import    addressReducer  from "./features/slices/addressSlice"

export const store = configureStore({
  reducer: {
    address: addressReducer,
    example: exampleReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Integrar RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Añadir middleware de RTK Query
});

// Tipos para TypeScript
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
