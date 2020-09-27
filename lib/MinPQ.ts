import Comparable from '../model/Comparable'

class MinPQ<E extends number | string | Comparable<E>> {
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

    while (k > 1 && this.less(k, (j = Math.floor(k / 2)))) {
      this.exch(j, k)
      k = j
    }
  }

  deleteMin(): E {
    const min = this.pq[1]
    this.exch(1, this.N--)
    this.pq.length = this.N + 1
    this.sink(1)
    return min
  }

  sink(k: number) {
    while (2 * k <= this.N) {
      let j = 2 * k

      if (j < this.N && this.less(j + 1, j)) j++

      if (this.less(k, j)) break

      this.exch(j, k)

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
}

export default MinPQ
