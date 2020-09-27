const RED = true
const BLACK = false

class Key {
  constructor(key) {
    this.key = key
  }

  compareTo(that) {
    const min = Math.min(that.key.length, this.key.length)

    for (let i = 0; i < min; i++) {
      if (this.key[i] < that.key[i]) return -1
      else if (this.key[i] > that.key[i]) return 1
    }

    return this.key.length - that.key.length
  }

  toString() {
    return this.key
  }
}

class Node {
  constructor(key, value, size, color) {
    this.key = key
    this.value = value
    this.size = size
    this.color = color
  }
}

class RedBlackTopDown234Trees {
  size() {
    return this._size(this.root)
  }

  _size(node) {
    if (!node) return 0

    return node.size
  }

  isEmpty() {
    return this._size(this.root) === 0
  }

  isRed(node) {
    if (!node) return false

    return node.color === RED
  }

  rotateLeft(node) {
    if (!node || !node.right) {
      return node
    }

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
    if (!node || !node.left) {
      return node
    }

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

  put(key, val) {
    if (!key) return

    if (val === null) {
    }

    this.root = this._put(this.root, new Key(key), val)

    this.root.color = BLACK
  }

  _put(node, key, val) {
    if (!node) return new Node(key, val, 1, RED)

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      node.left = this._put(node.left, key, val)
    } else if (compare > 0) {
      node.right = this._put(node.right, key, val)
    } else {
      node.value = val
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

    return this._get(this.root, new Key(key))
  }

  _get(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      return this._get(node.left, key)
    } else if (compare > 0) {
      return this._get(node.right, key)
    } else return node.value
  }

  contains(key) {
    if (!key) throw new Error('Argument to contains() cannot be null')

    return this.get(key) != null
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
    if (!this.root) throw new Error('Empty binary search tree')

    return this._max(this.root).key
  }

  _max(node) {
    if (!node.right) return node

    return this._max(node.right)
  }

  floor(key) {
    const node = this._floor(this.root, new Key(key))

    if (!node) return null

    return node.key
  }

  _floor(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) {
      return node
    } else if (compare < 0) {
      return this._floor(node.left, key)
    } else {
      const rightNode = this._floor(node.right, key)

      if (rightNode) return rightNode
      else return node
    }
  }

  ceiling(key) {
    const node = this._ceiling(this.root, new Key(key))
    if (!node) return null
    return node.key
  }

  _ceiling(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) {
      return node
    } else if (compare > 0) {
      return this._ceiling(node.right, key)
    } else {
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

    if (leftSubtreeSize == index) {
      return node
    } else if (leftSubtreeSize > index) return this._select(node.left, index)
    else {
      return this._select(node.right, index - leftSubtreeSize - 1)
    }
  }

  rank(key) {
    return this._rank(this.root, new Key(key))
  }

  _rank(node, key) {
    if (!node) return 0

    const compare = key.compareTo(node.key)

    if (compare < 0) return this._rank(node.left, key)
    else if (compare > 0) {
      return this._size(node.left) + 1 + this._rank(node.right, key)
    } else return this._size(node.left)
  }

  deleteMin() {
    if (this.isEmpty()) return

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._deleteMin(this.root)

    if (!this.isEmpty()) {
      this.root.color = BLACK
    }
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

  _deleteMin(node) {
    if (!node.left) return null

    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = moveRedLeft(node)
    }

    node.left = this._deleteMin(node.left)

    return this.balance(node)
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

  keys(low, high) {
    if (!low) {
      throw new Error('First argument to keys() cannot be null')
    }
    if (!high) {
      throw new Error('Second argument to keys() cannot be null')
    }

    const queue = []
    debugger
    this._keys(this.root, queue, low, high)

    return queue
  }

  _keys(node, queue, low, high) {
    if (!node) return
    const compareLow = low.compareTo(node.key)
    const compareHigh = high.compareTo(node.key)

    if (compareLow < 0) {
      this._keys(node.left, queue, low, high)
    }

    if (compareLow <= 0 && compareHigh >= 0) {
      queue.push(node.key)
    }

    if (compareHigh > 0) {
      this._keys(node.right, queue, low, high)
    }
  }
}

const bst = new RedBlackTopDown234Trees()
bst.put('a', 1)
bst.put('b', 2)
bst.put('c', 3)
bst.put('f', 4)

// console.log(bst.floor('e'))
// console.log(bst.ceiling('e'))
console.log(bst)
console.log(bst.keys(bst.min(), bst.max()))
