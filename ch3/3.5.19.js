const Key = require('../lib/Key')

function Node(key, value, next) {
  this.key = key
  this.value = value
  this.next = next
}

class SequentialSearchSymbolTable {
  keysSize = 0
  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

  contains(key) {
    return this.get(key) !== null
  }

  get(key) {
    key = new Key(key)

    for (let node = this.first; node; node = node.next) {
      if (key.equals(node.key)) {
        return node.value
      }
    }

    return null
  }

  getAll(key) {
    const values = []
    key = new Key(key)
    for (let node = this.first; node; node = node.next) {
      if (node.key.equals(key)) {
        values.push(node.value)
      }
    }

    return values
  }

  put(key, value) {
    key = new Key(key)

    this.first = new Node(key, value, this.first)
    this.keysSize++
  }

  delete(key) {
    key = new Key(key)

    if (this.first.key.equals(key)) {
      this.first = this.first.next
      this.keysSize--
      return
    }

    for (let node = this.first; node; node = node.next) {
      if (node.next && node.next.key.equals(key)) {
        node.next = node.next.next
        this.keysSize--
        return
      }
    }
  }

  keys() {
    const keys = []

    for (let node = this.first; node; node = node.next) {
      keys.push(node.key)
    }

    return keys
  }
}

class SeparateChainingMultiST {
  constructor(initialSize = 997, averageListSize = 5) {
    this.bucketSize = initialSize
    this.averageListSize = averageListSize

    this.symbolTable = Array.from(
      { length: initialSize },
      () => new SequentialSearchSymbolTable()
    )
    this.keysSize = 0
    this.lgM = Math.floor(Math.log(initialSize) / Math.log(2))
  }

  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

  PRIMES = [
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

  hash(key) {
    key = new Key(key)
    let hash = key.hashCode() & 0x7fffffff

    if (this.lgM < 26) {
      hash = hash % this.PRIMES[this.lgM + 5]
    }

    return hash % this.bucketSize
  }

  getLoadFactor() {
    return this.keysSize / this.bucketSize
  }

  contains(key) {
    return this.get(key) !== null
  }

  resize(newSize) {
    const separateChainingMultiSTTemp = new SeparateChainingMultiST(
      newSize,
      this.averageListSize
    )

    for (const key of this.keys()) {
      separateChainingMultiSTTemp.put(key, this.get(key))
    }

    this.symbolTable = separateChainingMultiSTTemp.symbolTable
    this.bucketSize = separateChainingMultiSTTemp.bucketSize
  }

  get(key) {
    return this.symbolTable[this.hash(key)].get(key)
  }

  getAll(key) {
    if (!this.contains(key)) return []

    return this.symbolTable[this.hash(key)].getAll(key)
  }

  put(key, value) {
    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    this.symbolTable[this.hash(key)].put(key, value)
    this.keysSize++

    if (this.getLoadFactor() > this.averageListSize) {
      this.resize(this.bucketSize * 2)
      this.lgM++
    }
  }

  delete(key) {
    key = new Key(key)

    if (this.isEmpty() || !this.contains(key)) return

    const hashIndex = this.hash(key)
    while (this.symbolTable[hashIndex].contains(key)) {
      this.symbolTable[hashIndex].delete(key)
      this.keysSize--

      if (this.size > 1 && this.getLoadFactor() <= this.averageListSize / 4) {
        this.resize(this.bucketSize / 2)
        this.lgM--
      }
    }
  }

  keys() {
    const keys = []

    for (const st of this.symbolTable) {
      for (const key of st.keys()) {
        keys.push(key)
      }
    }

    return keys
  }
}
