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

  height() {
    return this._height(this.root, 0)
  }

  _height(x, k) {
    if (x == null) return k

    if (x.left && !x.right) return this._height(x.left, k + 1)
    else if (!x.left && x.right) return this._height(x.right, k + 1)
    else if (x.right && x.left)
      return Math.max(this._height(x.left, k + 1), this._height(x.right, k + 1))
    else return k
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
bst.put(new Key('c'), 1)
bst.put(new Key('a'), 1)
bst.put(new Key('b'), 1)
bst.put(new Key('d'), 1)
bst.put(new Key('e'), 1)

console.log(bst.height())
