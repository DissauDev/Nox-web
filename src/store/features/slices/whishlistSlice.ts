
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//
// 1. Define tus tipos de producto (puedes ajustarlos según tu API)
//
export interface ImageWithBlurHash {
  url: string;
  blurHash: string;
}



export interface Product {
  id: string;
  name: string;
  price: number;
  sellPrice: number;
  specifications: string | null;
  description: string;
  categorie: string;
  imageLeft: ImageWithBlurHash | null;
  imageRight: ImageWithBlurHash | null;
  type: "REGULAR" | "SEASONAL";      // ajusta según tus enums
  status: "AVAILABLE" | "DISABLED";
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  options: unknown[];                // o tipa más específicamente
}

//
// 2. Estado inicial
//
interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

//
// 3. Slice
//
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
