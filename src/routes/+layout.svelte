<script>
    import ThemeSwitcher from "$lib/components/ThemeSwticher/ThemeSwitcher.svelte";
    import { page, navigating } from "$app/state";

    import Navbar from "$lib/components/Nav/Navbar.svelte";
    import "../app.css";

    let { children } = $props();
</script>

<Navbar pathname={page.url.pathname} />
<main>
    {#if navigating.to}
        navigating to {navigating.to.url.pathname}
    {:else}
        {@render children()}
    {/if}
</main>
<footer></footer>

<ThemeSwitcher />
