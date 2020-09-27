class HashSTint {
  constructor(size) {
    this.bucketSize = size
    this.keys = Array.from({ length: size }, () => Number.MIN_SAFE_INTEGER)
    this.values = []

    this.lgM = Math.floor(Math.log(size) / Math.log(2))
    this.keysSize = 0
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
    let hash = key & 0x7fffffff

    if (this.lgM < 26) {
      hash = hash % this.PRIMES[this.lgM + 5]
    }

    return hash % this.bucketSize
  }

  getLoadFactor() {
    return this.keysSize / this.bucketSize
  }

  resize(newSize) {
    const tempHashTable = new HashSTint(newSize)

    for (let i = 0; i < this.bucketSize; i++) {
      if (this.keys[i] != Number.MIN_SAFE_INTEGER) {
        tempHashTable.put(this.keys[i], this.values[i])
      }
    }

    this.keys = tempHashTable.keys
    this.values = tempHashTable.values
    this.bucketSize = tempHashTable.bucketSize
  }

  contains(key) {
    if (key === Number.MIN_SAFE_INTEGER) {
      throw new Error('Invalid key')
    }

    for (
      let tableIndex = this.hash(key);
      this.keys[tableIndex] !== Number.MIN_SAFE_INTEGER;
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex] === key) {
        return true
      }
    }

    return false
  }

  get(key) {
    if (key == Number.MIN_SAFE_INTEGER) {
      throw new Error('Invalid key')
    }

    for (
      let tableIndex = this.hash(key);
      this.keys[tableIndex] !== Number.MIN_SAFE_INTEGER;
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex] === key) {
        return this.values[tableIndex]
      }
    }

    return null
  }

  put(key, value) {
    debugger
    if (key === Number.MIN_SAFE_INTEGER) {
      throw new Error('Invalid key')
    }

    if (value === null) {
      this.delete(key)
      return
    }

    if (this.keysSize >= this.bucketSize / 2) {
      this.resize(this.bucketSize * 2)
      this.lgM++
    }

    let tableIndex
    for (
      tableIndex = this.hash(key);
      this.keys[tableIndex] !== Number.MIN_SAFE_INTEGER;
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex] === key) {
        this.values[tableIndex] = value
        return
      }
    }

    this.keys[tableIndex] = key
    this.values[tableIndex] = value
    this.keysSize++
  }

  delete(key) {
    if (key === Number.MIN_SAFE_INTEGER) {
      throw new Error('Invalid key')
    }

    if (!this.contains(key)) return

    let tableIndex = this.hash(key)

    while (this.keys[tableIndex] != key) {
      tableIndex = (tableIndex + 1) % this.bucketSize
    }

    this.keys[tableIndex] = Number.MIN_SAFE_INTEGER
    this.values[tableIndex] = null
    this.keysSize--

    tableIndex = (tableIndex + 1) % this.bucketSize

    while (this.keys[tableIndex] !== Number.MIN_SAFE_INTEGER) {
      const keyToRedo = this.keys[tableIndex]
      const valueToRedo = this.values[tableIndex]

      this.keys[tableIndex] = Number.MIN_SAFE_INTEGER
      this.values[tableIndex] = null
      this.put(keyToRedo, valueToRedo)
      tableIndex = (tableIndex + 1) % this.size
    }

    if (this.keysSize > 1 && this.keysSize <= this.size / 8) {
      this.resize(this.bucketSize / 2)
      this.lgM--
    }
  }

  getKeys() {
    const keySet = []

    for (const key of this.keys) {
      if (key !== Number.MIN_SAFE_INTEGER) {
        keySet.push(key)
      }
    }

    return keySet
  }
}

const hashTable = new HashSTint(10)
hashTable.put(1, 1)
hashTable.put(2, 1)
hashTable.put(3, 1)
hashTable.put(3, 1)
hashTable.put(1, 1)

console.log(hashTable.getKeys())
