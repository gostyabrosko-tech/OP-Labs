import { colorCycleGenerator, consumeWithTimeout } from '@arthur/lab1-core';
const colors = ["Red", "Green", "Blue", "Yellow"];
const myColorGen = colorCycleGenerator(colors);
consumeWithTimeout(myColorGen, 10);