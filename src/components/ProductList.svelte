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
</script>

<h2>Top products: {category}</h2>

<ul class="product-list">
  {#each products as product}
    <ProductSummary {product} onQuickView={(product) => selectedProduct = product}/> 
  {/each}
</ul>

{#if selectedProduct} 
<QuickViewModal product={selectedProduct} onClose={() => selectedProduct = null}/>
{/if}