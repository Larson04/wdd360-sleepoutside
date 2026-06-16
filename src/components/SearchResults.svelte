<script lang="ts">
    import { onMount } from "svelte";
    import { getParam } from "../js/utils.mjs";
    import type { Product } from "../js/types.mts";
    import ProductSummary from "./ProductSummary.svelte";
    import { searchProducts } from "../js/productData.mts";
    
    let query = $state(""); 
    let products:Product[] = $state([]);
  
    async function init() {
  
      query = getParam("query") || "";
      products = await searchProducts(query);
    //   console.log
    //   console.log(data);
    //   products = data.results;
    }
  
    onMount(init);
</script>
  
  
  <h2>Search Results: {query}</h2>
  
  {#if products.length > 0}
    <ul class="product-list">
      {#each products as product}
        <ProductSummary {product} /> 
      {/each}
    </ul>

  {:else}
    <div>We don't currently have any products matching that search! Maybe try a new search word?</div>

  {/if}

<style>
    h2, div {
        margin-left: 5px;
    }
</style>