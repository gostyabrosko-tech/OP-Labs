export class BaseHttpClient {
    async request(url, options = {}) {
        console.log(`[BaseClient] Fetching: ${url}`);
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
        const finalOptions = this.strategy 
            ? this.strategy.apply(options) 
            : options;
        return this.client.request(url, finalOptions);
    }
}
export const AuthStrategies = {
    apiKey: (key) => ({
        apply: (opt) => ({
            ...opt,
            headers: { ...opt.headers, 'X-API-KEY': key }
        })
    }),
    jwt: (token) => ({
        apply: (opt) => ({
            ...opt,
            headers: { ...opt.headers, 'Authorization': `bearer ${token}` }
        })
    })
};