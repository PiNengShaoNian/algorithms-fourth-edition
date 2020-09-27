class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

class BST {
  root

  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (x == null) return 0

    return x.N
  }

  get(key) {
    return this._get(this.root, key)
  }

  _get(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

    if (cmp < 0) return this._get(x.left, key)
    else if (cmp > 0) return this._get(x.right, key)
    else return x.val
  }

  put(key, val) {
    this.root = this._put(this.root, key, val)
  }

  _put(x, key, val) {
    debugger
    if (x == null) return new Node(new Key(key), val, 1)

    const cmp = new Key(key).compareTo(x.key)

    if (cmp < 0) x.left = this._put(x.left, key, val)
    else if (cmp > 0) x.right = this._put(x.right, key, val)
    else x.val = val

    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }

  min() {
    return this._min(this.root).key
  }

  _min(x) {
    if (x.left == null) return x.key

    return this._min(x.left)
  }

  max() {
    return this._max(this.root).key
  }

  _max(x) {
    if (x.right == null) return x.key

    return this._max(x.right)
  }

  floor(key) {
    const x = this._floor(this.root, key)
    if (x == null) return null
    return x.key
  }

  _floor(x, key) {
    if (x == null) return null
    const cmp = key.compareTo(key)

    if (cmp === 0) return key
    if (cmp < 0) return this._floor(x.left, key)

    const t = this._floor(x.right, key)
    if (t != null) return t
    else return x
  }

  select(k) {
    return this._select(this.root, k)
  }

  _select(x, k) {
    if (x == null) return null
    const t = this.size(x.left)

    if (t > k) return this._select(x.left, k)
    else if (t < k) return this._select(x.right, k - t - 1)
    else return x
  }

  rank(k) {
    return this._rank(this.root, k)
  }
  _rank(key, x) {
    if (x == null) return 0
    const cmp = key.compareTo(x.key)
    if (cmp < 0) return this.rank(key, x.left)
    else if (cmp > 0) return 1 + this._size(x.left) + this._rank(key, x.right)
    else return this.size(x.left)
  }

  deleteMin() {
    this._deleteMin(this.root)
  }

  _deleteMin(x) {
    if (x.left == null) return x.right

    x.left = this._deleteMin(x.left)
    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }

  delete(key) {
    this._delete(this.root, new Key(key))
  }

  _delete(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

    if (cmp < 0) x.left = this._delete(x.left, key)
    else if (cmp > 0) x.right = this._delete(x.right, key)
    else {
      if (x.right == null) return x.left
      if (x.left == null) return x.right
      const t = x
      x = this._min(x.right)
      x.right = this._deleteMin(t.right)
      x.left = t.left
    }

    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
  }

  *print(x) {
    print(x.left)
    yield x.key
    print(x.right)
  }

  keys() {
    return this._keys(this.min(), this.max())
  }

  _keys(lo, hi) {
    const queue = []
    return this.__keys(this.root, queue, lo, hi)
  }

  __keys(x, queue, lo, hi) {
    if (x == null) return
    const cmpLo = lo.compareTo(x.key)
    const cmpHi = hi.compareTo(x.key)

    if (cmpLo < 0) this.__keys(x.left, queue, lo, hi)
    if (cmpLo <= 0 && cmpHi >= 0) queue.push(x.key)
    if (cmpHi > 0) this.__keys(x.right, queue, lo, hi)
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

const bst = new BST()
bst.put('b', 1)
bst.put('a', 1)
bst.put('c', 1)

// console.log(bst)
// console.log(bst.min())
// bst.deleteMin()
// console.log(bst)
// bst.delete('c')

// for(let x of bst)
