export const withLogging = (fn) => {
    return async (...args) => {
        const timestamp = new Date().toISOString();
        const functionName = fn.name || 'anonymous';
        console.log(`[${timestamp}] [INFO] Calling: ${functionName} with args:`, args);
        try {
            const result = await fn(...args);
            console.log(`[${timestamp}] [INFO] ${functionName} returned:`, result);
            return result;
        } catch (error) {
            console.error(`[${timestamp}] [ERROR] ${functionName} failed:`, error.message);
            throw error;
        }
    };
};