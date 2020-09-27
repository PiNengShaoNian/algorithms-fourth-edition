const Key = require('../lib/Key')

const uniform = (min, max) => {
  return Math.floor((max - min) * Math.random()) + min
}

class Entry {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}

class HashFunction {
  constructor(coefficientA, coefficientB, lgSize) {
    this.mA = coefficientA
    this.mB = coefficientB
    this.mLgSize = lgSize
  }

  hash(key) {
    if (!key) return 0

    key = new Key(key)
    const hashCode = key.hashCode()
    const upper = hashCode >>> 16
    const lower = hashCode & 0xffff

    return (upper * this.mA + lower * this.mB) >>> (32 - this.mLgSize)
  }
}

class CuckooHashing {
  constructor(size) {
    this.size = size
    this.keysSize = 0

    this.keysAndValues = Array.from({ length: 2 }, () =>
      Array.from({ length: size }, () => null)
    )

    const lgM = Math.floor(Math.log(size) / Math.log(2))

    this.hashFunctions = Array.from({ length: 2 }, () => {
      const randomCoefficientA = uniform(0, Number.MAX_SAFE_INTEGER)
      const randomCoefficientB = uniform(0, Number.MAX_SAFE_INTEGER)

      return new HashFunction(randomCoefficientA, randomCoefficientB, lgM)
    })
  }

  isEmpty() {
    return this.keysSize
  }

  updateHashFunctions() {
    const lgM = Math.log(this.size) / Math.lgM(2)

    this.hashFunctions = Array.from({ length: 2 }, () => {
      const randomCoefficientA = uniform(0, Number.MAX_SAFE_INTEGER)
      const randomCoefficientB = uniform(0, Number.MAX_SAFE_INTEGER)

      return new HashFunction(randomCoefficientA, randomCoefficientB, lgM)
    })
  }

  put(key, value) {
    debugger
    if (!key) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)
    if (value === null) {
      this.delete(key)
      return
    }

    for (let hashTableIndex = 0; hashTableIndex < 2; hashTableIndex++) {
      const hash = this.hashFunctions[hashTableIndex].hash(key)

      if (
        this.keysAndValues[hashTableIndex][hash] &&
        this.keysAndValues[hash].key.equals(key)
      ) {
        this.keysAndValues[hashTableIndex][hash].value = value
        return
      }
    }

    if (this.keysSize >= this.size) {
      this.resize(this.size * 2)
    }

    let entry = new Entry(key, value)
    while (entry) {
      entry = this.tryToInsert(entry)
      if (entry) {
        rehash()
      }
    }

    this.keysSize++
  }

  tryToInsert(entry) {
    const maxTries = this.size + 1
    let hashTableIndex = 0

    for (let numberOfTries = 0; numberOfTries < maxTries; numberOfTries++) {
      const hash = this.hashFunctions[hashTableIndex].hash(entry.key)

      if (!this.keysAndValues[hashTableIndex][hash]) {
        this.keysAndValues[hashTableIndex][hash] = entry
        return null
      }

      const entryToDisplace = this.keysAndValues[hashTableIndex][hash]
      this.keysAndValues[hashTableIndex][hash] = entry

      entry = entryToDisplace
      hashTableIndex = (hashTableIndex + 1) % 2
    }

    return entry
  }

  rehash() {
    const tempKeysAndValues = []
    const tempKeysAndValuesIndex = 0

    for (let i = 0; i < 2; i++) {
      for (let entry of this.keysAndValues[i]) {
        if (entry) {
          tempKeysAndValues[tempKeysAndValuesIndex++] = entry
        }
      }
    }

    const tryToRehash = true

    while (tryToRehash) {
      tryToRehash = false

      this.updateHashFunctions()

      for (let keysAndValues of this.keysAndValues) {
        keysAndValues.fill(null)
      }

      for (let entry of tempKeysAndValues) {
        if (this.tryToInsert(entry)) {
          tryToRehash = true
          break
        }
      }
    }
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

    for (let hashTableIndex = 0; hashTableIndex < 2; hashTableIndex++) {
      const hash = this.hashFunctions[hashTableIndex].hash(key)

      if (
        this.keysAndValues[hashTableIndex][hash] &&
        this.keysAndValues[hashTableIndex][hash].key.equals(key)
      ) {
        return this.keysAndValues[hashTableIndex][hash].value
      }
    }

    return null
  }

  keys() {
    const keySet = []

    for (
      let hashTableIndex = 0;
      hashTableIndex < this.keysAndValues.length;
      hashTableIndex++
    ) {
      for (let entry of this.keysAndValues[hashTableIndex]) {
        if (entry) {
          keySet.push(entry.key)
        }
      }
    }

    return keySet
  }
}

const cuckooHashing = new CuckooHashing(16)

cuckooHashing.put('a', 1)
cuckooHashing.put('b', 2)
cuckooHashing.put('c', 3)
console.log(cuckooHashing)
