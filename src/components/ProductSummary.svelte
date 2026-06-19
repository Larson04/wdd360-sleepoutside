<script lang="ts">
    import type { Product } from "../js/types.mts";
    let { product, onQuickView }:{ product:Product, onQuickView: (product:Product) => void } = $props();

</script>


<li class="product-card">
    <a href="/products/{product.id}">
    <img
    src={product.images.primaryLarge}
    alt="{product.name}"
    />
    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.name}</h2>
    <p class="product-card__price">${product.finalPrice}</p></a
    >
    <div id="button-container">
        <button id="quickview-button" onclick={() => onQuickView(product)}><img src="../../eye-icon.svg" alt="Quick View Icon"></button>
    </div>
</li>

<style>
    #button-container {
        text-align: right;
        padding: 0px;
    }

    #quickview-button {
        background-color: transparent;
        padding: 0px;
        display: inline;
        margin: 0 0;
    }

    #quickview-button img {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>