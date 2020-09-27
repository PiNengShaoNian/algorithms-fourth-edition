class Queue {
  queue = []

  enqueue(v) {
    this.queue.push(v)
  }

  dequeue() {
    return this.queue.shift()
  }
}

class Stack {
  stack = []

  push(v) {
    this.stack.push(v)
  }

  pop() {
    return this.stack.pop()
  }
}

class MaxValue {
  queue = new Queue()
  stack = new Stack()
  max = Number.MIN_SAFE_INTEGER

  insert(v) {
    if (v > this.max) {
      this.max = v
      this.stack.push(v)
    }
    else {
        const second = this.stack.pop()
        this.stack.push()
    }
  }
}
