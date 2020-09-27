const Key = require('../lib/Key')

class Node {
  constructor(key, value, next, numberOfKeysAtTimeOfInsert) {
    this.key = key
    this.value = value
    this.next = next
    this.numberOfKeysAtTimeOfInsert = numberOfKeysAtTimeOfInsert
  }
}

class SeparateChainningHashTableLinkedListWithDeleteK {
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

  constructor(numberOfBuckets, averageListSize) {
    this.keysSize = 0
    this.averageListSize = averageListSize
    this.numberOfBuckets = numberOfBuckets

    this.buckets = Array.from({ length: numberOfBuckets }, () => null)
    this.lgM = Math.floor(Math.log(numberOfBuckets) / Math.log(2))
  }

  hash(key) {
    key = new Key(key)
    let hash = key.hashCode() & 0x7fffffff

    if (this.lgM < 26) {
      hash = hash % this.PRIMES[this.lgM + 5]
    }

    return hash % this.numberOfBuckets
  }

  getLoadFactor() {
    return this.keysSize / this.numberOfBuckets
  }

  isEmpty() {
    return this.keysSize === 0
  }

  size() {
    return this.keysSize
  }

  contains(key) {
    if (!key) {
      throw new Error('Argument to contains() cannot be null')
    }
    key = new Key(key)

    return this.get(key) !== null
  }

  resize(newBucketSize) {
    const tempBuckets = this.buckets
    this.buckets = Array.from({ length: newBucketSize }, () => null)

    this.keysSize = 0

    for (let node of tempBuckets) {
      while (node) {
        this.put(node.key, node.value, node.numberOfKeysAtTimeOfInsert)

        node = node.next
      }
    }
  }

  get(key) {
    if (!key) {
      throw new Error('Argument to get() cannot be null')
    }
    key = new Key(key)

    let node = this.buckets[this.hash(key)]

    while (node) {
      if (node.key.equals(key)) {
        return node.value
      }

      node = node.next
    }

    return null
  }

  put(key, value) {
    this._put(key, value, -1)
  }

  _put(key, value, numberOfKeysAtTimeOfInsert) {
    if (!key) throw new Error('Key cannot be null')
    key = new Key(key)

    if (value === null) {
      this.delete(key)
      return
    }

    const bucketIndex = this.hash(key)
    let node = this.buckets[bucketIndex]

    while (node) {
      if (node.key.equals(key)) {
        node.value = value
        return
      }

      node = node.next
    }

    this.keysSize++
    node = this.buckets[bucketIndex]
    let newNode
    if (numberOfKeysAtTimeOfInsert !== -1) {
      newNode = new Node(key, value, node, numberOfKeysAtTimeOfInsert)
    } else {
      newNode = new Node(key, value, node, this.keysSize)
    }

    this.buckets[bucketIndex] = newNode

    if (this.getLoadFactor() > this.averageListSize) {
      this.resize(this.numberOfBuckets * 2)
      this.lgM++
    }
  }

  delete(key) {
    if (!key) {
      throw new Error('Argument to delete() cannot be null')
    }
    key = new Key(key)
    if (this.isEmpty() || !this.contains(key)) {
      return
    }

    const bucketIndex = this.hash(key)
    let node = this.buckets[bucketIndex]
    this.keysSize--
    if (node.key.equals(key)) {
      this.buckets[bucketIndex] = node.next
    } else {
      while (node) {
        if (node.next.key.equals(key)) {
          node.next = node.next.next
          break
        }

        node = node.next
      }
    }

    if (
      this.numberOfBuckets > 1 &&
      this.getLoadFactor() <= this.averageListSize / 4
    ) {
      this.resize(this.numberOfBuckets / 2)
      this.lgM--
    }
  }

  deleteNewestNodes(k) {
    if (k < 0) {
      throw new Error('K cannot be negative')
    }

    if (this.isEmpty()) return

    const keysToDelete = []

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const node = this.buckets[i]

        while (node) {
          if (node.numberOfKeysAtTimeOfInsert > k) {
            keysToDelete.push(node.key)
          }

          node = node.next
        }
      }
    }

    for (let key of keysToDelete) {
      this.delete(key)
    }

    if (
      this.numberOfBuckets > 1 &&
      this.getLoadFactor() <= this.averageListSize / 4
    ) {
      this.resize(this.numberOfBuckets / 2)
      this.lgM--
    }
  }

  keys() {
    const keys = []

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        let node = this.buckets[i]

        while (node) {
          keys.push(node.key)
          node = node.next
        }
      }
    }

    return keys.sort((a, b) => a.compareTo(b))
  }
}

const st = new SeparateChainningHashTableLinkedListWithDeleteK(10, 2)

st.put('a', 1)
st.put('b', 2)
st.put('c', 3)
st.put('d', 4)

// console.log(st)
console.log(st.get('c'))
st.delete('c')
console.log(st.keys())
