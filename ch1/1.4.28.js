class Stack {
  queue = []
  push(v) {
    this.queue.push(v)
  }

  pop() {
    let i = this.queue.length - 1
    while (i--) {
      this.queue.push(this.queue.shift())
    }

    return this.queue.shift()
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop()
stack.pop()
stack.push(4)
stack.push(5)
console.log(stack)
