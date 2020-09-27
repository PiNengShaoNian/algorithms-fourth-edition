const Key = require('../lib/Key')

class DoubleHashingHashTable {
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
    this.size = size
    this.keys = []
    this.values = []
    this.keysSize = 0

    this.lgM = Math.floor(Math.log(size) / Math.log(2))
  }

  size() {
    return this.keysSize
  }

  hash(key) {
    key = new Key(key)
    let hash = key.hashCode() & 0x7fffffff

    if (this.lgM < 26) {
      hash = hash % this.PRIMES[this.lgM + 5]
    }

    return hash % this.size
  }

  secondaryHash(key) {
    key = new Key(key)

    let hash2 = key.hashCode() % this.size & 0xfffffff
    hash2 = hash2 !== 0 ? hash2 : this.size + 1
    return hash2
  }

  getLoadFactor() {
    return this.keysSize / this.size
  }

  resize(newSize) {
    this.tombstoneItemCount = 0

    const tempHashTable = new DoubleHashingHashTable(newSize)

    for (let i = 0; i < this.size; i++) {
      if (this.values[i]) {
        tempHashTable.put(this.keys[i], this.values[i])
      }
    }

    this.keys = tempHashTable.keys
    this.values = tempHashTable.values
    this.size = tempHashTable.size
  }

  contains(key) {
    if (!key) {
      throw new Error('Argument to contains() cannot be null')
    }
    key = new Key(key)
    return this.get(key) !== null
  }

  get(key) {
    if (!key) {
      throw new Error('Argument to get() cannot be null')
    }

    key = new Key(key)
    for (
      let tableIndex = this.hash(key);
      this.keys[tableIndex];
      tableIndex = (tableIndex + this.secondaryHash(key)) % this.size
    ) {
      if (this.keys[tableIndex].equals(key)) {
        return this.values[tableIndex]
      }
    }

    return null
  }

  put(key, value) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    if (
      this.keysSize + this.tombstoneItemCount >= this.size / 2 &&
      this.size != this.PRIMES[this.PRIMES.length - 1]
    ) {
      this.resize(this.PRIMES[this.lgM + 2])
      this.lgM++
    }

    let tableIndex
  }
}
