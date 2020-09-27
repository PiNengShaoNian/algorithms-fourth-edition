class BinarySearchST {
  keys = []
  vals = []
  N = 0

  size() {
    return this.N
  }

  put(key, val) {
    let i = this.rank(key)

    if (i < this.N && this.keys[i].compareTo(key) === 0) {
      this.vals[i] = val
      return
    }

    for (let j = this.N; j > i; j--) {
      this.keys[j] = this.keys[j - 1]
      this.vals[j] = this.vals[j - 1]
    }
    this.keys[i] = key
    this.vals[i] = val
    this.N++
  }

  get(key) {
    if (this.isEmpty()) return null
    let i = this.rank(key)
    if (i < this.N && this.keys[i].compareTo(key) === 0) return this.vals[i]
    else return null
  }

  rank(key) {
    let lo = 0,
      hi = this.N - 1

    while (lo <= hi) {
      let mid = lo + Math.floor((hi - lo) / 2)
      let cmp = key.compareTo(this.keys[mid])
      if (cmp < 0) hi = mid - 1
      else if (cmp > 0) lo = mid + 1
      else return mid
    }

    return lo
  }

  isEmpty() {
    return this.N === 0
  }
}

module.exports = BinarySearchST
