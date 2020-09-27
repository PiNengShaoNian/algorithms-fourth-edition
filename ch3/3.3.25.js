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

class RedBlackTopDown234BST {
  size() {
    return this._size(this.root)
  }

  _size(node) {
    if (node == null) return 0

    return node.size
  }

  isRed(node) {
    if (node == null) return false

    return node.color === RED
  }

  put(key, value) {
    if (key == null) return

    if (value == null) {
      //   this.delete(key)
      return
    }

    this.root = this._put(this.root, new Key(key), value)
    this.root.color = BLACK
  }

  flipColors(node) {
    if (node == null || node.left == null || node.right == null) return

    if (
      (this.isRed(node) && !this.isRed(node.left) && !this.isRed(node.right)) ||
      (!this.isRed(node) && this.isRed(node.left) && this.isRed(node.right))
    ) {
      node.color = !node.color
      node.left.color = !node.left.color
      node.right.color = !node.right.color
    }
  }

  rotateLeft(node) {
    if (node == null || node.right == null) return node

    const newRoot = node.right
    node.right = newRoot.left
    newRoot.left = node

    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size

    node.size = this._size(node.left) + this._size(node.right) + 1

    return newRoot
  }

  rotateRight(node) {
    if (node == null || node.left == null) return node

    const newRoot = node.left
    node.left = newRoot.right
    newRoot.right = node

    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + this._size(node.right) + 1

    return newRoot
  }

  _put(node, key, value) {
    if (node == null) return new Node(key, value, 1, RED)

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
    if (key == null) return null

    return this._get(this.root, key)
  }

  _get(node, key) {
    if (node == null) return null

    const compare = key.compareTo(node.key)
    if (compare < 0) {
      return this._get(node.left, key)
    } else if (compare > 0) return this._get(node.right, key)
    else return node.value
  }

  contains(key) {
    if (key == null) {
      throw new Error('Argument to contains() cannot be null')
    }

    return this.get(key) != null
  }

  min() {
    if (this.root == null) {
      throw new Error('Empty binary search tree')
    }

    return this._min(this.root).key
  }

  _min(node) {
    if (node.left == null) return node

    return this._min(node.left)
  }

  max() {
    if (this.root == null) {
      throw new Error('Empty binary search tree')
    }
  }

  _max(node) {
    if (node.right == null) return node

    return this._max(node.right)
  }

  floor(key) {
    const node = this._floor(this.root, new Key(key))

    if (node == null) return null

    return node.key
  }

  _floor(node, key) {
    if (node == null) return null

    const compare = key.compareTo(node.key)

    if (compare == 0) return node
    else if (compare < 0) return this._floor(node.left, key)
    else {
      const rightNode = this._floor(node.right, key)
      if (rightNode != null) {
        return rightNode
      } else return node
    }
  }

  ceiling(key) {
    debugger
    const node = this._ceiling(this.root, new Key(key))

    if (node == null) return null

    return node.key
  }

  _ceiling(node, key) {
    if (node == null) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) return node
    else if (compare > 0) return this._ceiling(node.right, key)
    else {
      const leftNode = this._ceiling(node.left, key)
      if (leftNode != null) {
        return leftNode
      } else return node
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
    else if (leftSubtreeSize < index)
      return this._select(node.right, index - leftSubtreeSize - 1)
    else {
      return this._select(node.left, index)
    }
  }

  rank(key) {
    return this._rank(this.root, key)
  }

  _rank(node, key) {
    if (node == null) return 0

    const compare = key.compareTo(node.key)
    if (compare < 0) {
      return this._rank(node.left, key)
    } else if (compare > 0) {
      return this._size(node.left) + 1 + this.rank(node.right, key)
    } else return this._size(node.left)
  }

  isEmpty() {
    return this.size() === 0
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

    if (node.right != null && this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right)
      node = this.rotateLeft(node)
      this.flipColors(node)
    }

    return node
  }

  _deleteMin(node) {
    if (node.left == null) return null

    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = moveRedLeft(node)
    }

    node.left = this._deleteMin(node.left)

    return this.balance(node)
  }

  balance(node) {
    if (node == null) return null

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
}

const bst = new RedBlackTopDown234BST()

bst.put('a', 1)
bst.put('b', 1)
bst.put('c', 1)
bst.put('e', 1)
console.log(bst.floor('d'))
console.log(bst.ceiling('d'))
