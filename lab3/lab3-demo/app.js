import { memoize } from '@arthur/lab3-core';
const testFn = (n) => {
    console.log(`Processing: ${n}`);
    return n * 10;
};
const cachedFn = memoize(testFn, 2, 5000);
cachedFn(1);
cachedFn(1);
cachedFn(2);
cachedFn(3);
cachedFn(1);