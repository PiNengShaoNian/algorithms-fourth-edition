class HashSETint {
  EMPTY_KEY = Number.MIN_SAFE_INTEGER

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
    this.lgM = Math.floor(Math.log(size) / Math.log(2))
  }

  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

  hash(key) {
    let hash = key & 0x7fffffff

    if (this.lgM < 26) {
      hash = hash % this.PRIMES[this.lgM + 5]
    }

    return hash % this.bucketSize
  }

  getLoadFactor() {
    return this.keysSize / this.size
  }

  resize(newSize) {
    const tempSet = new HashSETint(newSize)

    for (let i = 0; i < this.bucketSize; i++) {
      if (this.keys[i] || this.keys[i] === 0) {
        tempSet.add(this.keys[i])
      }
    }

    this.keys = tempSet.keys
    this.bucketSize = tempSet.bucketSize
  }

  contains(key) {
    //   if(!key)
    for (
      let tableIndex = this.hash(key);
      keys[tableIndex] !== undefined;
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex] === key) {
        return true
      }
    }

    return false
  }

  add(key) {
    if (this.keysSize >= this.bucketSize / 2) {
      this.resize(this.bucketSize * 2)
      this.lgM++
    }

    let tableIndex
    for (
      tableIndex = this.hash(key);
      this.keys[tableIndex] !== undefined;
      tableIndex = (tableIndex + 1) % this.bucketSize
    ) {
      if (this.keys[tableIndex] === key) {
        this.keys[tableIndex] = key
        return
      }
    }

    this.keys[tableIndex] = key
    this.keysSize++
  }

  delete(key) {
    if (!this.contains(key)) return

    let tableIndex = this.hash(key)

    while (this.keys[tableIndex] !== key) {
      tableIndex = (tableIndex + 1) % this.bucketSize
    }

    this.keys[tableIndex] = undefined
    this.keysSize--

    while (this.keys[tableIndex] !== undefined) {
      let keyToRedo = this.keys[tableIndex]

      keys[tableIndex] = undefined
      this.keysSize--
      this.add(keyToRedo)
      tableIndex = (tableIndex + 1) % this.bucketSize
    }

    if (this.keysSize > 1 && this.keysSize <= this.size / 8) {
      this.resize(this.size / 2)
      this.lgM--
    }
  }

  getKeys() {
    const keySet = []

    for (let key of this.keys) {
      if (key !== undefined) {
        keySet.push(key)
      }
    }

    return keySet
  }
}

const set = new HashSETint(3)
set.add(1)
set.add(2)
set.add(3)
set.add(4)
set.add(6)
console.log(set.getKeys())
