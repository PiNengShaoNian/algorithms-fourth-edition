class DoubleNode {
  item
  previous
  next
}

class DoublyLinkedList {
  listSize = 0

  size() {
    return this.listSize
  }

  isEmpty() {
    return this.listSize === 0
  }

  getFirstNode() {
    return this.first
  }

  getLastNode() {
    return this.last
  }

  get(index) {
    if (this.isEmpty()) return null

    if (index < 0 || index >= this.listSize) {
      throw new Error('Index must be between 0 and' + (this.size() - 1))
    }

    let current
    if (index <= this.listSize / 2) {
      current = this.first
      let count = 0
      while (count != index) {
        current = current.next
        count++
      }
    } else {
      current = this.last

      let count = this.listSize - 1
      while (count != index) {
        current = current.previous
        count--
      }
    }

    return current.item
  }

  insertAtTheBeginning(item) {
    const oldFirst = this.first

    this.first = new DoubleNode()
    this.first.item = item
    this.first.next = oldFirst

    if (oldFirst) {
      oldFirst.previous = this.first
    }

    if (this.isEmpty()) {
      this.last = this.first
    }

    this.listSize++
  }

  insertAtTheBeginningAndReturnNode(item) {
    const oldFirst = this.first

    this.first = new DoubleNode()
    this.first.item = item
    this.first.next = oldFirst

    if (oldFirst) {
      oldFirst.previous = this.first
    }

    if (this.isEmpty()) {
      this.last = this.first
    }

    this.listSize++

    return this.first
  }

  insertAtTheEnd(item) {
    const oldLast = this.last

    this.last = new DoubleNode()
    this.last.item = item
    this.last.previous = oldLast

    if (oldLast) {
      oldLast.next = this.last
    }

    if (this.isEmpty()) {
      this.first = this.last
    }

    this.listSize++
  }

  insertBeforeNode(beforeItem, item) {
    if (this.isEmpty()) return

    let currentNode

    for (
      currentNode = this.first;
      currentNode;
      currentNode = currentNode.next
    ) {
      if (currentNode.item === beforeItem) {
        break
      }
    }

    if (currentNode) {
      const newNode = new DoubleNode()
      newNode.item = item

      const previousNode = currentNode.previous
      currentNode.previous = newNode
      newNode.next = currentNode
      newNode.previous = previousNode

      if (!newNode.previous) {
        this.first = newNode
      } else {
        newNode.previous.next = newNode
      }

      this.listSize++
    }
  }

  insertAfterNode(afterNode, item) {
    if (this.isEmpty()) return

    let currentNode

    for (
      currentNode = this.first;
      currentNode;
      currentNode = currentNode.next
    ) {
      if (currentNode.item === item) {
        break
      }
    }

    if (currentNode) {
      const newNode = new DoubleNode()
      newNode.item = item

      const nextNode = currentNode.next
      currentNode.next = newNode
      newNode.previous = currentNode
      newNode.next = nextNode

      if (!newNode.next) {
        this.last = newNode
      } else {
        newNode.next.previous = newNode
      }

      this.listSize++
    }
  }

  removeFromTheBeginning() {
    if (this.isEmpty()) return null

    const item = this.first.item

    if (this.first.next) {
      this.first.next.previous = null
    } else {
      this.last = null
    }

    this.first = this.first.next
    this.listSize--

    return item
  }

  removeFromTheEnd() {
    if (this.isEmpty()) return null

    const item = this.last.item

    if (this.last.previous) {
      this.last.previous.next = null
    } else {
      this.first = null
    }

    this.last = this.last.previous

    this.listSize--

    return item
  }

  removeItem(item) {
    if (this.isEmpty()) return

    let currentNode = this.first

    while (currentNode) {
      if (currentNode.item === item) {
        removeItemWithNode(currentNode)
        break
      }

      currentNode = currentNode.next
    }
  }

  removeItemWithNode(doubleNode) {
    if (!doubleNode) {
      throw new Error('Node cannot be null')
    }

    if (this.isEmpty()) return

    const previousNode = doubleNode.previous
    const nextNode = doubleNode.next

    if (previousNode) {
      previousNode.next = nextNode
    }
    if (nextNode) {
      nextNode.previous = previousNode
    }

    if (doubleNode === this.first) {
      this.first = nextNode
    }

    if (doubleNode === this.last) {
      this.last = previousNode
    }

    this.size--
  }

  removeItemWithIndex(nodeIndex) {
    if (this.isEmpty()) return null

    if (nodeIndex < 0 || nodeIndex >= this.size()) {
      throw new Error('Index must be between 0 and ' + (this.size() - 1))
    }

    const startFromTheBeginning = nodeIndex <= this.size() / 2
    const index = startFromTheBeginning ? 0 : this.size() - 1

    let currentNode = startFromTheBeginning ? this.first : this.last

    while (currentNode) {
      if (nodeIndex === index) {
        break
      }

      if (startFromTheBeginning) {
        index++
      } else {
        index--
      }

      currentNode = startFromTheBeginning
        ? currentNode.next
        : currentNode.previous
    }

    const item = currentNode.item

    this.removeItemWithNode(currentNode)

    return item
  }

  DoublyLinkedListIterator = () => {
    let currentNode = this.first

    return {
      next: () => {
        if (currentNode) {
          const item = currentNode.item
          currentNode = currentNode.next
          return { value: item, done: false }
        } else {
          return { value: undefined, done: true }
        }
      },
      [Symbol.iterator]() {
        return this
      },
    }
  }

  values() {
    const values = []

    for (const value of this.DoublyLinkedListIterator()) {
      values.push(value)
    }

    return values
  }
}

module.exports = DoublyLinkedList
