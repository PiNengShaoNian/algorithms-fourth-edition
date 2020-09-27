const SeparateChainningHashTable = require('./SeparateChainingHashTable')

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

  contains(key) {
    return this.hashTable.contains(key)
  }
}

module.exports = HashSet
