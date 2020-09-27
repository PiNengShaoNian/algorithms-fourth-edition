class Node {
  item
  next
}

class Bag {
  N = 0
  first
  size() {
    return this.N
  }

  add(item) {
    const oldFirst = this.first
    this.first = new Node()
    this.first.item = item
    this.first.next = oldFirst

    this.N++
  }

  *[Symbol.iterator]() {
    let currentNode = this.first
    while (currentNode) {
      yield currentNode.item
      currentNode = currentNode.next
    }
  }
}

module.exports = Bag
