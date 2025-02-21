import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces para las opciones del producto y el producto en sí.
export interface ProductOption {
  id: string;
  name: string;
  value?: string;
  extraPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: ProductOption[];
  specifications?: string;
}

// Interfaz para los totales de la orden.
export interface Totals {
  subTotal: number;
  extendedDelivery: number;
  tax: number;
  tip: number;
  total: number;
}

// Estado de la orden: lista de productos, costo del delivery y totales calculados.
export interface OrderState {
  products: Product[];
  deliveryCost: number;
  totals: Totals;
}

// Función auxiliar para calcular los totales a partir de los productos y el costo del delivery.
const calculateTotals = (products: Product[], deliveryCost: number): Totals => {
  let subTotal = 0;
  products.forEach(product => {
    // Suma de precios extra de las opciones (si existen)
    const optionsExtra = product.options
      ? product.options.reduce((acc, opt) => acc + (opt.extraPrice || 0), 0)
      : 0;
    subTotal += (product.price + optionsExtra) * product.quantity;
  });

  // Cálculo de tax (10% del subtotal, ajústalo según necesites)
  const tax = subTotal * 0.1;
  // Propina del 20% de la suma de subtotal, tax y delivery
  const tip = (subTotal + tax + deliveryCost) * 0.2;
  // Total a pagar: suma de subtotal, tax, delivery y tip
  const total = subTotal + tax + deliveryCost + tip;

  return {
    subTotal: Number(subTotal.toFixed(2)),
    extendedDelivery: Number(deliveryCost.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    tip: Number(tip.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

// Estado inicial de la orden.
// Se establece un deliveryCost por defecto (por ejemplo, $5.00)
const initialState: OrderState = {
  products: [],
  deliveryCost: 5.00,
  totals: {
    subTotal: 0,
    extendedDelivery: 5.00,
    tax: 0,
    tip: 0,
    total: 5.00,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Agrega un producto a la orden.
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Remueve un producto de la orden por su id.
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Actualiza un producto completo (cantidad, opciones, etc.).
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Actualiza únicamente las opciones de un producto específico.
    updateProductOptions: (
      state,
      action: PayloadAction<{ id: string; options: ProductOption[] }>
    ) => {
      const product = state.products.find(product => product.id === action.payload.id);
      if (product) {
        product.options = action.payload.options;
      }
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Incrementa (o decrementa) la cantidad de un producto según el valor indicado.
    // Por ejemplo: { id: 'prod-1', increment: 2 } aumentará la cantidad en 2.
    incrementProductQuantity: (
      state,
      action: PayloadAction<{ id: string; increment: number }>
    ) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        // Se asegura que la cantidad no baje de 1.
        product.quantity = Math.max(1, product.quantity + action.payload.increment);
      }
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Permite actualizar el costo del delivery (por si se necesita modificarlo).
    setDeliveryCost: (state, action: PayloadAction<number>) => {
      state.deliveryCost = action.payload;
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
    // Limpia la orden.
    clearOrder: (state) => {
      state.products = [];
      state.totals = calculateTotals(state.products, state.deliveryCost);
    },
  },
});

// Exportamos las acciones para usarlas en nuestros componentes.
export const {
  addProduct,
  removeProduct,
  updateProduct,
  updateProductOptions,
  incrementProductQuantity,
  setDeliveryCost,
  clearOrder,
} = orderSlice.actions;

// Exportamos el reducer para incluirlo en el store.
export default orderSlice.reducer;
