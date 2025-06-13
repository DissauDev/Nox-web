import { Product } from "./features/slices/whishlistSlice";
import { RootState } from "./store";


/**
 * Devuelve el array completo de productos en la wishlist
 */
export const selectWishlistItems = (state: RootState): Product[] =>
  state.whishlist.items;

/**
 * Devuelve true si el producto con `productId` está en la wishlist
 */
export const selectIsInWishlist = (productId: string) => (
  state: RootState
): boolean => state.whishlist.items.some((p) => p.id === productId);
