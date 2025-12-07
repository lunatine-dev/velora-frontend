<script>
    import Card from "$lib/components/Card/Card.svelte";
</script>

<div class="container mx-auto mt-5">
    <div class="grid grid-cols-3 gap-4 mb-5">
        <div class="box p-3">Box 1</div>
        <div class="box p-3">Box 2</div>
        <div class="box p-3">Box 3</div>
    </div>
    <div class="grid grid-cols-3 gap-4">
        <Card>
            {#snippet header()}
                <span class="text-2xl">Header</span>
            {/snippet}
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam et debitis laborum commodi ducimus.
                Enim tenetur vero nulla earum hic distinctio sapiente provident debitis inventore, cupiditate
                consequuntur odit corporis aspernatur?
            </p>
            {#snippet footer()}
                <span class="text-gray-500">Footer</span>
            {/snippet}
        </Card>
    </div>
</div>

<div class="container box mx-auto mt-5">
    <h1>Container</h1>
</div>
