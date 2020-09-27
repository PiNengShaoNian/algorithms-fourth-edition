class Stack {
  first
  N = 0
  push(item) {
    const first = {
      item,
      next: this.first,
    }
    this.first = first
    this.N++
  }

  pop() {
    if (this.first) {
      this.first = this.first.next
    }
    this.N--
  }

  *[Symbol.iterator]() {
    for (let x = this.first; x; x = x.next) {
      yield x
    }
  }
}

const stack = new Stack()
stack.push(2)
stack.push(4)
stack.push(6)
for (let x of stack) console.log(x.item)
