class Queue {
  s1 = []
  s2 = []

  enqueue(v) {
    this.s1.push(v)
  }

  dequeue() {
    if (!this.s2.length) {
      if (!this.s1.length) return undefined

      while (this.s1.length) {
        this.s2.push(this.s1.pop())
      }
    }

    return this.s2.pop()
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.dequeue()
queue.dequeue()
queue.enqueue(4)
console.log(queue)
