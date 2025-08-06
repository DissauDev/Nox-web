
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// 🆕 cada opción seleccionada dentro de un producto (pack, topping, etc.)
interface CartOptionSelection {
  optionId: string;      // id del OptionValue
  name: string;          // nombre visible (para UI)
  count: number;         // cuántas veces se eligió dentro del producto
  unitExtra: number;     // recargo por unidad (p.ej. 0.35)
}


interface products {

    id: string, name: string, price: string | number ,quantity: number,totalItemPrice:number, images: [
      {
          id: number,
          src: string,
         
      },
      
  ],
    optionSelections?: CartOptionSelection[];
    // 🆕 selecciones con extra
  // 🆕 estado fuente: selecciones agrupadas por groupId
  selectionsByGroup?: Record<string, CartOptionSelection[]>;
  // 🆕 derivados (por comodidad)
  unitExtrasTotal?: number,  // suma de extras por unidad del producto
  unitGross?: number,    
}


interface initialState {

  products: products[];
 
  fullPrice: number,
  lastUpdated: string | number | null,
}

// 🆕 helper para colapsar selecciones (y combinar duplicadas por optionId)
const flattenSelections = (item: products): CartOptionSelection[] => {
  const byGroup = item.selectionsByGroup ?? {};
  const list = Object.values(byGroup).flat(); // todas las selecciones de todos los grupos

  // Combina duplicadas por optionId (por seguridad)
  const map = new Map<string, CartOptionSelection>();
  for (const s of list) {
    const k = s.optionId;
    const prev = map.get(k);
    if (prev) {
      map.set(k, {
        optionId: k,
        name: prev.name || s.name,
        count: (prev.count || 0) + (s.count || 0),
        unitExtra: Number(s.unitExtra) || 0, // asumimos mismo extra por optionId
      });
    } else {
      map.set(k, {
        optionId: k,
        name: s.name,
        count: Number(s.count) || 0,
        unitExtra: Number(s.unitExtra) || 0,
      });
    }
  }
  return Array.from(map.values());
};

// 🆕 helper para calcular una línea (item) del carrito
const calcLine = (item: products) => {
  const priceNum = Number(item.price) || 0;

  // 🆕 usa selecciones por grupo (si no hay, cae al array plano para compat)
  const selections = item.selectionsByGroup
    ? flattenSelections(item)
    : (item.optionSelections ?? []);

  const unitExtrasTotal = selections.reduce(
    (sum, sel) => sum + (Number(sel.unitExtra) || 0) * (Number(sel.count) || 0),
    0
  );

  const unitGross = Number((priceNum + unitExtrasTotal).toFixed(2));
  const totalItemPrice = Number((unitGross * item.quantity).toFixed(2));
  return { unitExtrasTotal, unitGross, totalItemPrice };
};



// 🆕 helper para recalcular el total del carrito
const recalcCartTotal = (state: initialState) => {
  const calculatedFullPrice = state.products.reduce(
    (total, it) => total + (Number(it.totalItemPrice) || 0),
    0
  );
  state.fullPrice = Number(calculatedFullPrice.toFixed(2));
};

const initialState : initialState = {

products: [],
fullPrice: 0,
lastUpdated: null,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
  addProduct: (state, action) => {
  const item = action.payload as products;

// 🆕 asegura contenedor por grupo
  item.selectionsByGroup = item.selectionsByGroup ?? {};

  const existingItem = state.products.find((i) => i.id === item.id);

  if (existingItem) {
    // Si quieres distinguir por configuraciones distintas, usa un "lineId" externo.
    existingItem.quantity += item.quantity;

    // 🆕 si el payload trae selecciones (por ejemplo en "editar"), puedes decidir mezclarlas o reemplazarlas.
    // Aquí NO las mezclo para no romper UX; mantenemos las del existingItem.
    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(existingItem);
    existingItem.unitExtrasTotal = unitExtrasTotal;
    existingItem.unitGross = unitGross;
    existingItem.totalItemPrice = totalItemPrice;
  } else {
    // 🆕 calcula y setea derivados
    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(item);
    item.unitExtrasTotal = unitExtrasTotal;
    item.unitGross = unitGross;
    item.totalItemPrice = totalItemPrice;

    state.products.push(item);
  }

  state.lastUpdated = Date.now();
  // 🆕
  recalcCartTotal(state);
},

increaseQuantity: (state, action: PayloadAction<string>) => {
  const item = state.products.find(item => item.id === action.payload);
  if (item) {
    item.quantity += 1;
    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(item); // 🆕
    item.unitExtrasTotal = unitExtrasTotal;
    item.unitGross = unitGross;
    item.totalItemPrice = totalItemPrice;
    recalcCartTotal(state); // 🆕
  }
},

decreaseQuantity: (state, action: PayloadAction<string>) => {
  const item = state.products.find(item => item.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(item); // 🆕
    item.unitExtrasTotal = unitExtrasTotal;
    item.unitGross = unitGross;
    item.totalItemPrice = totalItemPrice;
    recalcCartTotal(state); // 🆕
  }
},

setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
  const { id, quantity } = action.payload;
  const item = state.products.find((p) => p.id === id);
  if (item) {
    item.quantity = quantity;
    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(item); // 🆕
    item.unitExtrasTotal = unitExtrasTotal;
    item.unitGross = unitGross;
    item.totalItemPrice = totalItemPrice;
    recalcCartTotal(state); // 🆕
  }
},

    setInputQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    },

  // 🆕 actualiza solo un grupo del item (no pisa lo demás)
updateItemSelectionsForGroup: (
  state,
  action: PayloadAction<{ id: string; groupId: string; selections: CartOptionSelection[] }>
) => {
  const { id, groupId, selections } = action.payload;
  const item = state.products.find((p) => p.id === id);
  if (item) {
    if (!item.selectionsByGroup) item.selectionsByGroup = {};
    // guarda las selecciones de ese grupo (las de otros grupos quedan intactas)
    item.selectionsByGroup[groupId] = selections;

    const { unitExtrasTotal, unitGross, totalItemPrice } = calcLine(item);
    item.unitExtrasTotal = unitExtrasTotal;
    item.unitGross = unitGross;
    item.totalItemPrice = totalItemPrice;

    recalcCartTotal(state);
    state.lastUpdated = Date.now();
  }
},

    removeItem(state, action: PayloadAction<string>) {
      state.products = state.products.filter(item => item.id !== action.payload);
      const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
      state.fullPrice = Number(calculatedFullPrice.toFixed(2));
    },
    cleanCart: (state) => {
      state.products = initialState.products;
      state.fullPrice = initialState.fullPrice;
    },
  },
});

export const { addProduct,
 
  removeItem,cleanCart, decreaseQuantity,increaseQuantity,setInputQuantity,setQuantity, updateItemSelectionsForGroup} = cartSlice.actions;



export default cartSlice.reducer;


