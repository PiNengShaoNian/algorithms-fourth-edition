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
    key = new Key(key)
    if (this._catch != null && this._catch.key.compareTo(key) == 0)
      return this._catch.val

    return this._get(this.root, key)
  }

  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (!x) return 0
    return x.N
  }

  _get(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)
    if (cmp < 0) return this._get(x.left, key)
    else if (cmp > 0) return this._get(x.right, key)
    else {
      this._catch = x
      return x
    }
  }

  put(key, val) {
    key = new Key(key)
    if (this._catch && this._catch.key.compareTo(key) == 0) {
      this._catch.val = val
      return
    }

    this.root = this._put(this.root, key, val)
  }

  _put(x, key, val) {
    if (x == null) return (this._catch = new Node(key, val, 1))

    const cmp = key.compareTo(x.key)
    if (cmp < 0) x.left = this._put(x.left, key, val)
    else if (cmp > 0) x.right = this._put(x.right, key, val)
    else x.val = val

    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }

  isBinaryTree(x) {
    if (x == null) return true
    let size = 1
    if (x.left) {
      size += x.left.N
    }

    if (x.right) size += x.right.N

    return (
      this.isBinaryTree(x.left) && this.isBinaryTree(x.right) && x.N === size
    )
  }

  isOrdered(x, min, max) {
    if (x == null) return true

    return (
      this.isOrdered(x.left, min, max) &&
      this.isOrdered(x.right, min, max) &&
      x.key.compareTo(min) >= 0 &&
      x.key.compareTo(max) <= 0 &&
      (!x.left || x.left.key.compareTo(x.key) < 0) &&
      (!x.right || x.right.key.compareTo(x.key) > 0)
    )
  }

  hasNoDuplicates(x) {
    const queue = [x]
    const keys = {}

    while (queue.length) {
      const node = queue.shift()

      if (!node) continue

      if (keys[node.key]) return false

      keys[node.key] = 1
      queue.push(node.left)
      queue.push(node.right)
    }

    return true
  }

  min() {
    return this._min(this.root).key
  }

  _min(x) {
    if (!x.left) return x
    return this._min(x.left)
  }

  max() {
    return this._max(this.root).key
  }

  _max(x) {
    if (!x.right) return x

    return this._max(x.right)
  }

  isBST() {
    if (!this.isBinaryTree(this.root)) return false
    if (!this.isOrdered(this.root, this.min(), this.max())) return false
    if (!this.hasNoDuplicates(this.root)) return false

    return true
  }

  rank(key) {
    key = key.compareTo ? key : new Key(key)
    return this._rank(this.root, key)
  }

  _rank(x, key) {
    if (x == null) return 0
    const cmp = key.compareTo(x.key)

    if (cmp < 0) return this._rank(x.left, key)
    else if (cmp > 0) return this._rank(x.right, key) + this._size(x.left) + 1
    else return this._size(x.left)
  }

  select(k) {
    return this._select(this.root, new Key(k)).key
  }

  _select(x, k) {
    if (!x) return null

    const t = this._size(x.left)

    if (k > t) return this._select(x.right, k - t - 1)
    else if (k < t) return this._select(x.left, k)
    else return x
  }

  keys() {
    const queue = []
    this._keys(this.root, queue, this.min(), this.max())

    return queue
  }

  _keys(x, queue, lo, hi) {
    if (!x) return

    const loCmp = lo.compareTo(x.key)
    const hiCmp = hi.compareTo(x.key)

    if (loCmp < 0) this._keys(x.left, queue, lo, hi)
    if (loCmp <= 0 && hiCmp >= 0) queue.push(x.key)
    if (hiCmp > 0) this._keys(x.right, queue, lo, hi)
  }

  isRankConsistent() {
    const size = this.size()

    for (let i = 0; i < size; i++) {
      if (this.rank(this.select(i)) !== i) return false
    }

    for (let key of this.keys()) {
      if (this.select(this.rank(key)).compareTo(key) !== 0) return false
    }
    return true
  }
}

const bst = new BST()

bst.put('a', 1)
bst.put('b', 1)
bst.put('c', 1)
// console.log(bst.isOrdered(bst.root, new Key('b'), new Key('c')))
console.log(bst.isRankConsistent())
