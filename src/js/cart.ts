import { getLocalStorage } from "./utils.mts";
import type {Product} from "./types.mts"

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if(!cartItems || cartItems.length === 0) {
    return;
  }
  const htmlItems = cartItems.map((item:Product) => cartItemTemplate(item));
  const listEl = document.querySelector(".product-list")
  if(listEl)  listEl.innerHTML = htmlItems.join("");
  calculateCartTotal();
}

// Quantity is hard coded in. When we change that, 
// we'll need to update the total calculations function to
//  multiply the total price by the quantity.
function cartItemTemplate(item:Product) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.images.primaryExtraLarge}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: </p>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const Total = cartItems.reduce((acc:number, item:Product) => acc + item.finalPrice, 0);
  if (Total > 0) {
    const totalEl = document.querySelector(".cart-total");
    if (totalEl) totalEl.textContent = `Total: $${Total.toFixed(2)}`;
    const footerEl = document.querySelector(".cart-footer");
    if (footerEl) footerEl.classList.remove("hide");
  }
}

renderCartContents();
