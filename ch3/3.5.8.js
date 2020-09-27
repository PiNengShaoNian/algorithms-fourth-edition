const Key = require('../lib/Key')

class LinearProbingHashTableDuplicateKeys {
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

  constructor(size) {
    this.bucketSize = size
    this.keys = []
    this.keysSize = 0
    this.values = []
    this.lgM = Math.floor(Math.log(size) / Math.log(2))
  }

  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

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

  resize(newSize) {
    const tempHashTable = new LinearProbingHashTableDuplicateKeys(newSize)

    for (let i = 0; i < this.bucketSize; i++) {
      if (this.keys[i]) {
        tempHashTable.put(this.keys[i], this.values[i])
      }
    }

    this.keys = tempHashTable.keys
    this.values = tempHashTable.values
    this.bucketSize = newSize
  }

  contains(key) {
    if (!key && key !== 0) {
      throw new Error('Argument to contains() cannot be null')
    }

    return this.get(key) !== null
  }

  get(key) {
    if (!key && key !== 0) {
      throw new Error('Argument to get() cannot be null')
    }
    key = new Key(key)

    for (
      let tableIndex = this.hash(key);
      this.keys[tableIndex];
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex].equals(key)) {
        return this.values[tableIndex]
      }
    }

    return null
  }

  put(key, value) {
    if (!key && key !== 0) {
      throw new Error('Argument to put() cannot be null')
    }

    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    if (this.keysSize >= this.bucketSize / 2) {
      this.resize(this.bucketSize * 2)
      this.lgM++
    }

    let tableIndex = this.hash(key)
    while (this.keys[tableIndex]) {
      tableIndex = (tableIndex + 1) % this.bucketSize
    }

    this.keys[tableIndex] = key
    this.values[tableIndex] = value
    this.keysSize++
  }

  delete(key) {
    if (!key && key !== 0) {
      throw new Error('Argument to delete() cannot be null')
    }

    if (!this.contains(key)) return

    let tableIndex = this.hash(key)
    while (!this.keys[tableIndex].equals(key)) {
      tableIndex = (tableIndex + 1) % this.bucketSize
    }

    this.keys[tableIndex] = null
    this.values[tableIndex] = null
    this.keysSize--

    tableIndex = (tableIndex + 1) % this.size

    while (this.keys[tableIndex]) {
      const keyToRedo = this.keys[tableIndex]
      const valueToRedo = this.values[tableIndex]

      this.keys[tableIndex] = null
      this.keys[tableIndex] = null
      this.keysSize--

      if (!keyToRedo.equals(key)) {
        this.put(keyToRedo, valueToRedo)
      }
    }

    if (this.keysSize > 1 && this.keysSize <= this.bucketSize / 8) {
      this.resize(this.bucketSize / 2)
      this.lgM--
    }
  }

  getKeys() {
    const keySet = []

    for (const key of this.keys) {
      if (key) {
        keySet.push(key)
      }
    }

    return keySet
  }
}

const set = new LinearProbingHashTableDuplicateKeys(5)

set.put(1, 1)
set.put(1, 2)
set.put(1, 3)

console.log(set.getKeys())
console.log(set.get(1))
