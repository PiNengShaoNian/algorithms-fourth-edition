const SeparateChainningHashTable = require('../lib/SeparateChainingHashTable')

class SymbolTableWithRandomAccess {
  constructor() {
    this.separateChainingHashTable = new SeparateChainningHashTable()
    this.randomQueue = new RandomQueue()
  }
}
