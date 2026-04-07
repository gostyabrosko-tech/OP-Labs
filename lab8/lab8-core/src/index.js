export class BaseHttpClient {
    async request(url, options = {}) {
        console.log(`[BaseClient] Fetching: ${url}`);
        return { 
            status: 200, 
            data: { message: "Success", target: url } 
        };
    }
}
export class AuthProxy {
    constructor(client) {
        this.client = client;
    }
    async request(url, options = {}) {
        return this.client.request(url, options);
    }
}