class MaxPQ {
  pq = []
  N = 0
  less(i, j) {
    return i < j
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  swim(k) {
    let i
    while (k > 1 && this.less((i = Math.floor(k / 2)), k)) {
      this.exch(i, k)
      k = i
    }
  }

  sink(k) {

    
    while (2 * k <= this.N) {
      let j = 2 * k
      if (j < this.N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      k = j
    }
  }

  insert(v) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  deleteMax() {
    const max = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N + 1] = null
    this.sink(1)

    return max
  }
}
