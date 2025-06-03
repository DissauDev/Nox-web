// src/store/features/slices/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductOption {
  id: string;
  name: string;
  extraPrice?: number;
  groupName: string;
  quantity: string;
  urlImage: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  /** Precio unitario INCLUYENDO opciones extras */
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

const calculateTotals = (
  products: Product[],
  tipPercent: number
): Totals => {
  // Ahora sólo multiplicamos price * quantity
  const subTotal = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const tax = 0;
  const tip = (subTotal + tax) * tipPercent;
  const total = subTotal + tax + tip;

  return {
    subTotal: Number(subTotal.toFixed(2)),
    tax:     Number(tax.toFixed(2)),
    tip:     Number(tip.toFixed(2)),
    total:   Number(total.toFixed(2)),
  };
};

const initialState: OrderState = {
  products: [],
  tipPercent: 0.20,
  totals: {
    subTotal: 0,
    tax:       0,
    tip:       0,
    total:     0,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // 1) Ajustamos el precio unitario sumando las opciones extras
      const optsExtra = action.payload.options
        ? action.payload.options.reduce((acc, o) => acc + (o.extraPrice || 0), 0)
        : 0;
      const newProd: Product = {
        ...action.payload,
        price: action.payload.price + optsExtra,
      };

      // 2) Añadimos o incrementamos
      const existing = state.products.find(p => p.id === newProd.id);
      if (existing) {
        existing.quantity += newProd.quantity;
      } else {
        state.products.push(newProd);
      }

      // 3) Recalcular totales
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) {
        state.products[idx] = action.payload;
      }
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    updateProductOptions: (
      state,
      action: PayloadAction<{ id: string; options: ProductOption[] }>
    ) => {
      const prod = state.products.find(p => p.id === action.payload.id);
      if (prod) {
        prod.options = action.payload.options;
        // al cambiar opciones, volver a ajustar price unitario
        const optsExtra = action.payload.options.reduce(
          (acc, o) => acc + (o.extraPrice || 0),
          0
        );
        prod.price = prod.price - optsExtra + optsExtra; // reasignamos para recalcular
      }
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    incrementProductQuantity: (
      state,
      action: PayloadAction<{ id: string; increment: number }>
    ) => {
      const prod = state.products.find(p => p.id === action.payload.id);
      if (prod) {
        prod.quantity = Math.max(1, prod.quantity + action.payload.increment);
      }
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    setTipPercent: (state, action: PayloadAction<number>) => {
      state.tipPercent = action.payload;
      state.totals = calculateTotals(state.products, state.tipPercent);
    },

    clearOrder: (state) => {
      state.products = [];
      state.totals = calculateTotals(state.products, state.tipPercent);
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
} = orderSlice.actions;

export default orderSlice.reducer;
