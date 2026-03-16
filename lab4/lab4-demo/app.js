import { PriorityQueue } from '@arthur/lab4-core';
const pq = new PriorityQueue();
pq.enqueue("Routine Task", 1);
pq.enqueue("Urgent Task", 10);
pq.enqueue("Daily Task", 5);
console.log("Peek Highest:", pq.peek('highest').item);
console.log("Dequeue Lowest:", pq.dequeue('lowest'));
console.log("Dequeue Newest:", pq.dequeue('newest'));