const Steque = require('./1.4.29')

class Deque {
  s = []
  ste = new Steque()

  isEmpty() {
    return !this.s.length && this.ste.isEmpty()
  }

  size() {
    return this.s.length + this.ste.size()
  }

  pushRight(v) {
    this.ste.push(v)
  }

  popRight() {
    if (this.ste.isEmpty()) {
      while (!this.s.length) {
        this.ste.push(s.pop())
      }
    }

    return this.ste.pop()
  }

  popLeft() {
    if (!this.s.length) {
      this.s.push(this.ste.pop())
    }

    return this.s.pop()
  }

  pushLeft(item) {
    this.ste.push(item)
  }
}

const deque = new Deque()

deque.pushRight(1)
deque.pushRight(2)
deque.pushRight(3)
deque.pushLeft(-1)
deque.pushLeft(-2)
deque.popRight()
deque.popLeft()
console.log(deque)
