<script>
    import { theme, videos } from "$lib/stores/theme";
    let videoSrc = $derived(`/videos/${videos[$theme]}`);
    import ThemeSwitcher from "$lib/components/ThemeSwticher/ThemeSwitcher.svelte";
    import { onMount } from "svelte";

    //icons
    import Discord from "~icons/ic/baseline-discord";

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });
</script>

{#key videoSrc}
    <video
        autoplay
        muted
        loop
        playsinline
        class="fixed top-0 left-0 w-full h-full object-cover z-[-1] blur-sm bg-black"
    >
        {#if mounted}
            <source src={videoSrc} type="video/mp4" />
        {/if}
    </video>
{/key}

<div class="relative z-10 min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-white text-4xl font-bold">lunatine.dev</h1>
    </div>
</div>

<ThemeSwitcher />
