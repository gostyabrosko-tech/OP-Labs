export class PriorityQueue {
    constructor() {
        this.items = [];
        this.idCounter = 0;
    }
    enqueue(item, priority) {
        const element = { item, priority, id: this.idCounter++ };
        let low = 0;
        let high = this.items.length;
        while (low < high) {
            let mid = (low + high) >>> 1;
            if (this.items[mid].priority < priority) low = mid + 1;
            else high = mid;
        }
        this.items.splice(low, 0, element);
    }
    peek(mode = 'highest') {
        if (this.items.length === 0) return null;
        if (mode === 'highest') return this.items[this.items.length - 1];
        if (mode === 'lowest') return this.items[0];
        let target = this.items[0];
        for (const el of this.items) {
            if (mode === 'oldest' && el.id < target.id) target = el;
            if (mode === 'newest' && el.id > target.id) target = el;
        }
        return target;
    }
    dequeue(mode = 'highest') {
        const target = this.peek(mode);
        if (!target) return null;
        const index = this.items.findIndex(i => i.id === target.id);
        return this.items.splice(index, 1)[0].item;
    }
}