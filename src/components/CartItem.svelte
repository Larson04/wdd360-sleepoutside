<script lang="ts">
    import { tick } from "svelte";
    import type { Product } from "../js/types.mts";
  import { updateItemQuantity } from "../js/cart";

    let {item, onRemove} = $props<{item: Product; onRemove: (id:string) => void }>();
    let isEditing = $state(false);
    let input: HTMLInputElement | null = $state(null);

    async function toggleEdit() {
        isEditing = !isEditing;
        if (isEditing === true) {
            await tick();
            input?.focus();
        } else {
            updateItemQuantity(item.id, item.quantity)
        }
    }



</script>

<li class="cart-card divider">
  <a href="/products/{item.id}" class="cart-card__image">
    <img
      src="{item.images.primaryExtraLarge}"
      alt="{item.name}"
    />
  </a>
  <a href="/products/{item.id}">
    <h2 class="card__name">{item.name}</h2>
  </a>
  <span data-id="{item.id}" class="cart-card__remove" 
    onclick={() => onRemove(item.id)}
    >X</span>
  <p class="cart-card__color">{item.colors[0].colorName}</p>
  <div>
    <label for="cartQuantity-{item.id}" >qty:</label>
    {#if isEditing}
        <input data-id="{item.id}" type="number" class="cart-card__quantity" id="cartQuantity-{item.id}" 
        bind:value={item.quantity} 
        bind:this={input}
        onblur={toggleEdit}
        onkeydown={(e) => e.key === 'Enter' && toggleEdit()}
        >
    {:else}
        <p class="cart-card__quantity" onclick={toggleEdit}>{item.quantity}</p>
    {/if}
    </div>
  <p class="cart-card__price">${item.finalPrice}</p>
</li>