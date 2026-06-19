import { getLocalStorage, setLocalStorage } from "./utils.mts";
import type {Product} from "./types.mts"

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listEl = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    if (listEl) listEl.innerHTML = "";

    const footerEl = document.querySelector(".cart-footer");
    footerEl?.classList.add("hide");

    return;
  }

  const htmlItems = cartItems.map((item: Product) =>
    cartItemTemplate(item)
  );

  if(listEl)  listEl.innerHTML = htmlItems.join("");
  
  calculateCartTotal();
}

// Quantity is hard coded in. When we change that, 
// we'll need to update the total calculations function to
//  multiply the total price by the quantity.
function cartItemTemplate(item:Product) {
  const newItem = `<li class="cart-card divider">
  <a href="/products/${item.id}" class="cart-card__image">
    <img
      src="${item.images.primaryExtraLarge}"
      alt="${item.name}"
    />
  </a>
  <a href="/products/${item.id}">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <span data-id="${item.id}" class="cart-card__remove" >X</span>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <div>
    <label for="cartQuantity-${item.id}" >qty:</label>
    <input data-id="${item.id}" type="number" class="cart-card__quantity" id="cartQuantity-${item.id}">
  </div>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

export function updateItemQuantity(id: string, newQuantity: number) {
  const cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex(
    (item: Product) => item.id === id
  );
  if (index !== -1) {
    cartItems[index].quantity = newQuantity;
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}


function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const Total = cartItems.reduce((acc:number, item:Product) => acc + (item.finalPrice * item.quantity), 0);
  if (Total > 0) {
    const totalEl = document.querySelector(".cart-total");
    if (totalEl) totalEl.textContent = `Total: $${Total.toFixed(2)}`;
    const footerEl = document.querySelector(".cart-footer");
    if (footerEl) footerEl.classList.remove("hide");
  } 
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
  renderCartContents();
}