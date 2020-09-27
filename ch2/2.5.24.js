class MinPQ {
  pq = []
  N = 0
  less(i, j) {
    return (
      this.pq[i].compareTo(this.pq[j]) < 0 ||
      this.pq[i].timestamp > this.pq[j].timestamp
    )
  }

  insert(v) {
    v = {
      item: v,
      compareTo: v.compareTo,
      timestamp: Date.now(),
    }
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  deleteMin() {
    const min = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N + 1] = null
    this.sink(1)

    return min
  }

  swim(k) {
    let i
    while (k > 1 && this.less(k, (i = Math.floor(k / 2)))) {
      this.exch(k, i)
      k = i
    }
  }

  sink(k) {
    while (2 * k < this.N) {
      let j = 2 * k
      if (j < this.N && this.less(j + 1, j)) j++

      if (!this.less(j, k)) break

      this.exch(k, j)
      k = j
    }
  }
}
