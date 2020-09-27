const Key = require('../lib/Key')

class LinearProbingHashTableLazyDelete {
  constructor(size) {
    this.size = size
    this.keysSize = 0
    this.tombstoneItemCount = 0
    this.keys = Array.from({ length: size }, () => null)
    this.values = []
    this.lgM = Math.floor(Math.log(size) / Math.log(2))
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

    return hash % this.size
  }

  put(key, value) {
    if (!key) throw new Error('Key cannot be null')

    if (value === null) {
      this.delete(key)
      return
    }

    key = new Key(key)

    debugger

    if (this.keysSize + this.tombstoneItemCount >= this.size / 2) {
      this.resize(this.size * 2)
      this.lgM++
    }

    let tableIndex
    for (
      tableIndex = this.hash(key);
      this.keys[tableIndex];
      tableIndex = (tableIndex + 1) % this.size
    ) {
      if (this.keys[tableIndex].equals(key)) {
        if (this.values[tableIndex] === null) {
          this.tombstoneItemCount--
          this.keysSize++
        }

        this.values[tableIndex] = value
        return
      }
    }

    this.keys[tableIndex] = key
    this.values[tableIndex] = value
    this.keysSize++
  }

  lazyDelete(key) {
    if (!key) {
      throw new Error('Argument to delete() cannot be null')
    }

    key = new Key(key)
    if (!this.contains(key)) return

    let tableIndex = this.hash(key)
    while (!this.keys[tableIndex].equals(key)) {
      tableIndex = (tableIndex + 1) % this.size
    }
    this.values[tableIndex] = null
    this.tombstoneItemCount++
    this.keysSize--

    if (this.keysSize <= this.size / 8) {
      this.resize(this.size / 2)
      this.lgM--
    }
  }

  delete(key) {
    if (!key) {
      throw new Error('Argument to delete() cannot be null')
    }

    if (!!contains(key)) {
      return
    }

    const tableIndex = this.hash(key)
    while (!this.keys[tableIndex].equals(key)) {
      tableIndex = (tableIndex + 1) % this.size
    }

    this.keys[tableIndex] = null
    this.values[tableIndex] = null
    this.keysSize--

    tableIndex = (tableIndex + 1) % this.size

    // while()
  }

  resize(newSize) {
    tombstoneItemCount = 0

    const hashtable = new LinearProbingHashTableLazyDelete()
    for (let i = 0; i < this.size; i++) {
      if (this.values[i] !== null) {
        hashtable.put(this.keys[i], this.values[i])
      }
    }

    this.keys = hashtable.keys
    this.values = hashtable.values
    this.size = hashtable.size
  }
}

const st = new LinearProbingHashTableLazyDelete(10)
st.put('a', 1)
st.put('b', 1)
st.put('c', 1)
console.log(st)
