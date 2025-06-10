<script>
    import { onMount } from "svelte";
    import { theme } from "$lib/stores/theme";

    const themes = ["portal", "cyberpunk", "lis"];

    // Change theme
    function switchTheme(t) {
        theme.set(t);
    }
</script>

<div
    class="fixed bottom-25 right-4 bg-white dark:bg-zinc-900 shadow-lg rounded-xl px-4 py-2 flex gap-2 z-50"
>
    {#each themes as t}
        <button
            on:click={() => switchTheme(t)}
            class="px-3 py-1 rounded-md font-medium text-sm transition-all
			       bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700
			       {$theme === t ? 'ring-2 ring-blue-400' : ''}"
        >
            {t}
        </button>
    {/each}
</div>
