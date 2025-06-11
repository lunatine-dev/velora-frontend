import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const themes = ["portal", "cyberpunk", "lis"];
export const videos = {
    portal: "portal2.webm",
    cyberpunk: "cyberpunk.webm",
    lis: "lifeisstrange.mp4",
};

const initial = browser
    ? localStorage.getItem("theme") ?? "cyberpunk"
    : "cyberpunk";

export const theme = writable(initial);

theme.subscribe((val) => {
    if (browser) {
        localStorage.setItem("theme", val);
        document.documentElement.setAttribute("data-theme", val);
    }
});
