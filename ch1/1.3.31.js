class DoubleNode {
  first = {
    next: null,
    item: null,
    prev: null,
  }

  N = 0

  last = null

  push(item) {
    const { first, last } = this

    if (!first.next && !first.item) {
      first.item = item
      this.last = first
      this.N = 1
      return
    }

    const node = {
      item,
      next: null,
      prev: last,
    }

    last.next = node
    this.last = node
    this.N++
  }

  unshift(item) {
    const node = {
      item,
      next: this.first,
      prev: null,
    }

    this.first.prev = node
    this.first = node
    this.N++
  }

  pop() {
    if (!this.first.next) {
      const node = this.first
      this.first = {
        next: null,
        prev: null,
        item: null,
      }

      this.N = 0

      return node
    }

    const node = this.last
    this.last = node.prev
    node.prev = null
    this.last.next = null
    this.N--
    return node
  }

  shift() {
    const node = this.first
    if (!node.next) {
      this.last = null
      this.first = {
        next: null,
        prev: null,
        item: null,
      }
      this.N = 0
      return node
    }

    this.first = node.next
    this.first.prev = null
    this.N--

    return node
  }

  insertAfter(node, item) {
    const { next } = node
    if (!next) {
      this.push(item)
    } else {
      const newNode = {
        next,
        item,
        prev: node,
      }
      next.prev = newNode
      node.next = newNode
    }

    this.N++
  }

  insertBefore(node, item) {
    const { before } = node
    if (!before) {
      this.unshift(item)
    } else {
      const newNode = {
        item,
        next: node,
        prev: before,
      }
      before.next = newNode
      node.prev = newNode
    }
    this.N++
  }

  isEmpty() {
    return this.N === 0
  }

  size() {
    return this.N
  }

  remove(node) {
    if (node === this.first) {
      this.shift()
    } else if (node === this.last) {
      this.pop()
    } else {
      const { prev, next } = node
      prev.next = next
      next.prev = prev
      node.next = null
      node.prev = null
    }
    this.N--
  }

  sample() {
    if (!this.first.next) {
      return this.first
    }
    const size = this.size()
    const index = Math.floor((size) * Math.random())
    const mid = size / 2
    let node
    if (mid < index) {
      let i = size - index
      node = this.last
      while (--i) {
        node = node.prev
      }
    } else {
      node = this.first
      let i = index
      while (i--) {
        node = node.next
      }
    }

    return node
  }

  *[Symbol.iterator]() {
    for (let x = this.first; x; x = x.next) {
      yield x
    }
  }
}

const node = new DoubleNode()
node.push(1)
node.push(2)
node.push(3)
node.unshift(0)
node.unshift(-1)
node.push(4)

// while (node.first.item || node.first.item === 0) {
//   console.log(node.pop().item)
// }

node.insertAfter(node.first, -0.8)
node.insertBefore(node.first, -2)
node.remove(node.first.next)
node.remove(node.first)
// for (const x of node) console.log(x.item)
// console.log(node.size())
for(let i = 0; i < 100; i++) console.log(node.sample().item)
