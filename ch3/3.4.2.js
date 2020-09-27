const Key = require('../lib/Key')

class Node {
  constructor(key, value, next) {
    this.key = key
    this.value = value
    this.next = next
  }
}

class SeparateChainningHashTableLinkedList {
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

  constructor(numberOfBuckets = 50, averageListSize = 5) {
    this.keysSize = 0
    this.numberOfBuckets = numberOfBuckets
    this.buckets = Array.from({ length: numberOfBuckets }, () => null)

    this.averageListSize = averageListSize

    this.lgM = Math.floor(Math.log(numberOfBuckets) / Math.log(2))
  }

  hash(key) {
    let hash = new Key(key).hashCode() & 0x7fffffff

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

    return !!this.get(key)
  }

  resize(newBucketSize) {
    const tempBuckets = this.buckets
    this.buckets = Array.from({ length: newBucketSize }, () => null)
    this.numberOfBuckets = newBucketSize
    this.keysSize = 0

    for (let node of tempBuckets) {
      while (node) {
        this.put(node.key.key, node.value)
        node = node.next
      }
    }
  }

  get(key) {
    if (!key) {
      throw new Error('Argument to get() cannot be null')
    }

    let node = this.buckets[this.hash(key)]
    key = new Key(key)

    while (node) {
      if (node.key.equals(key)) return node.value

      node = node.next
    }

    return null
  }

  put(key, value) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

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
    }

    this.keysSize++
    node = this.buckets[bucketIndex]
    const newNode = new Node(new Key(key), value, node)
    this.buckets[bucketIndex] = newNode

    if (this.getLoadFactor() > this.averageListSize) {
      this.resize(this.numberOfBuckets * 2)
      this.lgM++
    }
  }

  delete(key) {
    if (!key) throw new Error('Argument to delete() cannot be null')

    if (this.isEmpty() || !this.contains(key)) return

    const bucketIndex = this.hash(key)
    const node = this.buckets[bucketIndex]
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
}

const st = new SeparateChainningHashTableLinkedList()

st.put('a', 1)
st.put('b', 2)
st.put('c', 3)
debugger
console.log(st.get('c'))
// console.log(st)
