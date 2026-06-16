<script lang="ts">
    import { onMount } from 'svelte';
    import  auth  from '../js/auth.svelte.ts';
    import { setLocalStorage, getParam } from '../js/utils.mts';
    import { searchProducts } from '../js/productData.mts';
    import type { Product } from '../js/types.mts';

// what is this?  We give the option to pass a function into our login component that will get called on a successful login. If no function is passed it defaults to one that will redirect the user to another page (like Home).
// let { onSuccess = ({ query, products }) => {
//     searchStore.set({ query, products });
//     window.location.href = `/product-list?query=${encodeURIComponent(query)}`; } } = 
//     $props<{
//       onSuccess?: (data: { category: string, products: Product[] }) => void;
//     }>();

let queryString = $state("");
let errorMessage = $state("");

async function searchHandler(event: Event) {
    event.preventDefault();
    errorMessage = "";
    console.log(queryString);

    try {
      window.location.href = `/search-results?query=${encodeURIComponent(queryString)}`;
        
    }
    catch (error: any) {
        console.log("Search handler caught an error", error);
        errorMessage = error.message;
    }

}

</script>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}
<form onsubmit={searchHandler} class="search-form">
    <input type="string" bind:value={queryString} required placeholder="Search for a product"/>
  <button type="submit"> 
    <img src="../../search-icon.svg" alt="Search submit icon"> 
  </button>
</form>

<style>
  .search-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 500px;
    max-width: 500px;
    margin: 2rem auto;
    padding: .25rem .5rem; 
    border: 1px solid #ccc;
    border-radius: 50px;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    background-color: none;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  input:hover {
    cursor: text;
  }

  button {
    padding: .2rem;
    font-size: 1rem;
    height: 1.9rem;
    width: 2.1rem;
    cursor: pointer;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }

  button img {
    height: 1.5rem;
  }

  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>