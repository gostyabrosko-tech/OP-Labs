import { SafeEventEmitter } from '@arthur/lab7-core';
const bus = new SafeEventEmitter();
bus.subscribe('order', (data) => console.log('Order received:', data.id));
bus.subscribe('order', () => { throw new Error('Database connection failed!'); });
bus.subscribe('error', (info) => console.log('Monitor caught error:', info.error));
console.log('Lab7 test');
bus.emit('order', { id: 777 });