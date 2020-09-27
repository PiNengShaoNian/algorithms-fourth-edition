class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

class BST {
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

  _size(x) {
    if (x == null) return 0

    return x.N
  }

  put(key, val) {
    this.root = this._put(this.root, key, val)
  }

  _put(x, key, val) {
    if (x == null) return new Node(key, val, 1)

    const cmp = key.compareTo(x.key)

    if (cmp < 0) x.left = this._put(x.left, key, val)
    else if (cmp > 0) x.right = this._put(x.right, key, val)
    else x.val = val

    x.N = this._size(x.left) + this._size(x.right)

    return x
  }

  min() {
    return this._min(this.root).key
  }

  _min(x) {
    if (x.left == null) return x.key

    return this.min(x.left)
  }

  floor(key) {
    const x = this._floor(this.root, key)
    if (x == null) return null
    return x.key
  }

  _floor(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

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
    const t = this._size(x.left)

    if (t > k) return this._select(x.left, k)
    else if (t < k) return this._select(x.right, k - t - 1)
    else return x
  }

  _floor(x, key) {
    if (x == null) return null

    const cmp = key.compareTo(x.key)

    if (cmp === 0) return key
    else if (cmp < 0) return this._floor(x.left, key)

    const t = this._floor(x.right, key)
    if (t == null) return x
    else return t
  }

  rank(k) {
    return this._rank(this.root, k)
  }

  _rank(key, x) {
    if (x == null) return 0

    const cmp = key.compareTo(x.key)
    if (cmp < 0) return this._rank(key, x.left)
    else if (cmp > 0) return 1 + this._size(x.left) + this._rank(key, x.right)
    else return this._size(x.left)
  }
  deleteMin() {
    this.root = this._deleteMin(this.root)
  }
  _deleteMin(x) {
    if (x.left == null) return x.right

    x.left = this._deleteMin(x.left)
    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }

  delete(key) {
    this.root = this._deleteMin(this.root, new Key(key))
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
