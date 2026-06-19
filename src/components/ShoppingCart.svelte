<script lang="ts">
  import { onMount } from "svelte";
  import { getLocalStorage } from "../js/utils.mts";
  import { idText } from "typescript";
  import CartItem from "./CartItem.svelte";
  import type { Product } from "../js/types.mts";
  import { removeItemFromCart, updateItemQuantity } from "../js/cart.ts";


  let cartItems = $state<Product[]>([]);
  onMount(() => {
    const data = getLocalStorage("so-cart");
    if (data) {
      cartItems = data;
    }
  });
  
  const cartTotal = $derived(cartItems.reduce((acc:number, item:Product) => acc + (item.finalPrice * item.quantity), 0));

  function handleRemove(id: string) {
    removeItemFromCart(id);
    cartItems = cartItems.filter(item => item.id !== id)
  }

  const title = "Cart";
</script>
    <main class="divider">
      <section class="products">
        <h2>My Cart</h2>
        
        <ul class="product-list">
          {#each cartItems as item, index (index)}
            <CartItem item={item} onRemove={handleRemove}/>
          {/each}
        </ul>
        {#if cartItems}
          <div class="cart-footer">
            <p class="cart-total">Total: ${cartTotal.toFixed(2)}</p>
            <button class="checkout-btn">Checkout</button>
          </div>
        {/if}
      </section>
    </main>