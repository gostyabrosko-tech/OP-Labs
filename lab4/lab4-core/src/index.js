export class PriorityQueue {
    constructor() {
        this.items = [];
        this.counter = 0;
    }
    enqueue(item, priority) {
        const element = { item, priority, id: this.counter++ };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, element);
                added = true;
                break;
            }
        }
        if (!added) this.items.push(element);
    }
    peek(mode = 'highest') {
        if (this.items.length === 0) return null;
        switch(mode) {
            case 'highest': return this.items[this.items.length - 1];
            case 'lowest':  return this.items[0];
            case 'oldest':  return this.items.reduce((prev, curr) => prev.id < curr.id ? prev : curr);
            case 'newest':  return this.items.reduce((prev, curr) => prev.id > curr.id ? prev : curr);
            default: return null;
        }
    }
    dequeue(mode = 'highest') {
        const element = this.peek(mode);
        if (!element) return null;
        const index = this.items.findIndex(i => i.id === element.id);
        return this.items.splice(index, 1)[0].item;
    }
}