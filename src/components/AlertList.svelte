<script>
    import { onMount } from "svelte";
    import { fetchAlerts, alertStore } from '../js/alert.ts';

    onMount(async () => {
        await fetchAlerts();
        console.log("What is inside our store right now?:", $alertStore);
    });
</script>

<section class="alert-list" >
    {#each $alertStore as alert}
        <p style="background-color: {alert.background}; color: {alert.color}; padding: 20px; border-radius: 5px;">{alert.message}</p>
    {/each}
</section>
