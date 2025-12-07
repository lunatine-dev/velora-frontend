<script>
    import { onMount } from "svelte";
    import { clampPosition } from "$lib/utils/coords.js";

    // props
    let {
        src = "",
        type = "video",
        autoplay = true,
        muted = false,
        loop = true,
        scale = 0.6,
        startX,
        startY,
        title = "New Window",
        widthClass = "h-[30vw]",
    } = $props();

    // constants
    const HEIGHT_CLASS = "aspect-video";

    // State
    let visible = $state(true);
    let x = $state(startX ?? 40);
    let y = $state(startY ?? 40);
    let dragOffsetX = $state(0);
    let dragOffsetY = $state(0);
    let dragging = $state(false); // is dragging?

    let pointerId = $state(null);
    let windowEl = $state(null);

    // Helpers
    const getWindowRect = () => {
        return windowEl ? windowEl.getBoundingClientRect() : null;
    };

    const onPointerDown = (e) => {
        if (e.target.closest("button")) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragging = true;
        pointerId = e.pointerId;
        windowEl.setPointerCapture(pointerId);

        const rect = getWindowRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
    };
    const onPointerMove = (e) => {
        if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;

        let nx = e.clientX - dragOffsetX;
        let ny = e.clientY - dragOffsetY;

        [nx, ny] = clampPosition(nx, ny, getWindowRect()?.width ?? 360, getWindowRect()?.height ?? 780);

        x = nx;
        y = ny;
    };
    const onPointerUp = (e) => {
        if (!dragging) return;
        dragging = false;
        if (pointerId !== null) {
            try {
                windowEl.releasePointerCapture(pointerId);
            } catch {}
            pointerId = null;
        }
    };

    const closeWindow = () => {
        visible = false;
    };

    onMount(() => {
        const rect = windowEl.getBoundingClientRect();

        const windowWidth = rect.width;
        const windowHeight = rect.height;

        const maxX = window.innerWidth - windowWidth;
        const maxY = window.innerHeight - windowHeight;

        x = Math.random() * maxX;
        y = Math.random() * maxY;

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);

        return () => {
            // Unmount
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
        };
    });
</script>

{#if visible}
    <div
        bind:this={windowEl}
        class="absolute z-50 cursor-grab touch-none"
        style:left={`${x}px`}
        style:top={`${y}px`}
        onpointerdown={onPointerDown}
    >
        <div
            class={`relative ${widthClass} ${HEIGHT_CLASS} border border-gray-400 shadow-lg rounded-sm bg-gray-200 flex flex-col overflow-hidden`}
        >
            <!-- Title Bar -->
            <div class="flex items-center justify-between bg-blue-600 text-white font-bold px-2 py-1 select-none">
                <span>{title}</span>
                <button
                    class="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center rounded-sm text-sm"
                    aria-label="Close"
                    onclick={closeWindow}
                >
                    ✕
                </button>
            </div>

            <!-- Content: video or image -->
            <div class="relative flex-1 bg-black overflow-hidden">
                {#if type === "video"}
                    <video
                        {src}
                        class="absolute inset-0 w-full h-full object-cover scale-[1.02]"
                        {autoplay}
                        {muted}
                        {loop}
                        playsinline
                        onloadstart={function () {
                            this.volume = 0.45;
                        }}
                    >
                    </video>
                {:else}
                    <img {src} class="absolute inset-0 w-full h-full object-cover" alt="" />
                {/if}
            </div>
        </div>
    </div>
{/if}
