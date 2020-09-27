import Comparable from '../model/Comparable'
import hash from './hash'
import LoopQueue from './LoopQueue'

class Node<Key, Value> {
  constructor(
    public key: Key,
    public value: Value,
    public next: Node<Key, Value> | null
  ) {}
}

class SequentialSearchSymbolTable<
  Key extends number | string | Comparable<Key>,
  Value
> {
  private first: Node<Key, Value> | null = null
  private _size: number = 0

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  contains(key: Key): boolean {
    return this.get(key) !== null
  }

  keyComparator(key1: Key, key2: Key): number {
    if (typeof key1 === 'number') {
      return key1 - (key2 as number)
    } else if (typeof key1 === 'string') {
      if (key1 === key2) return 0
      return key1 < (key2 as string) ? -1 : 1
    } else {
      return (key1 as Comparable<Key>).compareTo(key2)
    }
  }

  get(key: Key): null | Value {
    for (let node = this.first; node; node = node.next) {
      if (this.keyComparator(node.key, key) === 0) return node.value
    }

    return null
  }

  put(key: Key, value: Value) {
    for (let node = this.first; node; node = node.next) {
      if (this.keyComparator(node.key, key) === 0) {
        node.value = value
        return
      }
    }

    this.first = new Node(key, value, this.first)
    this._size++
  }

  delete(key: Key) {
    if (this.isEmpty()) return
    if (this.keyComparator(this.first!.key, key) === 0) {
      this.first = this.first!.next
      this._size--
      return
    }

    for (let node = this.first; node; node = node.next) {
      if (node.next != null && this.keyComparator(node.next.key, key) === 0) {
        node.next = node.next.next
        this._size--
        return
      }
    }
  }

  keys(): Iterable<Key> {
    const keys = new LoopQueue<Key>()

    for (let node = this.first; node; node = node.next) {
      keys.enqueue(node.key)
    }

    return keys
  }
}

class SeparateChainingHashTable<
  Key extends number | string | Comparable<Key>,
  Value
> {
  protected averageListSize: number = 0
  protected _size: number = 0
  protected keysSize: number = 0
  public symbolTable: SequentialSearchSymbolTable<Key, Value>[]

  private static readonly DEFAULT_HASH_TABLE_SIZE = 997
  private static readonly DEFAULT_AVERAGE_LIST_SIZE = 5

  protected static readonly PRIMES = [
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

  constructor(
    initialSize: number = SeparateChainingHashTable.DEFAULT_HASH_TABLE_SIZE,
    averageListSize: number = SeparateChainingHashTable.DEFAULT_AVERAGE_LIST_SIZE
  ) {
    this._size = initialSize
    this.averageListSize = averageListSize
    this.symbolTable = Array.from(
      { length: initialSize },
      () => new SequentialSearchSymbolTable()
    )

    this.lgM = Math.floor(Math.log(this._size) / Math.log(2))
  }

  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

  hash(key: Key) {
    let hashCode = hash(key) & 0x7fffffff

    if (this.lgM < 26) {
      hashCode = hashCode % SeparateChainingHashTable.PRIMES[this.lgM + 5]
    }

    return hashCode % this._size
  }

  getLoadFactor() {
    return this.keysSize / this._size
  }

  contains(key: Key): boolean {
    return this.get(key) !== null
  }

  get(key: Key): Value | null {
    return this.symbolTable[this.hash(key)].get(key)
  }

  put(key: Key, value: Value | null) {
    if (value === null) {
      return
    }

    if (value === null) {
      this.delete(key)
      return
    }

    const hashIndex = this.hash(key)
    const currentSize = this.symbolTable[hashIndex].size()
    this.symbolTable[hashIndex].put(key, value)

    if (currentSize < this.symbolTable[hashIndex].size()) {
      this.keysSize++
    }

    if (this.getLoadFactor() > this.averageListSize) {
      this.resize(this._size * 2)
      this.lgM++
    }
  }

  resize(newSize: number) {
    const separateChainingHashTableTemp = new SeparateChainingHashTable<
      Key,
      Value
    >(newSize, this.averageListSize)

    for (const key of this.keys()) {
      separateChainingHashTableTemp.put(key, this.get(key)!)
    }

    this.symbolTable = separateChainingHashTableTemp.symbolTable
    this._size = separateChainingHashTableTemp._size
  }

  keys(): Iterable<Key> {
    const keys = new LoopQueue<Key>()

    for (const sequentialSearchST of this.symbolTable) {
      for (const key of sequentialSearchST.keys()) {
        keys.enqueue(key)
      }
    }

    return keys
  }

  delete(key: Key) {
    if (this.isEmpty() || !this.contains(key)) return

    this.symbolTable[this.hash(key)].delete(key)
    this.keysSize--

    if (this._size > 1 && this.getLoadFactor() <= this.averageListSize / 4) {
      this.resize(Math.floor(this._size / 2))
      this.lgM--
    }
  }
}

export default SeparateChainingHashTable
