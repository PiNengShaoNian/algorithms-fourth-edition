class MinPQ {
  N = 0
  pq = []

  less(i, j) {
    return this.pq[i].compareTo(this.pq[j]) < 0
  }
  //   less(i, j) {
  //     return this.pq[i] < this.pq[j]
  //   }
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

class CubeSum {
  constructor(i, j) {
    this.sum = i * i * i + j * j * j
    this.i = i
    this.j = j
  }

  compareTo(that) {
    if (this.sum < that.sum) return -1
    if (this.sum > that.sum) return 1
    return 0
  }

  toString() {
    return `sum=${i}^3+${j}^3`
  }
}

// const minPQ = new MinPQ()
// minPQ.insert(2)
// minPQ.insert(3)
// minPQ.insert(1)
// minPQ.insert(5)
// for (let i = 0; i < 4; i++) console.log(minPQ.deleteMin())

// const main = (n) => {
//   const minPQ = new MinPQ()
//   for (let i = 0; i <= n; i++) {
//     minPQ.insert(new CubeSum(i, i))
//   }

//   while (!minPQ.isEmpty()) {
//     const s = minPQ.deleteMin()
//     console.log(s)
//     if (s.j < n) minPQ.insert(new CubeSum(s.i, s.j + 1))
//   }
// }

// main(100)