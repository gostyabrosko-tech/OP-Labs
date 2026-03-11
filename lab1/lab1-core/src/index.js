import { colorCycleGenerator } from './generator.js';
export async function consumeWithTimeout(iterator, timeoutInSeconds) {
    const startTime = Date.now();
    const durationMs = timeoutInSeconds * 1000;
    let iteration = 1;
    const colorCodes = {
        red: "\x1b[31m", green: "\x1b[32m", blue: "\x1b[34m",
        yellow: "\x1b[33m", reset: "\x1b[0m"
    };
    console.log(`\x1b[36mБуду працювати ${timeoutInSeconds} секунд\x1b[0m`);
    while (Date.now() - startTime < durationMs) {
        const { value: color } = iterator.next();
        const code = colorCodes[color.toLowerCase()] || "";
        const timestamp = new Date().toLocaleTimeString();
        console.log(`${code}[${iteration}] ${timestamp} - Колір: ${color}${colorCodes.reset}`);
        iteration++;
        await new Promise(r => setTimeout(r, 500));
    }
    console.log(`\n\x1b[35mЧас закінчився :( Виконав ітерацій: ${iteration - 1}\x1b[0m`);
}
export { colorCycleGenerator };