const RedBlackTopDown234Trees = require('../lib/BlackRedTree')
const SeparateChainningHashTable = require('../lib/SeparateChainingHashTable')

class List {
  INITIAL_VALUE = 50000
  OFFSET = 0.0001
  constructor() {
    this.itemsBST = new RedBlackTopDown234Trees()
    this.itemsPositions = new SeparateChainningHashTable()
  }

  contains(item) {
    return this.itemsPositions.contains(item)
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.itemsPositions.size()
  }

  addFront(item) {
    if (!item && item !== 0) {
      throw new Error('Item cannot be null')
    }

    if (this.contains(item)) {
      this.delete(item)
    }

    let minKey

    if (this.isEmpty()) {
      minKey = this.INITIAL_VALUE
    } else {
      minKey = this.itemsBST.min()
    }

    const newMinKey = minKey - this.OFFSET
    this.itemsBST.put(newMinKey, item)
    this.itemsPositions.put(item, newMinKey)
  }

  addBack(item) {
    if (!item && item !== 0) {
      throw new Error('Item cannot be null')
    }

    if (this.contains(item)) this.delete(item)

    let maxKey

    if (this.isEmpty()) {
      maxKey = this.INITIAL_VALUE
    } else {
      maxKey = this.itemsBST.max()
    }

    const newMaxKey = maxKey + this.OFFSET

    this.itemsBST.put(newMaxKey, item)
    this.itemsPositions.put(item, newMaxKey)
  }

  deleteFront() {
    if (this.isEmpty()) return null

    const firstItem = this.itemsBST.get(this.itemsBST.min())

    this.itemsBST.deleteMin()
    this.itemsPositions.delete(firstItem)

    return firstItem
  }

  deleteBack() {
    if (this.isEmpty()) return null

    const lastItem = this.itemsBST.get(this.itemsBST.max())

    this.itemsBST.deleteMax()
    this.itemsPositions.delete(lastItem)

    return lastItem
  }

  delete(item) {
    if (!item && item !== 0) {
      throw new Error('Item cannot be null')
    }

    if (!this.contains(item)) return

    const itemPosition = this.itemsPositions.get(item)

    this.itemsBST.delete(itemPosition)
    this.itemsPositions.delete(item)
  }

  add(index, item) {
    if (!item && item !== 0) {
      throw new Error('Item cannot be null')
    }

    if (
      index < 0 ||
      index > this.size() ||
      (index == this.size() && this.contains(item))
    ) {
      throw new Error('Invalid index')
    }

    if (this.contains(item)) {
      this.delete(item)
    }

    const previousItemIndex = 0
    const nextItemIndex = this.size() - 1

    if (index > 0) {
      previousItemIndex = this.itemsBST.select(index - 1)
    } else if (index === 0) {
      previousItemIndex = this.itemsBST.min() - this.OFFSET
    }

    if (index < this.size()) {
      nextItemIndex = this.itemsBST.select(index)
    } else if (index === this.size()) {
      nextItemIndex = this.itemsBST.max() + this.OFFSET
    }

    const medianKey = (previousItemIndex + nextItemIndex) / 2
    this.itemsBST.put(medianKey, item)
    this.itemsPositions.put(item, medianKey)
  }
}
