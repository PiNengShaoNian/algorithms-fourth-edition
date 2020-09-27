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

  swim(k) {
    let i
    while (k > 1 && this.less(k, (i = Math.floor(k / 2)))) {
      this.exch(i, k)
      k = i
    }
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

  sink(k) {
    while (2 * k <= this.N) {
      let j = 2 * k
      if (j < this.N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.exch(k, j)
      k = j
    }
  }

  swim(k) {
    let i
    while (k > 1 && this.less((i = Math.floor(k / 2)), k)) {
      this.exch(i, k)
      k = i
    }
  }

  less(i, j) {
    return this.pq[i] < this.pq[j]
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }
}

class Median {
  minPQ = new MinPQ()
  maxPQ = new MaxPQ()

  insert(v) {
    
  }
}
