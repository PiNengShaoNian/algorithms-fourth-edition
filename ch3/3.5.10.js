const BlackRedTree = require('../lib/BlackRedTree')
const Key = require('../lib/Key')

const RED = true
const BLACK = false

class RedBlackBSTDuplicateKeys extends BlackRedTree {
  deleteMin() {
    if (this.isEmpty()) return

    const minKey = this.min()

    while (this.contains(minKey)) {
      if (!this.isRed(this.root.left) && !this.isRed(node.right)) {
        this.root.color = RED
      }

      this.root = this._deleteMin(this.root)

      if (!this.isEmpty()) {
        this.root.color = BLACK
      }
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

  _deleteMax(node) {
    if (this.isRed(node.left)) {
      node = this.rotateRight(node)
    }

    if (!node.right) return null

    if (!this.isRed(node.right) && !this.isRed(node.right.left)) {
      node = this.moveRedRight(node)
    }

    node.right = this._deleteMax(node.right)
    return this.balance(node)
  }

  delete(key) {
    if (!key && key !== 0) {
      throw new Error('Key cannot be null')
    }
    key = new Key(key)
    if (this.isEmpty() || !this.contains(key)) return

    while (this.contains(key)) {
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
        this.root.color = RED
      }

      this.root = this._delete(this.root, key)

      if (!this.isEmpty()) this.root.color = BLACK
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
      if (this.isRed(node.left)) {
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
