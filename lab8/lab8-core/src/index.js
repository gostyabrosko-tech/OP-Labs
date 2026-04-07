export class BaseHttpClient {
    async request(url, options = {}) {
        console.log(`[BaseClient] Executing request to: ${url}`);
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
            console.log("[AuthProxy] 401 detected. Attempting token refresh...");
            await this.strategy.refresh();
            console.log("[AuthProxy] Retrying with new credentials...");
            response = await this.client.request(url, applyAuth(options));
        }
        return response;
    }
}
export class LoggingProxy {
    constructor(client) {
        this.client = client;
    }
    async request(url, options = {}) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[LoggingProxy] [${timestamp}] Request initiated.`);
        return this.client.request(url, options);
    }
}
export class GitHubService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getUserProfile(username) {
        const url = `https://api.github.com/users/${username}`;
        console.log(`[GitHubService] Requesting info for @${username}`);
        return this.httpClient.request(url);
    }
}
export const AuthStrategies = {
    apiKey: (key) => ({
        apply: (opt) => ({
            ...opt,
            headers: { ...opt.headers, 'X-API-KEY': key }
        })
    }),
    jwt: (initialToken) => {
        let token = initialToken;
        return {
            apply: (opt) => ({
                ...opt,
                headers: { ...opt.headers, 'Authorization': `bearer ${token}` }
            }),
            refresh: async () => {
                await new Promise(r => setTimeout(r, 300));
                token = 'refreshed-jwt-token-2026';
            }
        };
    }
};