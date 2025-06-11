<script>
    import ThemeSwitcher from "$lib/components/ThemeSwticher/ThemeSwitcher.svelte";
    import { page, navigating } from "$app/state";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import NProgress from "nprogress";
    import "nprogress/nprogress.css";

    NProgress.configure({
        showSpinner: true,
        trickleRate: 0.02,
        trickleSpeed: 100,
    });

    beforeNavigate(() => {
        NProgress.start();
    });
    afterNavigate(() => {
        NProgress.done();
    });

    import Navbar from "$lib/components/Nav/Navbar.svelte";
    import "../app.css";

    let { children } = $props();
</script>

{#if !page.error}
    <Navbar pathname={page.url.pathname} />
{/if}
<main>
    {@render children()}
</main>
<footer></footer>

<ThemeSwitcher />
