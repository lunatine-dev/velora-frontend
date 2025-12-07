export const clampPosition = (nx, ny, w, h) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const minX = 0;
    const minY = 0;
    const maxX = Math.max(0, vw - w);
    const maxY = Math.max(0, vh - h);

    return [Math.min(maxX, Math.max(minX, nx)), Math.min(maxY, Math.max(minY, ny))];
};
