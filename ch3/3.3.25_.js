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

class TopDown234Trees {
  size() {
    return this._size(this.root)
  }

  _size(node) {
    if (node == null) return 0

    return node.size
  }

  isEmpty() {
    return this._size(this.root) === 0
  }

  isRed(node) {
    if (node == null) return false

    return node.color === RED
  }

  rotateLeft(node) {
    if (node == null || node.right == null) return node

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
    if (node == null || node.left == null) return node

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

  put(key, val) {
    if (!key) return

    // if(value ==)

    this.root = this._put(this.root, new Key(key), val)

    this.root.color = BLACK
  }

  _put(node, key, val) {
    if (node == null) return new Node(key, val, 1, RED)

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
    debugger

    return this._get(this.root, new Key(key))
  }

  _get(node, key) {
    if (!node) {
      return null
    }

    const compare = key.compareTo(node.key)
    if (compare < 0) return this._get(node.left, key)
    else if (compare > 0) return this._get(node.right, key)
    else return node.value
  }

  contains(key) {
    if (!key) throw new Error('Argument to contains() cannot be null')

    return this.get(key) != null
  }

  min() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._min(this.root)
  }

  _min(node) {
    if (!node.right) return node

    return this._min(node.right)
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
      if (rightNode) {
        return rightNode
      } else return node
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

    if (compare === 0) return node
    else if (compare > 0) return this._floor(node.right, key)
    else {
      const leftNode = this._ceiling(node.left, key)

      if (leftNode) return leftNode
      return node
    }
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

    if (!this.isEmpty()) {
      this.root.color = BLACK
    }
  }

  _deleteMax(node) {
    if (this.isRed(node.left) && !this.isRed(node.right)) {
      node = this.rotateRight(node)
    }

    if (!node.right) return null

    if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
      node = moveRedRight(node)
    }

    node.right = this._deleteMax(node.right)

    return this.balance(node)
  }

  moveRedRight(node) {
    this.flipColors(node)

    if (node.left && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
      this.flipColors(node)
    }

    return node
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
    if (!node) return

    if (this.isRed(node.right)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node)

    node.size = this._size(node.left) + 1 + this._size(node.right)

    return node
  }

  delete(key) {
    if (this.isEmpty()) return

    if (!this.contains(key)) return

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._delete(this.root, new Key(key))

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

      if (key.compareTo(node.key) === 0 && !node.right) return null

      if (
        !this.isRed(node.right) &&
        node.right &&
        !this.isRed(node.right.left)
      ) {
        node = this.moveRedRight(node)
      }

      if (key.compareTo(node.key) === 0) {
        const aux = this.min(node.right)
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

const brBST = new TopDown234Trees()

brBST.put('a', 1)
brBST.put('b', 2)
brBST.put('c', 3)

// brBST.deleteMin()
debugger
brBST.delete('b')
brBST.delete('c')

console.log(brBST)
