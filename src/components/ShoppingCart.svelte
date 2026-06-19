<script lang="ts">
  import { onMount } from "svelte";
  import { renderCartContents, removeItemFromCart, updateItemQuantity } from "../js/cart.ts";
  import { idText } from "typescript";

  onMount(() => {
    renderCartContents();

    const listEl = document.querySelector(".product-list");

    listEl?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("cart-card__remove")) {
        const id = target.dataset.id;
        if (id) removeItemFromCart(id);
      }
    });

    listEl?.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.classList.contains("cart-card__quantity")) {
        const id = target.dataset.id;
        if(!id) return;
        const newQuantity = Number(target.value);
  
        updateItemQuantity(id, newQuantity);
      }
    });
  });

  
  const title = "Cart";
</script>
    <main class="divider">
      <section class="products">
        <h2>My Cart</h2>

        <ul class="product-list"></ul>
        <div class="cart-footer hide">
          <p class="cart-total">Total: </p>
          <button class="checkout-btn">Checkout</button>
        </div>
      </section>
    </main>