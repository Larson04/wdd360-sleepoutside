<script lang="ts">
    import type { Newsletter} from "../js/types.mjs";
    
    const baseURL = import.meta.env.PUBLIC_SERVER_URL;
    
    let name:string;
    let email:string;

    let signedUp = false;

    async function handleSubmit() {
        const res = await fetch(baseURL + `newsletter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email})
            }
        );
        if (res.ok) {
            signedUp = true;
        }
    }

</script>

    {#if !signedUp}
    <form  on:submit|preventDefault={handleSubmit}>
        <h3>Sign up for our weekly newsletter!</h3>
        <label for="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your name" bind:value={name}>
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" bind:value={email}>
        <button >Sign up</button>
    </form>
    {:else if signedUp}
    <h3>Thank you for signing up for our weekly newsletter!</h3>
    {/if}

<style>
    form {
        border: 1px solid #f0a868;
        text-align: center;
        margin: 5rem;
        padding: 2rem;

        h3 {
            margin-bottom: 2rem;
        }
        #name {
            margin-right: 2rem
        }
        button {
            margin-top: 2rem;
        }
    }
</style>