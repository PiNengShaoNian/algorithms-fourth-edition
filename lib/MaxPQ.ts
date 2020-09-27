import Comparable from '../model/Comparable'

class MaxPQ<E extends Comparable<E> | number | string> {
  private pq: E[] = []

  private N = 0

  isEmpty() {
    return this.N === 0
  }

  size() {
    return this.N
  }

  insert(v: E) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  swim(k: number) {
    let j
    while (k > 1 && this.less((j = Math.floor(k / 2)), k)) {
      this.exch(k, j)
      k = j
    }
  }

  sink(k: number) {
    while (2 * k <= this.N) {
      let j = 2 * k

      if (j < this.N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break

      this.exch(k, j)
      k = j
    }
  }

  less(a: number, b: number): boolean {
    if (typeof this.pq[a] === 'string' || typeof this.pq[a] === 'number') {
      return this.pq[a] < this.pq[b]
    } else {
      return (this.pq[a] as Comparable<E>).compareTo(this.pq[b]) < 0
    }
  }

  exch(i: number, j: number) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  deleteMax() {
    const max = this.pq[1]
    this.exch(1, this.N--)
    this.pq.length = this.N + 1
    this.sink(1)
    return max
  }
}

export default MaxPQ
