const { rootCertificates } = require('tls')

class Node {
  constructor(key, value, size, color) {
    this.key = key
    this.value = value
    this.size = size
    this.color = color
  }
}

const RED = true
const BLACK = false

class TreeWithoutBalance {
  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (x == null) return 0

    return x.size
  }

  put(key, value) {
    if (key == null) return

    if (value == null) {
      this.delete(key)
      return
    }

    this.root = this._put(this.root, key, value, this.root)
    this.root.color = BLACK
  }

  isRed(node) {
    if (node == null) {
      return false
    }

    return node.color === RED
  }

  _put(node, key, val, parent) {
    if (node == null) {
      const isTwoThreeNode = true

      if (parent != null && !this.isRed(parent)) {
        const isLeftChild = key.compareTo(parent.key)

        if (isLeftChild) {
          if (!this.isRed(parent.right)) {
            isTwoThreeNode = false
          }
        } else {
          if (!this.isRed(parent.left)) {
            isTwoThreeNode = false
          }
        }
      }

      return new Node(key, val, 1, !isTwoThreeNode)
    }

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      node.left = this._put(node.left, key, val, node)
    } else if (compare > 0) {
      node.right = this._put(node.right, key, val, node)
    } else {
      node.value = val
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

  isEmpty() {
    return this._size(this.root) === 0
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
    if (node.left == null) return node.right

    if(!this.isRed(node.left) && !this.isRed(node.left.left)) {
        node = moveRedLeft(node)
    }
  }
}
