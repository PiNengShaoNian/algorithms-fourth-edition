class Steque {
  s1 = []
  s2 = []
  pop() {
    if (!this.s1.length) {
      if (!this.s2.length) return undefined
      while (this.s2.length) {
        this.s1.push(this.s2.pop())
      }
    }
    return this.s1.pop()
  }

  isEmpty() {
    return !this.s1.length && !this.s2.length
  }

  size() {
    return this.s1.length + this.s2.length
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

  push(v) {
    this.s1.push(v)
  }
}

module.exports = Steque
