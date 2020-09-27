class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

class BST {
  size() {
    this._size(this.root)
  }
  _size(x) {
    if (x == null) return 0
    else return x.N
  }

  get(key) {
    this._get(this.root, key)
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
    if (x.left === null) return x

    return this._min(x.left)
  }

  floor(key) {
    const x = this._floor(this.root, key)
    if (x == null) return null

    return x.key
  }

  _floor(x, key) {
    if (x === null) return null
    const cmp = key.compareTo(x.key)

    if (cmp === 0) return x
    if (cmp < 0) return this._floor(x.left, key)

    const t = this._floor(x.right, key)
    if (t != null) return t
    else return x
  }

  select(k) {
    return this._select(this.root, k).key
  }

  _select(x, k) {
    if (x == null) return null
    const t = this._size(x.left)
    if (t < k) return this._select(x.right, k - t - 1)
    else if (t > k) return this._select(x.left, k)
    else return x
  }

  deleteMin() {
    this.root = this._deleteMin(this.root)
  }

  _deleteMin(x) {
    debugger
    if (x.left == null) return x.right

    x.left = this._deleteMin(x.left)
    x.N = this._size(x.left) + this._size(x.right) + 1

    console.log(x)

    return x
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

bst.put(new Key('d'), 4)
bst.put(new Key('c'), 3)
bst.put(new Key('b'), 2)
bst.put(new Key('a'), 1)

bst.deleteMin()

// console.log(JSON.stringify(bst, ' ', 2))
