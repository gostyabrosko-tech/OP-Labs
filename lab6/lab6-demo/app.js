import { largeDataProducer } from '@arthur/lab6-core';
async function runStreamDemo() {
    console.log("Case 1 successful incremental processing");
    try {
        for await (const chunk of largeDataProducer(5)) {
            console.log(`[CONSUMER] Received: ${chunk.data} (ID: ${chunk.id})`);
        }
        console.log("Stream finished processing successfully.\n");
    } catch (err) {
        console.error("❌ Unexpected error in Case 1:", err.message);
    }
    console.log("Case 2 robust error propagation");
    try {
        for await (const chunk of largeDataProducer(10, 3)) {
            console.log(`[CONSUMER] Received: ${chunk.data}`);
        }
    } catch (err) {
        console.error("Caught expected producer error:", err.message);
        console.log("Proves that stream doesnt fail silently.");
    }
}
runStreamDemo();