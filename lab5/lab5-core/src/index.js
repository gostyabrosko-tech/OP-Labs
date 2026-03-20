export class AbortError extends Error {
    constructor() {
        super('The operation was aborted');
        this.name = 'AbortError';
    }
}
export function mapAsyncCallback(array, fn, callback, signal) {
    if (array.length === 0) {
        return callback(null, []);
    }
    let results = [];
    let completed = 0;
    let isDone = false;
    const timers = new Set();
    const cleanup = () => {
        isDone = true;
        timers.forEach(clearTimeout);
        timers.clear();
        if (signal) {
            signal.removeEventListener('abort', onAbort);
        }
    };
    const onAbort = () => {
        cleanup();
        callback(new AbortError());
    };
    if (signal) {
        if (signal.aborted) return onAbort();
        signal.addEventListener('abort', onAbort, { once: true });
    }
    array.forEach((item, index) => {
        const timer = setTimeout(() => {
            timers.delete(timer);
            if (isDone) return;
            fn(item, (err, result) => {
                if (isDone) return;

                if (err) {
                    cleanup();
                    return callback(err);
                }
                results[index] = result;
                completed++;
                if (completed === array.length) {
                    cleanup();
                    callback(null, results);
                }
            });
        }, 100);
        timers.add(timer);
    });
}
export function mapAsyncPromise(array, fn, signal) {
    return new Promise((resolve, reject) => {
        mapAsyncCallback(
            array,
            (item, cb) => {
                try {
                    const res = fn(item);
                    cb(null, res);
                } catch (err) {
                    cb(err);
                }
            },
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
            },
            signal
        );
    });
}