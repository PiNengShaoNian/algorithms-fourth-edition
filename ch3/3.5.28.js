const SeparateChainningHashTable = require('../lib/SeparateChainingHashTable')
const RedBlackTopDown234Trees = require('../lib/BlackRedTree')

class UniQueue {
  INITIAL_KEY = 50000
  OFFSET = 0.001
  constructor() {
    this.items = new SeparateChainningHashTable()
    this.queue = new RedBlackTopDown234Trees()
  }

  equeue(item) {
    if (this.contains(item)) return

    let key
    if (this.isEmpty()) {
      key = this.INITIAL_KEY
    } else {
      key = this.queue.max() + this.OFFSET
    }

    this.queue.put(key, item)
    this.items.put(item, key)
  }

  dequeue() {
    if (this.isEmpty()) return null

    const item = this.queue.get(this.queue.min())
    this.queue.deleteMin()
    this.items.delete(item)

    return item
  }

  contains(item) {
    return this.items.contains(item)
  }

  isEmpty() {
    return this.items.isEmpty()
  }

  values() {
    return this.items.keys()
  }
}

const uniQueue = new UniQueue()

uniQueue.equeue(1)
uniQueue.equeue(2)
uniQueue.equeue(3)
uniQueue.equeue(1)
uniQueue.equeue(2)
console.log(uniQueue.dequeue())
console.log(uniQueue.dequeue())
console.log(uniQueue.dequeue())
console.log(uniQueue.values())
