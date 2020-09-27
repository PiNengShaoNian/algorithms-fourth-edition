const Key = require('../lib/Key')

class Node {
  constructor(key, value, size) {
    this.key = key
    this.value = value
    this.size = size
  }
}

class BinarySearchTreeDuplicateKeys {
  size() {
    this._size(this.root)
  }

  _size(node) {
    if (!node) return 0

    return node.size
  }

  isEmpty() {
    return this._size(this.root) === 0
  }

  get(key) {
    if (!key && key !== 0) {
      return null
    }

    key = new Key(key)
    return this._get(this.root, key)
  }

  _get(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare < 0) {
      return this._get(node.left)
    } else if (compare > 0) {
      return this._get(node.right)
    } else return node.value
  }

  contains(key) {
    if (!key && key !== 0) {
      return null
    }
    key = new Key(key)
    return this.get(key) !== null
  }

  put(key, value) {
    if (!key && key !== 0) {
      return
    }

    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    this.root = this.put(this.root, key, value)
  }

  _put(node, key, value) {
    if (!node) return new Node(key, value, 1)

    const compare = key.compareTo(node.key)

    if (compare <= 0) {
      node.left = this._put(node.left, key, value)
    } else if (compare > 0) {
      node.right = this._put(node.right, key, value)
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)
    return node
  }

  min() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._min(this.root)
  }

  _min(node) {
    if (!node.left) return node

    return this._min(node.left)
  }

  max() {
    if (!this.root) {
      throw new Error('Empty binary search tree')
    }

    return this._max(this.root)
  }

  _max(node) {
    if (!node.right) return node

    return this._max(node.right)
  }

  floor(key) {
    key = new Key(key)
    const node = this._floor(key)

    if (!node) {
      return null
    }

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
    key = new Key(key)

    const node = this._ceiling(this.root, key)
    if (!node) return null
    return node.key
  }

  _ceiling(node, key) {
    if (!node) return null

    const compare = key.compareTo(node.key)

    if (compare === 0) return node
    else if (compare > 0) {
      return this._ceiling(node.right, key)
    } else {
      const leftNode = this._ceiling(node.left, key)

      if (leftNode) return leftNode
      else return node
    }
  }

  deleteMin() {
    if (!this.root) return

    const minKey = this.min()

    while (this.contains(minKey)) {
      this.root = this._deleteMin(this.root)
    }
  }

  _deleteMin(node) {
    if (!node.left) return node.right

    node.left = this._deleteMin(node.left)
    node.size = this._size(node.left) + 1 + this._size(node.right)
    return node
  }

  delete(key) {
    if (this.isEmpty()) return

    while (this.contains(key)) {
      this.root = this._delete(this.root, key)
    }
  }

  _delete(node, key) {
    const compare = key.compareTo(node.key)

    if (compare < 0) {
      node.left = this._delete(node.left, key)
    } else if (compare > 0) {
      node.right = this._delete(node.right, key)
    } else {
      if (!node.left) return node.right
      else if (!node.right) return node.left
      else {
        const aux = node
        node = this.min(aux.right)
        node.right = this._deleteMin(aux.right)
        node.left = aux.left
      }
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)
    return node
  }
}
