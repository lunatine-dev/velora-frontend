<!-- src/routes/+error.svelte -->
<script>
    import { page } from "$app/state";
</script>

<div
    class="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-200 text-center p-6 [html[data-theme=cyberpunk]_&]:bg-[#131417]"
>
    <h1 class="text-4xl font-bold">{page.status}</h1>
    <p class="text-xl mt-2">
        {page.error?.message ?? "Something went wrong 😿"}
    </p>
    <a
        href="/"
        class="mt-6 inline-block px-4 py-2 text-white rounded transition hover:!opacity-100 button"
    >
        Back to Home
    </a>
</div>
