<script lang="ts">
  import { onMount } from "svelte";
  import { getParam } from "../js/utils.mjs";
  import { getProducts } from "../js/productData.mjs";
  import type { Product } from "../js/types.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import QuickViewModal from "./QuickViewModal.svelte";
  
  let category = $state(""); 
  let products:Product[] = $state([]);
  let selectedProduct:Product | null = $state(null);

  async function init() {
    category = getParam("category") || ""
    const data = await getProducts(category);
    products = data.results;
  }

  onMount(init);

  async function sortProducts(products: Product[], sortCondition: string) {

    if (sortCondition == "price") {
      products.sort((a, b) => a.suggestedRetailPrice - b.suggestedRetailPrice);
    }
    else if (sortCondition == "name") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;

  }

</script>

<div id="product-list-controls">
  <h2>Top products: {category}</h2>
  <div id="sort-div">
    <!-- <button id="open-sort-button" onclick={() => sortProducts(products, "price")}><img src="../../sort-icon.svg" alt="Sort icon"></button> -->
    <div id="sort-options">
      <button onclick={() => sortProducts(products, "name")}>
        Sort A-Z
      </button>
      <button onclick={() => sortProducts(products, "price")}>
        Sort by Price
      </button>
    </div>
  </div>  
</div>

<ul class="product-list">
  {#each products as product}
    <ProductSummary {product} onQuickView={(product) => selectedProduct = product}/> 
  {/each}
</ul>

<style>

  #sort-div {
    width: 125px;
    align-items: left;
    margin-right: 1rem;
  }

  #sort-div button {
    height: 2rem;
    width: 100%;
    font-size: 1rem;
    padding: 0px;
    text-align: right;
    background-color: white;
    color: black;
    text-decoration: underline;
  }

  #sort-div button:hover {
    color: var(--secondary-color);
  }

  #product-list-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  #sort-div {
    background-color: blue;
  }
</style>