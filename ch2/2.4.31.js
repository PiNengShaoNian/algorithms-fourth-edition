class MinPQ {
  N = 0
  pq = []

  //   less(i, j) {
  //     return this.pq[i].compareTo(this.pq[j]) < 0
  //   }
  less(i, j) {
    return this.pq[i] < this.pq[j]
  }
  isEmpty() {
    return this.N === 0
  }

  size() {
    return this.N
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  sink(k) {
    let j
    while ((j = 2 * k) <= this.N) {
      if (j < this.N && this.less(j + 1, j)) j++
      if (!this.less(j, k)) break
      this.exch(j, k)
      k = j
    }
  }

  //   swim(k) {
  //     let i
  //     while (k > 1 && this.less(k, (i = Math.floor(k / 2)))) {
  //       this.exch(i, k)
  //       k = i
  //     }
  //   }

  swim(k) {
    if (k <= 1) return
    let hi = Math.floor(Math.log2(k))
    let lo = 1
    while (lo <= hi) {
      const mid = Math.floor((hi + lo) / 2)
      const index = Math.floor(k / 2 ** mid)
      if (this.less(index, k)) {
        lo = mid + 1
      } else if (this.less(k, index)) hi = mid - 1
    }

    this.exch(k, lo)
  }

  insert(v) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  deleteMin() {
    const min = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N + 1] = null
    this.sink(1)

    return min
  }
}

const minPQ = new MinPQ()
minPQ.insert(5)
minPQ.insert(4)
minPQ.insert(3)
minPQ.insert(2)
minPQ.insert(1)

for (let i = 0; i < 5; i++) console.log(minPQ.deleteMin())
