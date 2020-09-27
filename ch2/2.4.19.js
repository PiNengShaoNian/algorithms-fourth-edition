class MaxPQ {
  constructor(a) {
    this.N = a.length
    this.pq = []
    for (let i = 0; i < this.N; i++) this.pq[i + 1] = a[i]

    for (let k = N / 2; k >= 1; k--) {
      this.sink(k)
    }
  }

  sink(k) {
    while (2 * k <= this.N) {
      const j = 2 * k
      if (j < this.N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.exch(k, j)
      k = j
    }
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  less(i, j) {
    return this.pq[i] < this.pq[j]
  }
}
