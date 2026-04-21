import { withLogging, jsonFormatter } from '@arthur/lab9-core';
const calculateArea = (r) => Math.PI * r * r;
const fetchRemoteConfig = async (status) => {
    await new Promise(res => setTimeout(res, 500));
    if (status === 'fail') throw new Error("Network timeout");
    return { version: "1.0.4", status: "stable" };
};
const debugArea = withLogging(calculateArea, { level: 'Debug' });
const errorOnlyFetch = withLogging(fetchRemoteConfig, { 
    level: 'Error', 
    formatter: jsonFormatter 
});
async function runDemo() {
    console.log("Test 1: Debug level (Sync function)");
    await debugArea(5);
    console.log("\nTest 2: Error level (Async + Success)");
    await errorOnlyFetch('ok');
    console.log("(Quiet as expected)");
    console.log("\nTest 3: Error level (Async + Failed)");
    try {
        await errorOnlyFetch('fail');
    } catch (e) {
    }
}
runDemo();