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
      if (key === this.keys[i]) {
        const key = this.keys[i]
        const val = this.vals[i]

        for (let j = i; j > 0; j--) {
          this.keys[j] = this.keys[j - 1]
          this.vals[j] = this.vals[j - 1]
        }

        this.keys[0] = key
        this.vals[0] = val
      }
    }
    return null
  }
}
