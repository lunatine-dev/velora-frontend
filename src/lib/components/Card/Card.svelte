<script>
    let { header, children, footer } = $props();
</script>

<div class="card p-3">
    <div class="card-header">
        {@render header?.()}
    </div>
    <div class="card-body">
        {@render children?.()}
    </div>
    {#if footer}
        <div class="card-footer">
            {@render footer?.()}
        </div>
    {/if}
</div>
