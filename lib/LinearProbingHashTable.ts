import Comparable from '../model/Comparable'
import hash from './hash'
import LoopQueue from './LoopQueue'

class LinearProbingHashTable<
  Key extends string | number | Comparable<Key>,
  Value
> {
  protected keysSize: number = 0
  protected _size = 0
  protected _keys: (Key | null)[] = []
  protected _values: (Value | null)[] = []

  private static readonly PRIMES = [
    1,
    1,
    3,
    7,
    13,
    31,
    61,
    127,
    251,
    509,
    1021,
    2039,
    4093,
    8191,
    16381,
    32749,
    65521,
    131071,
    262139,
    524287,
    1048573,
    2097143,
    4194301,
    8388593,
    16777213,
    33554393,
    67108859,
    134217689,
    268435399,
    536870909,
    1073741789,
    2147483647,
  ]

  protected lgM: number = 0

  constructor(size: number) {
    this._size = size

    this.lgM = Math.floor(Math.log(size) / Math.log(2))
  }

  size(): number {
    return this.keysSize
  }

  isEmpty(): boolean {
    return this.keysSize === 0
  }

  protected hash(key: Key): number {
    let hashCode = hash(key) & 0x7fffffff

    if (this.lgM < 26) {
      hashCode = hashCode % LinearProbingHashTable.PRIMES[this.lgM + 5]
    }

    return hashCode % this._size
  }

  protected getLoadFactor(): number {
    return this.keysSize / this._size
  }

  resize(newSize: number): void {
    const tempHashTable = new LinearProbingHashTable<Key, Value>(newSize)

    for (let i = 0; i < this._size; i++) {
      if (this._keys[i]) {
        tempHashTable.put(this._keys[i]!, this._values[i]!)
      }
    }

    this._keys = tempHashTable._keys
    this._values = tempHashTable._values
    this._size = tempHashTable._size
  }

  contains(key: Key): boolean {
    return this.get(key) !== null
  }

  get(key: Key): null | Value {
    for (
      let tableIndex = this.hash(key);
      this._keys[tableIndex];
      tableIndex = (tableIndex + 1) % this._size
    ) {
      if (this.keysComparator(this._keys[tableIndex]!, key) === 0)
        return this._values[tableIndex]
    }

    return null
  }

  put(key: Key, value: Value | null) {
    if (value === null) {
      this.delete(key)
      return
    }
    if (this.keysSize >= this._size / 2) {
      this.resize(this._size * 2)
      this.lgM++
    }

    let tableIndex
    for (
      tableIndex = this.hash(key);
      this._keys[tableIndex];
      tableIndex = (tableIndex + 1) % this._size
    ) {
      if (this.keysComparator(this._keys[tableIndex]!, key) === 0) {
        this._values[tableIndex] = value
        return
      }
    }

    this._keys[tableIndex] = key
    this._values[tableIndex] = value

    this.keysSize++
  }

  delete(key: Key) {
    if (!this.contains(key)) return

    let tableIndex = this.hash(key)

    while (this.keysComparator(this._keys[tableIndex]!, key) !== 0) {
      tableIndex = (tableIndex + 1) % this._size
    }

    this._keys[tableIndex] = null
    this._values[tableIndex] = null

    tableIndex = (tableIndex + 1) % this._size

    while (this._keys[tableIndex]) {
      const keyToRedo = this._keys[tableIndex]
      const valueToRedo = this._values[tableIndex]

      this._keys[tableIndex] = null
      this._keys[tableIndex] = null
      this.keysSize--

      this.put(keyToRedo!, valueToRedo!)
      tableIndex = (tableIndex + 1) % this._size
    }

    if (this.keysSize > 1 && this.keysSize <= this._size / 8) {
      this.resize(Math.floor(this._size / 2))
      this.lgM--
    }
  }

  keysComparator(key1: Key, key2: Key): number {
    if (typeof key1 === 'number') {
      return key1 - (key2 as number)
    } else if (typeof key1 === 'string') {
      if (key1 === key2) return 0
      return key1 < (key2 as string) ? -1 : 1
    } else {
      return (key1 as Comparable<Key>).compareTo(key2)
    }
  }

  keys(): Iterable<Key> {
    const keySet = new LoopQueue<Key>()
    for (const key of this._keys) {
      if (key != null) {
        keySet.enqueue(key)
      }
    }
    return keySet
  }
}

export default LinearProbingHashTable
