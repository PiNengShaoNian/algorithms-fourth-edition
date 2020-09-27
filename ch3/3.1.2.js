class SearchST {
  keys = []
  vals = []
  N = 0

  put(key, val) {
    this.keys[this.N] = key
    this.vals[this.N] = val

    this.N++
  }

  get(key) {
    for (let i = 0; i < this.keys.length; i++) {
      if (key === this.keys[i]) return this.vals[i]
    }
    return null
  }
}
