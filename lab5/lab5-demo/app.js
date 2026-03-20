import { mapAsyncCallback, mapAsyncPromise } from '@arthur/lab5-core';
const numbers = [1, 2, 3];
const controller = new AbortController();
console.log("test lab5");
mapAsyncCallback(numbers, (x, cb) => cb(null, x * 2), (err, res) => {
    if (err) console.log("CB Error:", err.name);
    else console.log("CB Result:", res);
}, controller.signal);
async function demo() {
    try {
        const res = await mapAsyncPromise(numbers, x => x + 10, controller.signal);
        console.log("Async Result:", res);
    } catch (e) {
        console.log("Async Error:", e.name);
    }
}
demo();