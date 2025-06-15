<script>
    import { theme, videos } from "$lib/stores/theme";
    import { decryptPayload } from "$lib/utils/decrypt";
    import { PUBLIC_API_URL } from "$env/static/public";
    import ThemeSwitcher from "$lib/components/ThemeSwticher/ThemeSwitcher.svelte";
    import { onMount } from "svelte";

    //icons
    import Discord from "~icons/ic/baseline-discord";

    let videoSrc = $derived(`/videos/${videos[$theme]}`);
    let eggSrc = $state(null);
    let mounted = $state(false);
    let eggs = $state([]);
    let hue = $state(0);
    let css = $state(["object-fit: cover;"]);

    let keyBuffer = "";
    let maxBuffer = 32;
    let interval;

    const fetchEggs = async () => {
        const response = await fetch(PUBLIC_API_URL + "/internal/config");
        const data = await response.json();
        const easterEggs = await decryptPayload(data);

        eggs = easterEggs;
    };

    const handleKeyEvent = (e) => {
        if (e.key === "Escape") {
            eggSrc = null;
            keyBuffer = "";
            return;
        }

        if (e.key.length === 1) {
            keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-maxBuffer);

            const match = eggs.find((egg) =>
                keyBuffer.endsWith(egg.trigger.toLowerCase())
            );

            if (match?.action === "video") {
                eggSrc = `${PUBLIC_API_URL.replace("/v1", "")}${match.params.href}`;
                css = match.params.css || ["object-fit: cover;"];
                keyBuffer = "";
            }
        }
    };

    onMount(async () => {
        mounted = true;
        await fetchEggs();

        interval = setInterval(() => {
            hue = (hue + 1) % 360;
        }, 30);

        window.addEventListener("keydown", handleKeyEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
            clearInterval(interval);
        };
    });
</script>

{#if !eggSrc}
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
{:else}
    {#key eggSrc}
        <!-- svelte-ignore a11y_media_has_caption -->
        <video
            autoplay
            loop
            playsinline
            class="fixed top-0 left-0 w-full h-full z-[-1] bg-black"
            style="filter: hue-rotate({hue}deg) brightness(0.5);{css.join(';')}"
            onloadstart={function () {
                this.volume = 0.45;
            }}
        >
            {#if mounted}
                <source src={eggSrc} type="video/mp4" />
            {/if}
        </video>
    {/key}
{/if}

<div class="relative z-10 min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-white text-4xl font-bold">lunatine.dev</h1>
        {#if eggSrc}
            <sub
                >press <code class="bg-black/50 p-[.15em] rounded">ESC</code>
                to stop video</sub
            >
        {/if}
    </div>
</div>

<!-- <ThemeSwitcher /> -->
