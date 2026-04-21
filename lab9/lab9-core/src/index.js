const defaultFormatter = (payload) => {
    const { timestamp, level, name, message, args, result, duration, error } = payload;
    let logMsg = `[${timestamp}] [${level}] [${name}] ${message}`;
    if (args) logMsg += ` | Args: ${JSON.stringify(args)}`;
    if (result) logMsg += ` | Result: ${JSON.stringify(result)}`;
    if (duration) logMsg += ` | Timing: ${duration}ms`;
    if (error) logMsg += ` | ERROR: ${error}`;  
    return logMsg;
};
export const jsonFormatter = (payload) => JSON.stringify({ ...payload, app: 'arthur-lab-9' });
export const withLogging = (fn, config = {}) => {
    const { 
        level = 'INFO', 
        logger = console,
        formatter = defaultFormatter
    } = config;
    return async (...args) => {
        const timestamp = new Date().toISOString();
        const name = fn.name || 'anonymous';
        const start = performance.now();
        const buildPayload = (overrides) => ({
            timestamp, level, name, ...overrides
        });
        try {
            if (level === 'INFO' || level === 'DEBUG') {
                logger.log(formatter(buildPayload({ message: 'CALL', args })));
            }
            const result = await fn(...args);
            if (level === 'DEBUG') {
                const duration = (performance.now() - start).toFixed(3);
                logger.log(formatter(buildPayload({ message: 'Return', result, duration })));
            }
            return result;
        } catch (error) {
            logger.error(formatter(buildPayload({ level: 'Error', message: 'Failed', error: error.message })));
            throw error;
        }
    };
};