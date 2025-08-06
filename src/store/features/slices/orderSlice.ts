// src/store/features/slices/orderSlice.ts
import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConfig } from '../api/storeConfigApi'; 

export interface ProductOption {
  id: string;
  name: string;
  extraPrice?: number;
  groupName: string;
  quantity: number;
  urlImage: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: ProductOption[];
  specifications?: string;
  imageUrl: string;
  blurHashImage: string;
}

export interface Totals {
  subTotal: number;
  tax: number;
  tip: number;
  total: number;
}

export interface OrderState {
  products: Product[];
  tipPercent: number;
  totals: Totals;
}

// ✅ calculadora sin storeConfig en state
const calculateTotals = (
  products: Product[],
  tipPercent: number,
  storeConfig: StoreConfig
): Totals => {
  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  let tax = 0;
  if (storeConfig.taxEnabled) {
    tax = subTotal * (storeConfig.taxPercent/100) + storeConfig.taxFixed;
  }

  const tip = (subTotal + tax) * tipPercent;
  const total = subTotal + tax + tip;

  return {
    subTotal: Number(subTotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    tip: Number(tip.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

const initialState: OrderState = {
  products: [],
  tipPercent: 0.20,
  totals: {
    subTotal: 0,
    tax: 0,
    tip: 0,
    total: 0,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const optsExtra = action.payload.options
        ? action.payload.options.reduce((acc, o) => acc + (o.extraPrice || 0), 0)
        : 0;

      const newProd: Product = {
        ...action.payload,
        price: action.payload.price + optsExtra,
      };

      const existing = state.products.find(p => p.id === newProd.id);
      if (existing) {
        existing.quantity += newProd.quantity;
      } else {
        state.products.push(newProd);
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) {
        state.products[idx] = action.payload;
      }
    },

    updateProductOptions: (
      state,
      action: PayloadAction<{ id: string; options: ProductOption[] }>
    ) => {
      const prod = state.products.find(p => p.id === action.payload.id);
      if (prod) {
        prod.options = action.payload.options;
        const optsExtra = action.payload.options.reduce(
          (acc, o) => acc + (o.extraPrice || 0),
          0
        );
        prod.price = prod.price - optsExtra + optsExtra;
      }
    },

    incrementProductQuantity: (
      state,
      action: PayloadAction<{ id: string; increment: number }>
    ) => {
      const prod = state.products.find(p => p.id === action.payload.id);
      if (prod) {
        prod.quantity = Math.max(1, prod.quantity + action.payload.increment);
      }
    },

    setTipPercent: (state, action: PayloadAction<number>) => {
      state.tipPercent = action.payload;
      
    },

    clearOrder: (state) => {
      state.products = [];
    },

    // ✅ NUEVO: recalculateTotals ahora recibe la storeConfig como payload
    recalculateTotals: (state, action: PayloadAction<StoreConfig>) => {
      state.totals = calculateTotals(
        state.products,
        state.tipPercent,
        action.payload
      );
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  updateProductOptions,
  incrementProductQuantity,
  setTipPercent,
  clearOrder,
  recalculateTotals,
} = orderSlice.actions;

export default orderSlice.reducer;
