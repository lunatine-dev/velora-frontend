<script>
    import UserDropdown from "./UserDropdown.svelte";
    import { theme } from "$lib/stores/theme";
    import Menu from "~icons/mdi/menu";

    let { isLoggedIn = true, pathname } = $props();

    let currentPath = $derived(pathname);
    let isTransparent = $derived(pathname === "/");
</script>

<header class={isTransparent ? "transparent" : ""}>
    <nav
        data-theme={$theme}
        class={`w-full top-0 z-50 transition-colors duration-300 
		${isTransparent ? "backdrop-blur-sm absolute" : "shadow"}`}
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <!-- Logo -->
                <div
                    class="flex-shrink-0 text-xl font-bold text-slate-900 dark:text-white"
                >
                    lunatine.dev
                </div>

                <!-- Nav Links -->
                <div
                    class="hidden md:flex gap-6 text-slate-700 dark:text-slate-300"
                >
                    <a
                        href="/"
                        class={`${currentPath === "/" ? "active" : ""} hover:text-white`}
                        >Home</a
                    >
                    <a
                        href="/test"
                        class={`${currentPath === "/test" ? "active" : ""}`}
                        >Test</a
                    >
                    <a
                        href="/test2"
                        class={`${currentPath === "/test2" ? "active" : ""}`}
                        >Test2</a
                    >
                </div>

                <!-- Right side: Auth buttons or user menu -->
                <div class="items-center gap-4 hidden md:flex">
                    {#if isLoggedIn}
                        <!-- Logged in user avatar or menu -->
                        <UserDropdown {isTransparent} />
                    {:else}
                        <a
                            href="/login"
                            class="text-slate-700 dark:text-slate-200 hover:underline"
                        >
                            Log in
                        </a>
                        <a
                            href="/signup"
                            class="px-3 py-1.5 rounded-md bg-[#6165ec] text-white hover:bg-[#4f52d3] transition"
                        >
                            Sign up
                        </a>
                    {/if}
                </div>
                <div class="flex md:hidden">
                    <Menu />
                </div>
            </div>
        </div>
    </nav>
</header>

<style>
    header {
        nav {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            .active {
                color: var(--colors-accent);
                border-bottom: 1px solid var(--colors-accent);
            }
        }
    }
    header:not(.transparent) {
        nav {
            border-bottom: 1px solid var(--colors-accent);
            background-color: var(--colors-secondary);

            &[data-theme="cyberpunk"] {
                border-bottom: 1px solid var(--colors-primary--600);
            }
        }
    }
</style>
