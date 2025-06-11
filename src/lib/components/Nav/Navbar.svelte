<script>
    import UserDropdown from "./UserDropdown.svelte";
    import { theme } from "$lib/stores/theme";
    import Menu from "~icons/mdi/menu";
    import Discord from "~icons/ic/baseline-discord";
    import { routes } from "$lib/constants/navigation";

    let { isLoggedIn = false, pathname } = $props();

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
                    {#each routes as route}
                        {#if !route.hidden}
                            <a
                                href={route.href}
                                class={`${currentPath === route.href ? "active" : ""} flex items-center`}
                            >
                                {#if route.icon}
                                    <route.icon
                                        class={route.iconOnly ? "" : "mr-2"}
                                    />
                                {/if}
                                {#if !route.iconOnly}
                                    {route.name}
                                {/if}
                            </a>
                        {/if}
                    {/each}
                </div>

                <!-- Right side: Auth buttons or user menu -->
                <div class="items-center gap-4 hidden md:flex">
                    {#if isLoggedIn}
                        <!-- Logged in user avatar or menu -->
                        <UserDropdown {isTransparent} />
                    {:else}
                        <a
                            href="/signup"
                            class="px-3 py-1.5 rounded-md bg-[#6165ec] text-white hover:bg-[#4f52d3] transition flex items-center"
                        >
                            <Discord class="mr-1" />
                            Login with Discord
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

            a {
                border: 1px solid transparent;
                transition:
                    color 250ms,
                    border-color,
                    250ms,
                    border-width 250ms;
                &.active,
                &:hover {
                    color: var(--colors-accent);
                    border-bottom: 1px solid var(--colors-accent);
                }
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
