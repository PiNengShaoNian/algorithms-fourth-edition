class MaxPQ {
  pq = []
  N = 0

  size() {
    return this.N
  }

  isEmpty() {
    return this.N === 0
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
      this.exch(k, j)
      k = j
    }
  }

  less(i, j) {
    return this.pq[i] < this.pq[j]
  }
}

const maxPQ = new MaxPQ()

maxPQ.insert(1)
maxPQ.insert(2)
maxPQ.insert(5)
maxPQ.insert(3)
maxPQ.insert(4)

for (let i = 0; i < 5; i++) {
  console.log(maxPQ.deleteMax())
}
