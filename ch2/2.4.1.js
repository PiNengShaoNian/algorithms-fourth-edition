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

const maxPQ = new MaxPQ()

const input = [...'PRIO*R**I*T*Y***QUE***U*E']
for (let i = 0; i < input.length; i++) {
  if (input[i] === '*') {
    console.log(maxPQ.deleteMax())
  } else {
    maxPQ.insert(input[i])
  }
}
