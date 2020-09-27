const { ENOTSUP } = require('constants')

class Merge {
  aux = []

  sort(a) {
    this._sort(a, 0, a.length - 1)
    return a
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return
    let mid = lo + Math.floor((hi - lo) / 2)
    this._sort(a, lo, mid)
    this._sort(a, mid + 1, hi)
    this.merge(a, lo, mid, hi)
  }

  merge(a, lo, mid, hi) {
    let i = lo
    let j = mid + 1

    for (let k = lo; k <= hi; k++) this.aux[k] = a[k]

    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        a[k] = this.aux[j++]
      } else if (j > hi) {
        a[k] = this.aux[i++]
      } else if (this.less(this.aux[j], this.aux[i])) {
        a[k] = this.aux[j++]
      } else a[k] = this.aux[i++]
    }
  }

  less(a, b) {
    if (typeof a === 'object') {
      return a.compareTo(b) < 0
    }

    return a < b
  }
}

class Item {
  constructor(key, val) {
    this.key = new Key(key)
    this.val = val
  }

  compareTo(that) {
    return this.key.compareTo(that.key)
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
}

class BinarySearchST {
  items = []
  N = 0

  constructor(items) {
    if (!items) return
    this.items = new Merge().sort(items)
    this.N = items.length
  }

  put(key, val) {
    const item = new Item(key, val)

    const i = this.rank(item)

    if (i < this.N && item.compareTo(this.items[i]) === 0) {
      this.items[i].val = val
      return
    }

    for (let j = this.N; j > i; j--) {
      this.items[j] = this.items[j - 1]
    }
    this.items[i] = item
    this.N++
  }

  isEmpty() {
    return this.N === 0
  }

  get(key) {
    if (this.isEmpty()) return null

    const item = new Item(key)
    const i = this.rank(item)

    if (i < this.N && item.compareTo(this.items[i]) === 0) {
      return this.items[i].val
    }

    return null
  }

  rank(item) {
    let lo = 0,
      hi = this.N - 1

    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2)

      if (item.compareTo(this.items[mid]) > 0) {
        lo = mid + 1
      } else if (item.compareTo(this.items[mid]) < 0) {
        hi = mid - 1
      } else return mid
    }

    return lo
  }

  delete(key) {
    const item = new Item(key)
    const i = this.rank(item)

    if (i < this.N && item.compareTo(this.items[i]) === 0) {
      for (let j = i; j < this.N; j++) {
        this.items[j] = this.items[j + 1]
      }
      this.N--
    }
  }

  keys() {
    const result = []
    for (let i = 0; i < this.N; i++) result.push(this.items[i].key.key)

    return result
  }

  values() {
    const result = []
    for (let i = 0; i < this.N; i++) result.push(this.items[i].val)

    return result
  }

  floor(key) {
    if (this.get(key)) return this.get(key)

    const item = new Item(key)
    const i = this.rank(item)
    return this.items[i - 1].val
  }
}

const bs = new BinarySearchST()
bs.put('a', 1)
bs.put('b', 2)
bs.put('c', 4)
bs.put('aa', 3)
bs.put('ee', 7)

console.log({
  keys: bs.keys(),
  values: bs.values(),
  floor: bs.floor('d'),
})
