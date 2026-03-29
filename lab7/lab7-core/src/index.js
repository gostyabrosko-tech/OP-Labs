export class SafeEventEmitter {
    constructor() {
        this.events = new Map();
    }
    subscribe(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
        return () => this.unsubscribe(event, listener);
    }
    unsubscribe(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0) {
                this.events.delete(event);
            }
        }
    }
    emit(event, data) {
        const listeners = this.events.get(event);
        if (!listeners || listeners.size === 0) {
            if (event !== 'error') {
                console.warn(`Warning: No active listeners for event: "${event}"`);
            }
            return;
        }
        listeners.forEach((listener) => {
            try {
                listener(data);
            } catch (error) {
                if (event !== 'error') {
                    this.emit('error', {
                        event,
                        data,
                        error: error.message || error
                    });
                } else {
                    console.error('Critical failure in error handler:', error);
                }
            }
        });
    }
}