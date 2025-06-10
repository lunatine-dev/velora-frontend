<script>
    import { onClickOutside } from "$lib/actions/onClickOutside";

    import { theme, videos } from "$lib/stores/theme";

    let { isTransparent } = $props();
    let dropdownOpen = $state(false);

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function handleClickOutside() {
        dropdownOpen = false;
    }
</script>

<div
    class="relative dropdown-parent cursor-pointer {isTransparent
        ? 'transparent'
        : ''}"
    id="user-menu"
    use:onClickOutside={handleClickOutside}
    data-theme={$theme}
>
    <button
        onclick={toggleDropdown}
        class="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
    >
        <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            class="w-8 h-8 rounded-full border-2 border-indigo-500"
        />
        <span class="ml-2">User</span>
        <svg
            class="ml-2 w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            ></path>
        </svg>
    </button>

    {#if dropdownOpen}
        <div
            class="dropdown"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
        >
            <a
                href="/profile"
                class="dropdown-item"
                role="menuitem"
                onclick={() => (dropdownOpen = false)}>Profile</a
            >
            <a
                href="/settings"
                class="dropdown-item"
                role="menuitem"
                onclick={() => (dropdownOpen = false)}>Settings</a
            >
            <a
                href="/logout"
                class="dropdown-item logout"
                role="menuitem"
                onclick={() => (dropdownOpen = false)}>Log out</a
            >
        </div>
    {/if}
</div>

<style>
    .dropdown {
        position: absolute;
        right: 0;
        margin-top: 0.5rem;
        width: 12rem;
        border-radius: 0.375rem;
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 50;
        font-size: 0.875rem;
        padding: 0.25rem 0;
        backdrop-filter: none;
    }

    .dropdown-item {
        display: block;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        transition:
            background-color 0.2s,
            color 0.2s;
    }

    .dropdown-item:hover {
        background-color: #4f46e5; /* indigo-600 */
        color: white;
    }

    .dropdown-item.logout {
        color: #dc2626; /* red-600 */
    }

    .dropdown-item.logout:hover {
        background-color: #fee2e2; /* red-100 */
    }

    @media (prefers-color-scheme: dark) {
        .dropdown-item.logout:hover {
            background-color: #7f1d1d; /* red-800 */
        }
    }

    /* --- Theme overrides --- */

    /* Default background style (non-transparent) */
    .dropdown-parent:not([data-theme]) .dropdown {
        background-color: white;
        color: #334155; /* slate-700 */
        border: 1px solid rgba(0, 0, 0, 0.05);
    }
    @media (prefers-color-scheme: dark) {
        .dropdown-parent:not([data-theme]) .dropdown {
            background-color: #1e293b; /* dark slate-800 */
            color: #e2e8f0; /* slate-200 */
        }
    }

    /* Transparent theme styling */
    .dropdown-parent.transparent .dropdown {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        backdrop-filter: blur(12px);
    }
    @media (prefers-color-scheme: dark) {
        .dropdown-parent.transparent .dropdown {
            background-color: rgba(30, 41, 59, 0.3); /* slate-700/30 */
            color: #e2e8f0;
        }
    }

    /* Optional: Theme-specific overrides */
    .dropdown-parent[data-theme="portal"]:not(.transparent) .dropdown {
        background-color: rgba(99, 102, 241, 0.5);
        color: white;
        backdrop-filter: blur(8px);
    }

    .dropdown-parent[data-theme="cyberpunk"]:not(.transparent) .dropdown {
        background-color: var(--colors-bg--300);

        border: 1px solid var(--colors-primary--600-opacity) !important;
        clip-path: var(--ui-notch-path) !important;
        border-radius: 0 !important;

        &:before {
            background-color: var(--colors-primary--600-opacity);
            bottom: 5px;
            content: "";
            display: block;
            height: 2px; /* bigger to compensate transform */
            position: absolute;
            right: -6px;
            top: auto;
            transform: rotate(-45deg);
            width: var(--ui-notch-hypotenuse);
            z-index: 1000000;
        }
    }

    .dropdown-parent[data-theme="lis"]:not(.transparent) .dropdown {
        background-color: rgba(70, 130, 180, 0.5);
        color: white;
        backdrop-filter: blur(10px);
    }

    /* non transparent */
    .dropdown-parent[data-theme="portal"] .dropdown {
        background-color: rgba(99, 102, 241, 0.5);
        color: white;
        backdrop-filter: blur(8px);
    }

    .dropdown-parent[data-theme="cyberpunk"] .dropdown {
        background-color: rgba(255, 0, 128, 0.1);
        color: #f0f0f0;
        backdrop-filter: blur(10px);
    }

    .dropdown-parent[data-theme="lis"] .dropdown {
        background-color: rgba(70, 130, 180, 0.5);
        color: white;
        backdrop-filter: blur(10px);
    }
</style>
