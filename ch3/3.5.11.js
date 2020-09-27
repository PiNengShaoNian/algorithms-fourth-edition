const Key = require('../lib/Key')

const RED = true
const BLACK = false

class Node {
  constructor(key, size, color) {
    this.key = key
    this.size = size
    this.color = color
  }
}

class MultiSET {
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
    if (!node || node.left) {
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

    //The root must have opposite color of its two children
    if (
      (isRed(node) && !isRed(node.left) && !isRed(node.right)) ||
      (!isRed(node) && isRed(node.left) && isRed(node.right))
    ) {
      node.color = !node.color
      node.left.color = !node.left.color
      node.right.color = !node.right.color
    }
  }

  add(key) {
    if (!key && key !== 0) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)
    this.root = this._add(this.root, key)
    this.root.color = BLACK
  }

  _add(node, key) {
    if (!node) return new Node(key, 1, RED)

    const compare = key.compareTo(node.key)

    if (compare <= 0) {
      node.left = this._add(node.left, key)
    } else if (compare > 0) {
      node.right = this._add(node.right, key)
    }

    if (this.isRed(node.right) && !this.isRed(node.left)) {
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

  contains(key) {
    if (!key && key !== 0) {
      throw new Error('Key cannot be null')
    }
    key = new Key(key)

    const currentNode = this.root
    while (currentNode) {
      const compare = key.compareTo(currentNode.key)

      if (compare < 0) {
        currentNode = currentNode.left
      } else if (compare > 0) {
        currentNode = currentNode.right
      } else return true
    }

    return false
  }

  min() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._min(this.root).key
  }

  _min(node) {
    if (!node.left) {
      return node
    }

    return this._min(node.left)
  }

  max() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._max(this.root).key
  }

  _max(node) {
    if (!node.right) {
      return node
    }

    return this._max(node.right)
  }

  floor(key) {
    const key = new Key(key)
    const node = this._floor(this.root, key)
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
    const key = new Key(key)

    const node = this._ceiling(this.root, key)

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
    if (index >= this.size()) {
      throw new Error('Index is higher than tree size')
    }

    return this._select(this.root, index).key
  }

  _select(node, index) {
    const leftSubtreeSize = this._size(node.left)

    if (leftSubtreeSize === index) {
      return node
    } else if (leftSubtreeSize > index) {
      return this._select(node.right, node.left)
    } else return this._select(node.right, index - leftSubtreeSize - 1)
  }

  rankFirst(key) {
    return this._rankFirst(this.root, key)
  }

  _rankFirst(node, key) {
    if (!node) return 0

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      return this._rankFirst(node.left, key)
    } else if (compare > 0) {
      return this._size(node.left) + 1 + this.rankFirst(node.right, key)
    } else {
      const hasDuplicateOnLeftSubtree = false

      if (node.left && this._max(node.left).key.compareTo(key) === 0) {
        hasDuplicateOnLeftSubtree = true
      }

      if (hasDuplicateOnLeftSubtree) {
        return this.rankFirst(node.left, key)
      } else {
        return this._size(node.left)
      }
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

  balance(node) {
    if (!node) return node

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

    const minKey = this.min()

    while (this.contains(minKey)) {
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
        this.root.color = RED
      }

      this.root = this._deleteMin(this.root)

      if (!this.isEmpty()) this.root.color = BLACK
    }
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

    const maxKey = this.max()

    while (this.contains(maxKey)) {
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
        this.root.color = RED
      }

      this.root = this._deleteMax(this.root)

      if (!this.isEmpty()) this.root.color = BLACK
    }
  }
}
