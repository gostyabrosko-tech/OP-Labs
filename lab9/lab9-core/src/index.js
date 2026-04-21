export const withLogging = (fn, config = {}) => {
    const { 
        level = 'INFO', 
        logger = console 
    } = config;
    return async (...args) => {
        const timestamp = new Date().toISOString();
        const functionName = fn.name || 'anonymous';
        const start = performance.now();
        try {
            if (level === 'INFO' || level === 'DEBUG') {
                logger.log(`[${timestamp}] [${level}] CALL ${functionName} with:`, args);
            }
            const result = await fn(...args);
            if (level === 'DEBUG') {
                const duration = (performance.now() - start).toFixed(3);
                logger.log(`[${timestamp}] [DEBUG] Return ${functionName} (${duration}ms):`, result);
            }
            return result;
        } catch (error) {
            logger.error(`[${timestamp}] [ERROR] Failed ${functionName}: ${error.message}`);
            throw error;
        }
    };
};