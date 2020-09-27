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
    while (x) {
      const cmp = key.compareTo(x.key)

      if (cmp === 0) return x.val
      else if (cmp < 0) x = x.left
      else if (cmp > 0) x = x.right
    }

    return null
  }

  put(key, val) {
    this._put(this.root, new Key(key), val)
  }

  _put(x, key, val) {
    const stack = []

    while (x) {
      stack.push(x)

      const cmp = key.compareTo(x.key)

      if (cmp === 0) x.val = val
      else if (cmp < 0) x = x.left
      else if (cmp > 0) x = x.right
    }

    const parent = stack[stack.length - 1]
    const node = new Node(key, val, 1)
    if (!parent) return (this.root = node)
    const cmp = key.compareTo(parent.key)
    if (cmp < 0) parent.left = node
    else parent.right = node

    while (stack.length) stack.pop().N += 1
  }

  min() {
    while (true) {
      if (x.left == null) return x
      x = x.left
    }
  }

  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (x == null) return 0
    return x.N
  }

  floor(key) {
    return this._floor(this.root, new Key(key))
  }
  _floor(x, key) {
    let floor = null

    while (x) {
      const cmp = key.compareTo(x.key)
      if (cmp === 0) return x
      if (cmp < 0) x = x.left
      else {
        floor = x
        x = x.right
      }
    }

    return floor
  }

  rank(key) {
    return this._rank(this.root, new Key(key))
  }

  _rank(x, key) {
    let rank = 0

    while (x) {
      const cmp = key.compareTo(x.key)
      if (cmp < 0) x = x.left
      else if (cmp > 0) {
        rank += this._size(x.left) + 1
        x = x.right
      } else {
        rank += this._size(x.left)
        return rank
      }
    }

    return rank
  }

  select(k) {
    return this._select(this.root, k)
  }

  _select(x, k) {
    while (x) {
      const t = this._size(x.left)
      if (t > k) {
        x = x.left
      } else if (t < k) {
        x = x.right
        k = k - t - 1
      } else return x
    }

    return null
  }

  randomKey() {
    const size = this.size()
    const rank = Math.floor((size + 1) * Math.random())
    this._select(this.root, rank)
  }
}

const bst = new BST()

const init = [
  { key: 'a', val: 1 },
  { key: 'b', val: 2 },
  { key: 'c', val: 3 },
  { key: 'd', val: 4 },
  { key: 'e', val: 5 },
]

const buildTree = (init, lo, hi) => {
  if (lo > hi) return null

  const mid = Math.floor((hi - lo) / 2) + lo
  const current = new Node(init[mid].key, init[mid].val, 1)
  current.left = buildTree(init, lo, mid - 1)
  current.right = buildTree(init, mid + 1, hi)

  if (current.left != null) current.size += current.left.size
  if (current.right != null) current.size += current.right.size

  return current
}
