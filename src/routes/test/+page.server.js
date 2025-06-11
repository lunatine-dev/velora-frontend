export async function load() {
    // simulate a 3 second delay
    await new Promise((r) => setTimeout(r, 1000));

    return {
        message: "This took a while to load ⏳",
    };
}
