const Key = require('../lib/Key')

class Node {
  constructor(key, next) {
    this.key = key
    this.next = next
  }
}

class SequentialSearchSet {
  isEmpty() {
    return this.size === 0
  }

  size() {
    return this.size
  }

  add(key) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)

    for (let node = this.first; node; node = node.next) {
      if (key.equals(node.key)) {
        node.key = key
        return
      }
    }

    this.first = new Node(key, this.first)
    this.size++
  }

  delete(key) {
    if (!key) {
      throw new Error('Argument to delete() cannot be null')
    }

    if (this.isEmpty()) return

    if (this.first.key.equals(key)) {
      this.first = this.first.next
      this.size--
      return
    }

    for (let node = this.first; node; node = node.next) {
      if (node.next && node.next.key.equals(key)) {
        node.next = node.next.next
        this.size--
        return
      }
    }
  }

  keys() {
    const queue = []
    for (let node = this.first; node; node = node.next) {
      queue.push(node.key)
    }

    return queue
  }
}

const set = new SequentialSearchSet()
set.add('a')
set.add('b')
set.add('c')
set.add('a')

console.log(set.keys())
