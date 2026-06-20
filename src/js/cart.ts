import { getLocalStorage, setLocalStorage } from "./utils.mts";
import type {Product} from "./types.mts"

export function updateItemQuantity(id: string, newQuantity: number) {
  const cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex(
    (item: Product) => item.id === id
  );
  if (index !== -1) {
    cartItems[index].quantity = newQuantity;
  }

  setLocalStorage("so-cart", cartItems);
}


export function removeItemFromCart(id: string) {
  const cartItems = getLocalStorage("so-cart") || [];

  const index = cartItems.findIndex(
    (item: Product) => item.id === id
  );

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);
}