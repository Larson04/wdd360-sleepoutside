import type {Product} from "./types.mts"
import { updateCart } from "./utils.mts";
import { findProductById } from "./productData.mts";

function addProductToCart(product:Product) {
  updateCart("so-cart", product);
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon?.classList.add("wobble");
  setTimeout(() => {
    cartIcon?.classList.remove("wobble");
  }, 1000);
}
// add to cart button event handler
async function addToCartHandler(e:Event) {
  const target = e.target as HTMLButtonElement
  if(target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    if(!product) {
      
      return;
    }
    console.log(product);
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
