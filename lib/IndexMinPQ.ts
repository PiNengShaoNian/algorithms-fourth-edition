import Comparable from '../model/Comparable'

class IndexMinPQ<E extends Comparable<E> | number | string> {
  private _size = 0
  private keys: E[] = []
  private pq: number[] = []
  private qp: number[]

  constructor(size: number) {
    this.qp = Array.from({ length: size + 1 }, () => -1)
  }

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  insert(index: number, key: E) {
    if (this.contains(index))
      throw new Error('Index is already in the priority queue')

    if (this._size >= this.qp.length - 1) return

    this._size++

    this.keys[index] = key
    this.pq[this._size] = index
    this.qp[index] = this._size

    this.swim(this._size)
  }

  less(indexA: number, indexB: number): boolean {
    if (
      typeof this.keys[this.pq[indexA]] === 'string' ||
      typeof this.keys[this.pq[indexA]] === 'number'
    ) {
      return this.keys[this.pq[indexA]] < this.keys[this.pq[indexB]]
    } else {
      return (
        (this.keys[this.pq[indexA]] as Comparable<E>).compareTo(
          this.keys[this.pq[indexB]]
        ) < 0
      )
    }
  }

  keyOf(index: number) {
    if (!this.contains(index))
      throw new Error('Index is not in the priority queue')

    return this.keys[index]
  }

  deleteMin() {
    if (this._size === 0) throw new Error('Priority queue underflow')

    const minElementIndex = this.pq[1]

    this.exch(1, this._size)

    this._size--
    this.sink(1)

    return minElementIndex
  }

  delete(i: number) {
    if (!this.contains(i)) throw new Error('Index is not in the priority queue')

    const index = this.qp[i]

    this.exch(index, this._size)

    this.swim(index)
    this.sink(index)

    this._size--

    this.qp[i] = -1
  }

  changeKey(index: number, key: E) {
    if (!this.contains(index))
      throw new Error('Index is not in the priority queue')

    this.keys[index] = key

    this.swim(this.qp[index])
    this.sink(this.qp[index])
  }

  sink(index: number) {
    while (index * 2 <= this._size) {
      let selectedChildIndex = index * 2

      if (index * 2 + 1 <= this._size && this.less(index * 2 + 1, index * 2)) {
        selectedChildIndex = index * 2 + 1
      }

      if (this.less(selectedChildIndex, index))
        this.exch(index, selectedChildIndex)
      else break

      index = selectedChildIndex
    }
  }

  contains(index: number) {
    return this.qp[index] !== -1
  }

  swim(index: number) {
    let j: number
    while (index / 2 >= 1 && this.less(index, (j = Math.floor(index / 2)))) {
      this.exch(j, index)
      index = j
    }
  }

  exch(keyIndex1: number, keyIndex2: number) {
    const temp = this.pq[keyIndex1]

    this.pq[keyIndex1] = this.pq[keyIndex2]
    this.pq[keyIndex2] = temp

    this.qp[this.pq[keyIndex1]] = keyIndex1
    this.qp[this.pq[keyIndex2]] = keyIndex2
  }
}

export default IndexMinPQ
