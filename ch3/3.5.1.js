const RedBlackTopDown234Trees = require('../lib/BlackRedTree')
const SeparateChainningHashTable = require('../lib/SeparateChainingHashTable')

class Set {
  constructor() {
    this.set = new RedBlackTopDown234Trees()
  }

  isEmpty() {
    return this.set.isEmpty()
  }

  size() {
    return this.set.size()
  }

  contains(key) {
    return this.set.contains(key)
  }

  add(key) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    this.set.put(key, false)
  }

  delete(key) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    if (this.set.isEmpty() || !this.contains(key)) return

    this.set.delete(key)
  }

  keys() {
    return this.set.keys()
  }
}

class HashSet {
  constructor() {
    this.hashTable = new SeparateChainningHashTable(16, 5)
  }

  isEmpty() {
    return this.hashTable.isEmpty()
  }

  add(key) {
    this.hashTable.put(key, false)
  }

  delete(key) {
    this.hashTable.delete(key)
  }

  keys() {
    return this.hashTable.keys()
  }
}

// const set = new Set()

// set.add('a')
// set.add('b')
// set.add('c')

// console.log(set.keys())

const hashSet = new HashSet()

hashSet.add('a')
hashSet.add('b')
hashSet.add('c')
hashSet.add('c')
hashSet.add(1)
hashSet.add(2)
hashSet.add(3)
hashSet.add(3)
hashSet.add(3)
console.log(hashSet.keys())
