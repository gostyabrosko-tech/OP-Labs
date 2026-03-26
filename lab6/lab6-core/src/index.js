export async function* largeDataProducer(limit = 10, failAt = -1) {
    for (let i = 1; i <= limit; i++) {
        await new Promise(r => setTimeout(r, 50));
        if (i === failAt) {
            throw new Error(`Stream Error at item ${i}`);
        }
        yield { id: i, data: `Chunk #${i}`, timestamp: Date.now() };
    }
}