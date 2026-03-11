export function* colorCycleGenerator(colors) {
    let index = 0;
    while (true) {
        yield colors[index];
        index = (index + 1) % colors.length;
    }
}