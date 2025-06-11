import Home from "~icons/mdi/home-outline";
import Projects from "~icons/mdi/view-grid-outline";
import UI from "~icons/mdi/view-quilt-outline";

export const routes = [
    {
        name: "Home",
        href: "/",
        iconOnly: true,
        icon: Home,
    },
    {
        name: "Projects",
        href: "/test",
        icon: Projects,
    },
    {
        name: "UI",
        href: "/ui",
        icon: UI,
    },
];
