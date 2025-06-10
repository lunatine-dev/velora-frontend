/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte}"],
    theme: {
        extend: {
            fontFamily: {
                portal: ['"Share Tech Mono"', "monospace"],
                cyberpunk: ['"Orbitron"', "sans-serif"],
                lis: ['"Quicksand"', "sans-serif"],
            },
        },
    },
    plugins: [],
};
