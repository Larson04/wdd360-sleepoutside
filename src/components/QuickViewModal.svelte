<script lang="ts">
    import type { Product } from "../js/types.mts";
    let { product, onClose }:{ product:Product, onClose: () => void } = $props();

</script>
  <div id="quick-view-modal-container">
    <button id="close-modal" onclick={() => onClose()}>X</button>
    <div id="quickview-modal">

        <h3>{product.brand.name}</h3>

        <h2 class="divider">{product.nameWithoutBrand}</h2>

        <img
          class="divider"
          src={product.images.primaryLarge}
          alt={product.name}
        />

        <h4 class="product-card__price">${product.finalPrice}</h4>

        <p class="product__color">{product.colors[0].colorName}</p>

        <p class="product__description">{@html product.descriptionHtmlSimple}</p>

    </div>
    </div>
<style>

    #quick-view-modal-container {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-items: center;
    }

    #close-modal {
        position: fixed;
        top: 10px;
        right: 10px;
        text-align: right;
        color: white;
        font-size: 2rem;
        background-color: transparent;
        padding: 0px;
    }

    #quickview-modal {
        margin: auto auto;
        padding: 20px 50px;
        background-color: white;
        max-height: 800px;
        max-width: 800px;
        text-align: center;
    }
</style>