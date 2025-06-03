
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface products {

    id: number, name: string, price: string | number ,quantity: number,totalItemPrice:number, images: [
      {
          id: number,
          src: string,
         
      }
  ],
}


interface initialState {

  products: products[];
 
  fullPrice: number,
  lastUpdated: string | number | null,
}

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
      const item = action.payload;
      const existingItem = state.products.find((i) => i.id === item.id);
    
      if (existingItem) {
        existingItem.quantity += item.quantity;
        //@ts-ignore
        existingItem.totalItemPrice = Number((existingItem.price * existingItem.quantity).toFixed(2));
      } else {
        state.products.push(item);
      }
    
      state.lastUpdated = Date.now();
      
      // Recalculate fullPrice
      const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
      state.fullPrice = Number(calculatedFullPrice.toFixed(2))
    },
 
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
 

      if (item ) {
        item.quantity += 1;
   
        //@ts-ignore
        const itemPrice  = item.price *item.quantity
        item.totalItemPrice = Number(itemPrice.toFixed(2))
        const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
        state.fullPrice = Number(calculatedFullPrice.toFixed(2));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
   
      if ((item && item.quantity > 1) ) {
        item.quantity -= 1;
      
        //@ts-ignore
        const itemPrice = item.price *item.quantity;
        item.totalItemPrice =  Number(itemPrice.toFixed(2));
        const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
        state.fullPrice = Number(calculatedFullPrice.toFixed(2));
      }
    },
    setInputQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    },
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((p) => p.id === id);
    
      if (item) {
        item.quantity = quantity;
         //@ts-ignore
         const itemPrice = item.price *item.quantity;
         item.totalItemPrice =  Number(itemPrice.toFixed(2));
         const calculatedFullPrice = state.products.reduce((total, item) => total + item.totalItemPrice, 0);
         state.fullPrice = Number(calculatedFullPrice.toFixed(2));
         
      }
    },

    removeItem(state, action: PayloadAction<number>) {
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
 
  removeItem,cleanCart, decreaseQuantity,increaseQuantity,setInputQuantity,setQuantity} = cartSlice.actions;



export default cartSlice.reducer;


