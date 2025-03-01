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
  tipPercent: number; 
}

// Función auxiliar para calcular los totales a partir de los productos y el costo del delivery.
// Función auxiliar para calcular los totales a partir de los productos, delivery y tipPercent.
const calculateTotals = (
  products: Product[],
  deliveryCost: number,
  tipPercent: number
): Totals => {
  let subTotal = 0;
  products.forEach(product => {
    // Suma de precios extra de las opciones (si existen)
    const optionsExtra = product.options
      ? product.options.reduce((acc, opt) => acc + (opt.extraPrice || 0), 0)
      : 0;
    subTotal += (product.price + optionsExtra) * product.quantity;
  });

  // Cálculo de tax (10% del subtotal)
  const tax = subTotal * 0.1;
  // Cálculo de la propina en base a tipPercent
  const tip = (subTotal + tax + deliveryCost) * tipPercent;
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
  tipPercent: 0.20,
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
  // Agrega un producto a la orden.
addProduct: (state, action: PayloadAction<Product>) => {
  const newProduct = action.payload;
  const existingProduct = state.products.find(
    product => product.id === newProduct.id
  );

  if (existingProduct) {
    // Si el producto ya existe, se aumenta la cantidad.
    existingProduct.quantity += newProduct.quantity;
  } else {
    // Si no existe, se agrega al array.
    state.products.push(newProduct);
  }
  state.totals = calculateTotals(
    state.products,
    state.deliveryCost,
    state.tipPercent
  );
},
    // Remueve un producto de la orden por su id.
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
    },
    // Actualiza un producto completo (cantidad, opciones, etc.).
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
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
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
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
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
    },
    // Permite actualizar el costo del delivery (por si se necesita modificarlo).
    setDeliveryCost: (state, action: PayloadAction<number>) => {
      state.deliveryCost = action.payload;
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
    },
        // Actualiza el porcentaje de propina y recalcula los totales.
        setTipPercent: (state, action: PayloadAction<number>) => {
          state.tipPercent = action.payload;
          state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
        },
    
    // Limpia la orden.
    clearOrder: (state) => {
      state.products = [];
      state.totals = calculateTotals(state.products, state.deliveryCost, state.tipPercent);
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
  setTipPercent,
  clearOrder,
} = orderSlice.actions;

// Exportamos el reducer para incluirlo en el store.
export default orderSlice.reducer;
