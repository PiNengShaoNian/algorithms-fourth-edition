const Key = require('./Key')

const RED = true
const BLACK = false

class Node {
  constructor(key, value, size, color) {
    this.key = key
    this.value = value
    this.size = size
    this.color = color
  }
}

class RedBlackTopDown234Trees {
  _size(node) {
    if (!node) return 0

    return node.size
  }

  size() {
    return this._size(this.root)
  }

  isEmpty() {
    return this.size() === 0
  }

  contains(key) {
    if (!key && key !== 0) {
      throw new Error('Argument to contains() cannot be null')
    }

    key = new Key(key)

    return this.get(key) !== null
  }

  isRed(node) {
    if (!node) return false

    return node.color === RED
  }

  rotateLeft(node) {
    if (!node || !node.right) return node

    const newRoot = node.right
    node.right = newRoot.left
    newRoot.left = node

    newRoot.color = node.color
    node.color = RED
    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  rotateRight(node) {
    if (!node || !node.left) return node

    const newRoot = node.left
    node.left = newRoot.right
    newRoot.right = node

    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  flipColors(node) {
    if (!node || !node.left || !node.right) {
      return
    }

    if (
      (this.isRed(node) && !this.isRed(node.left) && !this.isRed(node.right)) ||
      (!this.isRed(node) && this.isRed(node.left) && this.isRed(node.right))
    ) {
      node.color = !node.color
      node.left.color = !node.left.color
      node.right.color = !node.right.color
    }
  }

  put(key, value) {
    if (!key && key !== 0) return

    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    this.root = this._put(this.root, key, value)

    this.root.color = BLACK
  }

  _put(node, key, value) {
    if (!node) return new Node(key, value, 1, RED)

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      node.left = this._put(node.left, key, value)
    } else if (compare > 0) {
      node.right = this._put(node.right, key, value)
    } else {
      node.value = value
    }

    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)

    return node
  }

  get(key) {
    if (!key) return null

    return this._get(this.root, key)
  }

  _get(node, key) {
    if (!node) return null

    key = new Key(key)

    const compare = key.compareTo(node.key)

    if (compare < 0) return this._get(node.left, key)
    else if (compare > 0) return this._get(node.right, key)
    else return node.value
  }

  min() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._min(this.root).key
  }

  _min(node) {
    if (!node.left) return node

    return this._min(node.left)
  }

  max() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._max(this.root).key
  }

  _max(node) {
    if (!node.right) return node

    return this._max(node.right)
  }

  floor(key) {
    key = new Key(key)

    const node = this._floor(this.root, key)
    if (!node) return null

    return node.key
  }

  _floor(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) return node
    else if (compare < 0) return this._floor(node.left, key)
    else {
      const rightNode = this._floor(node.right, key)

      if (rightNode) return rightNode
      else return node
    }
  }

  ceiling(key) {
    key = new Key(key)

    const node = this._ceiling(this.root, key)
    if (!node) return null

    return node.key
  }

  _ceiling(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) return node
    else if (compare > 0) return this._ceiling(node.right, key)
    else {
      const leftNode = this._ceiling(node.left, key)

      if (leftNode) return leftNode
      else return node
    }
  }

  select(index) {
    if (index > this.size()) {
      throw new Error('Index is higher than tree size')
    }

    return this._select(this.root, index).key
  }

  _select(node, index) {
    const leftSubtreeSize = this._size(node.left)

    if (leftSubtreeSize === index) return node
    else if (leftSubtreeSize > index) return this._select(node.left, index)
    else return this._select(node.right, index - leftSubtreeSize - 1)
  }

  rank(key) {
    key = new Key(key)

    return this._rank(this.root, key)
  }

  _rank(node, key) {
    if (!node) return 0

    const compare = key.compareTo(node.key)
    if (compare < 0) {
      return this._rank(node.left, key)
    } else if (compare > 0) {
      return this._size(node.left) + 1 + this.rank(node.right, key)
    } else return this._size(node.left)
  }

  moveRedLeft(node) {
    this.flipColors(node)

    if (node.right && this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right)
      node = this.rotateLeft(node)
      this.flipColors(node)
    }

    return node
  }

  moveRedRight(node) {
    this.flipColors(node)

    if (node.left && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
      this.flipColors(node)
    }

    return node
  }

  balance(node) {
    if (!node) return null

    if (this.isRed(node.right)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)

    return node
  }

  deleteMin() {
    if (this.isEmpty()) return

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._deleteMin(this.root)

    if (!this.isEmpty()) this.root.color = BLACK
  }

  _deleteMin(node) {
    if (!node.left) return null

    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = this.moveRedLeft(node)
    }

    node.left = this._deleteMin(node.left)
    return this.balance(node)
  }

  deleteMax() {
    if (this.isEmpty()) return

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._deleteMax(this.root)

    if (!this.isEmpty()) this.root.color = BLACK
  }

  _deleteMax(node) {
    if (this.isRed(node.left) && !this.isRed(node.right)) {
      node = this.rotateRight(node)
    }

    if (!node.right) return null

    if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
      node = this.moveRedRight(node)
    }

    node.right = this._deleteMax(node.right)
    return this.balance(node)
  }

  keys() {
    return this._keys(this.min(), this.max())
  }

  _keys(low, high) {
    if (!low) {
      throw new Error('First argument to keys() cannot be null')
    }

    if (!high) {
      throw new Error('Second argument to keys() cannot be null')
    }

    low = new Key(low)
    high = new Key(high)

    const queue = []
    this.__keys(this.root, queue, low, high)

    return queue
  }

  __keys(node, queue, low, high) {
    if (!node) return

    const compareLow = low.compareTo(node.key)
    const compareHigh = high.compareTo(node.key)

    if (compareLow < 0) {
      this.__keys(node.left, queue, low, high)
    }

    if (compareLow <= 0 && compareHigh >= 0) queue.push(node.key)

    if (compareHigh > 0) {
      this.__keys(node.right, queue, low, high)
    }
  }

  delete(key) {
    if (this.isEmpty()) return

    key = new Key(key)
    if (!this.contains(key)) return

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._delete(this.root, key)

    if (!this.isEmpty()) {
      this.root.color = BLACK
    }
  }

  _delete(node, key) {
    if (!node) return null

    if (key.compareTo(node.key) < 0) {
      if (!this.isRed(node.left) && node.left && !this.isRed(node.left.left)) {
        node = this.moveRedLeft(node)
      }

      node.left = this._delete(node.left, key)
    } else {
      if (this.isRed(node.left) && !this.isRed(node.right)) {
        node = this.rotateRight(node)
      }

      if (key.compareTo(node.key) === 0 && !node.right) {
        return null
      }

      if (
        !this.isRed(node.right) &&
        node.right &&
        !this.isRed(node.right.left)
      ) {
        node = this.moveRedRight(node)
      }

      if (key.compareTo(node.key) === 0) {
        const aux = this._min(node.right)
        node.key = aux.key
        node.value = aux.value
        node.right = this._deleteMin(node.right)
      } else {
        node.right = this._delete(node.right, key)
      }
    }

    return this.balance(node)
  }
}

module.exports = RedBlackTopDown234Trees

// const tree = new RedBlackTopDown234Trees()

// tree.put('a', 1)
// tree.put('b', 2)
// tree.put('c', 3)
// tree.put('f', 5)
// console.log(tree)
// console.log(tree.get('c'))
// console.log(tree.ceiling('e'))
// console.log(tree.floor('e'))
// console.log(tree.select(3))
// console.log(tree.select(0))

// console.log(tree.rank('a'))
// tree.deleteMin()
// tree.deleteMin()
// tree.deleteMin()
// tree.deleteMin()
// console.log(tree)
// console.log(tree.keys())

// tree.deleteMax()
// tree.deleteMax()
// tree.deleteMax()
// tree.deleteMax()
// console.log(tree)

// tree.delete('a')
// tree.delete('b')
// tree.delete('c')
// tree.delete('f')
// console.log(tree)
