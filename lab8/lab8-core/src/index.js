export class BaseHttpClient {
    async request(url, options = {}) {
        console.log(`[BaseClient] Fetching: ${url}`);
        if (options.headers?.Authorization === 'Bearer expired-token') {
            return { status: 401, data: { error: "Unauthorized" } };
        }
        return { status: 200, data: { message: "Success", target: url } };
    }
}
export class AuthProxy {
    constructor(client) {
        this.client = client;
        this.strategy = null;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    async request(url, options = {}) {
        const applyAuth = (opt) => this.strategy ? this.strategy.apply(opt) : opt;
        let response = await this.client.request(url, applyAuth(options));
        if (response.status === 401 && this.strategy?.refresh) {
            console.log("[Proxy] Token expired. Attempting refresh...");
            await this.strategy.refresh();
            console.log("[Proxy] Retrying request with new token...");
            response = await this.client.request(url, applyAuth(options));
        }
        return response;
    }
}
export const AuthStrategies = {
    jwt: (initialToken) => {
        let token = initialToken;
        return {
            apply: (opt) => ({
                ...opt,
                headers: { ...opt.headers, 'Authorization': `bearer ${token}` }
            }),
            refresh: async () => {
                await new Promise(r => setTimeout(r, 500));
                token = 'new-valid-token';
                console.log("[Strategy] JWT Token refreshed successfully.");
            }
        };
    }
};