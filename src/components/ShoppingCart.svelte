<script lang="ts">
  import { onMount } from "svelte";
  import { renderCartContents, removeItemFromCart } from "../js/cart.ts";

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