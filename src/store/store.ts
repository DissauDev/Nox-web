import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';

import addressReducer from './features/slices/addressSlice';
import ordersReducer from './features/slices/orderSlice';
import authReducer from './features/slices/authSlice';
import whishlistReducer from './features/slices/whishlistSlice'
// redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage para web

// 1) Config del persist a nivel root (solo queremos persistir auth y orders)
const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'orders', 'whishlist'],
};

// 2) Reducer combinado “puro” (sin persist todavía)
const rootReducer = combineReducers({
  address: addressReducer,
  auth: authReducer,
  whishlist: whishlistReducer,
  orders: ordersReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// 3) Envolvemos el rootReducer con persistReducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    getDefaultMiddleware({
      serializableCheck: {
        // Evitamos que redux-persist lance advertencias
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

// 5) Ahora que el store ya está creado, podemos inferir RootState con store.getState:
export type RootState = ReturnType<typeof store.getState>;

// 6) Types para dispatch
export type AppDispatch = typeof store.dispatch;

// 7) Creamos el persistor
export const persistor = persistStore(store);
