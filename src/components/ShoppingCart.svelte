<script lang="ts">
    import { onMount } from 'svelte';
    import { renderCartContents } from '../js/cart.ts';

    onMount(() => {
        renderCartContents();
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