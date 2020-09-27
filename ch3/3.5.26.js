const DoublyLinkedList = require('../lib/DoublyLinkedList')
const SeparateChainningHashTable = require('../lib/SeparateChainingHashTable')

class LRUCache {
  constructor() {
    this.doublyLinkList = new DoublyLinkedList()
    this.hashTable = new SeparateChainningHashTable()
  }

  size() {
    return this.doublyLinkList.size()
  }

  access(item) {
    if (this.hashTable.contains(item)) {
      const itemNodeInList = this.hashTable.get(item)

      this.doublyLinkList.removeItemWithNode(itemNodeInList)
    }

    const newListNode = this.doublyLinkList.insertAtTheBeginningAndReturnNode(
      item
    )
    this.hashTable.put(item, newListNode)
  }

  remove() {
    const leastRecentlyAccessedItem = this.doublyLinkList.removeFromTheEnd()

    if (leastRecentlyAccessedItem) {
      this.hashTable.delete(leastRecentlyAccessedItem)
    }

    return leastRecentlyAccessedItem
  }
}

const lruCache = new LRUCache()

lruCache.access(1)
lruCache.access(2)
lruCache.access(3)
lruCache.access(2)
lruCache.remove()
console.log(lruCache.doublyLinkList.values())
