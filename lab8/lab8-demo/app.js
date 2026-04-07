import { 
    BaseHttpClient, 
    AuthProxy, 
    AuthStrategies, 
    LoggingProxy, 
    GitHubService 
} from '@arthur/lab8-core';
const base = new BaseHttpClient();
const auth = new AuthProxy(base);
const logger = new LoggingProxy(auth);
const service = new GitHubService(logger);
async function run() {
    console.log("Starting lab8 demo: Authentication proxy\n");
    console.log("Test 1: API key strategy");
    auth.setStrategy(AuthStrategies.apiKey('kpi-secret-key-2026'));
    await service.getUserProfile('arturkuzmenko');
    console.log("\nTest 2: JWT with automatic refresh");
    auth.setStrategy(AuthStrategies.jwt('expired-token'));
    const result = await service.getUserProfile('admin');
    console.log("\nFinal result status:", result.status);
    console.log("Demo finished successfully.");
}
run().catch(console.error);