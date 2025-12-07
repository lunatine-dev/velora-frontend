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
    } = $props();

    // constants
    const WIDTH_CLASS = "w-[15vw]";
    const HEIGHT_CLASS = "aspect-[0.5]";

    // State
    let visible = $state(true);
    let x = $state(startX ?? 40);
    let y = $state(startY ?? 40);
    let dragOffsetX = $state(0);
    let dragOffsetY = $state(0);
    let dragging = $state(false); // is dragging?

    let pointerId = $state(null);
    let phoneEl = $state(null);

    // Helpers
    const getPhoneRect = () => {
        return phoneEl ? phoneEl.getBoundingClientRect() : null;
    };
    const onPointerDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        dragging = true;
        pointerId = e.pointerId;
        phoneEl.setPointerCapture(pointerId);

        const rect = getPhoneRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
    };
    const onPointerMove = (e) => {
        if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;

        let nx = e.clientX - dragOffsetX;
        let ny = e.clientY - dragOffsetY;

        [nx, ny] = clampPosition(nx, ny, getPhoneRect()?.width ?? 360, getPhoneRect()?.height ?? 780);

        x = nx;
        y = ny;
    };
    const onPointerUp = (e) => {
        if (!dragging) return;
        dragging = false;
        if (pointerId !== null) {
            try {
                phoneEl.releasePointerCapture(pointerId);
            } catch {}
            pointerId = null;
        }
    };

    onMount(() => {
        const rect = phoneEl.getBoundingClientRect();

        const phoneWidth = rect.width;
        const phoneHeight = rect.height;

        const maxX = window.innerWidth - phoneWidth;
        const maxY = window.innerHeight - phoneHeight;

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
        bind:this={phoneEl}
        class={`absolute ${WIDTH_CLASS} ${HEIGHT_CLASS} rounded-[40px] p-4 bg-gradient-to-b from-slate-800/80 to-slate-900/60 shadow-2xl flex items-center justify-center z-50`}
        style="left: {x}px; top: {y}px; touch-action: none;"
        onpointerdown={onPointerDown}
    >
        <div
            class="relative w-full h-full rounded-[28px] overflow-hidden bg-black border border-white/10 flex flex-col select-none"
        >
            <div
                class="absolute top-0 left-0 right-0 z-100 h-11 flex items-center justify-between px-3 text-white/90 text-sm font-semibold bg-black/20 backdrop-blur-sm"
            >
                <span aria-live="polite">
                    {(() => {
                        const d = new Date();
                        const h = d.getHours() % 12 || 12;
                        const m = `${d.getMinutes()}`.padStart(2, "0");
                        return `${h}:${m}`;
                    })()}
                </span>
                <div class="flex items-center gap-2">
                    <span aria-hidden>📶</span>
                    <span aria-hidden>📡</span>
                    <span aria-hidden>🔋</span>
                </div>
            </div>

            <div
                class="absolute left-1/2 -translate-x-1/2 top-2 z-100 pointer-events-none w-[140px] h-6 rounded-full flex items-center justify-center"
            >
                <span class="w-2 h-2 bg-black rounded-full"></span>
            </div>

            <div class="flex-1 bg-transparent">
                {#if type === "video"}
                    <video
                        {src}
                        class="absolute inset-0 w-full h-full object-cover scale-[1.05]"
                        {muted}
                        {autoplay}
                        {loop}
                        playsinline
                        onloadstart={function () {
                            this.volume = 0.45;
                        }}
                    >
                    </video>
                {:else}
                    <img {src} class="w-full h-full object-cover" alt="" />
                {/if}
            </div>

            <!-- Home indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center">
                <div class="w-24 h-1.5 bg-white/40 rounded-full"></div>
            </div>
        </div>
    </div>
{/if}
