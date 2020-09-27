class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

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

  toJSON() {
    return this.key
  }
}

class BST {
  get(key) {
    return this._get(this.root, new Key(key))
  }

  _get(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

    if (cmp < 0) return this._get(x.left, key)
    else if (cmp > 0) return this._get(x.right, key)
    else return x
  }

  prev(key) {
    const node = this.get(key)

    if (!node || !node.prev) return

    return node.prev.key
  }

  deleteNode(x) {
    if (x.prev) x.prev.next = x.next
    if (x.next) x.next.prev = x.prev
  }

  insertRight(parent, newNode) {
    parent.right = newNode
    this.insertBetween(parent, newNode, parent.next)
  }

  insertLeft(parent, newNode) {
    parent.left = newNode
    this.insertBetween(parent.prev, newNode, parent)
  }

  insertBetween(prev, newNode, next) {
    newNode.prev = prev
    newNode.next = next

    if (prev) prev.next = newNode
    if (next) next.prev = node
  }

  put(key, val) {
    this.root = this._put(this.root, new Key(key), val)
  }

  _put(x, key, val) {
    if (x == null) return new Node(key, val, 1)

    const cmp = key.compareTo(x.key)

    if (cmp < 0) {
      if (x.left == null) {
        const newNode = new Node(key, val, 1)
        this.insertLeft(x, newNode)
      } else {
        x.left = this._put(x.left, key, val)
      }
    } else if (cmp > 0) {
      if (x.right == null) {
        const newNode = new Node(key, val, 1)
        this.insertRight(x, newNode)
      } else {
        x.right = this._put(x, key, val)
      }
    } else {
      x.val = val
    }

    x.N = 1 + this._size(x.left) + this._size(x.right)
    return x
  }

  _delete(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

    if (cmp < 0) x.left = this._delete(x.left, key)
    else if (cmp > 0) x.right = this._delete(x.right, key)
    else {
      this.deleteNode(x)
      if (x.right == null) return x.left
      if (x.left == null) return x.right

      const t = x
      x = this._min(t.right)
      x.right = this._deleteMin(t.right)
      x.left = t.left
    }

    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }

  deleteMin() {
    this.root = this._deleteMin(this.root)
  }

  _deleteMin(x) {
    if (x.left == null) {
      this.deleteNode(x)
      return x.right
    }
    x.left = this._deleteMin(x.left)
    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
  }

  keys() {
    const queue = []

    this._keys(this.root, queue, this.min(), this.max())

    return queue
  }

  _keys(x, queue, lo, hi) {
    const stack = []

    while (x || stack.length) {
      if (x) {
        const cmpLo = lo.compareTo(x.key)
        const cmpHi = hi.compareTo(x.key)
        if (cmpHi >= 0) stack.push(x)
        if (cmpLo < 0) x = x.left
        else x = null
      } else {
        x = stack.pop()
        const cmpLo = lo.compareTo(x.key)
        const cmpHi = hi.compareTo(x.key)
        if (cmpLo <= 0 && cmpHi >= 0) queue.push(x.key)
        x = x.right
      }
    }
  }

  printLevel() {
    this._printLevel(x)
  }
  _printLevel(x) {
    const queue = [x]

    while (queue.length) {
      const node = queue.shift()
      if (node.left != null) queue.push(node.left)
      if (node.right) queue.push(node.right)

      console.log(node.key, ', ')
    }
  }
}
