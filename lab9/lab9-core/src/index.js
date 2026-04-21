export const withLogging = (fn) => {
    return (...args) => {
        console.log(`[${Date.now()}] Calling function: ${fn.name}`);
        const result = fn(...args);
        console.log(`[${Date.now()}] Result:`, result);
        return result;
    };
};