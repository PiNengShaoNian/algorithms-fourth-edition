const Key = require('../lib/Key')

class Node {
  constructor(key, value, next) {
    this.key = key
    this.value = value
    this.next = next
  }
}

class SequentialSearchSymbolTable {
  size = 0
  size() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  contains(key) {
    return this.get(key) !== null
  }

  get(key) {
    key = new Key(key)
    for (let node = this.first; node; node = node.next) {
      if (key.equals(node.key)) {
        return node.value
      }
    }

    return null
  }

  put(key, value) {
    key = new Key(key)
    for (let node = this.first; node; node = node.next) {
      if (Key.equals(node.key)) {
        node.value = value
        return
      }
    }

    this.first = new Node(key, value, this.first)
    this.size++
  }

  delete(key) {
    key = new Key(key)
    if (this.first.key.equals(key)) {
      this.first = this.first.next
      this.size--
      return
    }

    for (let node = this.first; node; node = node.next) {
      if (node.next && node.next.key.equals(key)) {
        node.next = node.next.next
        this.size--
        return
      }
    }
  }

  keys() {
    const keys = []
    for (let node = this.first; node; node = node.next) {
      keys.push(node.key)
    }

    return keys
  }
}

class SeparateChainingHashTableDoubleProbing {
  constructor(initialSize = 997, averageListSize = 5) {
    this.size = initialSize
    this.averageListSize = averageListSize
    this.symbolTable = Array.from(
      {
        length: initialSize,
      },
      () => new SequentialSearchSymbolTable()
    )
    this.keysSize = 0
  }

  size() {
    return this.keysSize
  }

  isEmpty() {
    return this.keysSize === 0
  }

  getLoadFactor() {
    return this.keysSize / this.size
  }

  contains(key) {
    if (!key) {
      throw new Error('Argument to contains() cannot be null')
    }

    key = new Key(key)

    return this.get(key) !== null
  }

  hash1(key) {
    key = new Key(key)
    let hash = key.hashCode() & 0x7fffffff
    hash = (11 * hash) % 0x7fffffff
    return hash % this.size
  }

  hash2(key) {
    key = new Key(key)
    let hash = key.hashCode() & 0x7fffffff
    hash = (11 * hash) & 0x7fffffff
    return hash % this.size
  }

  keys() {
    const keys = []
    for (let sequentialSearchST of this.symbolTable) {
      for (let key of sequentialSearchST.keys()) {
        keys.push(key)
      }
    }

    return keys
  }

  resize(newSize) {
    const separateChainingHashTableDoubleProbing = new SeparateChainingHashTableDoubleProbing(
      newSize
    )

    for (let key of this.keys()) {
      separateChainingHashTableDoubleProbing.put(key, this.get(key))
    }

    this.symbolTable = separateChainingHashTableDoubleProbing.symbolTable
    this.size = separateChainingHashTableDoubleProbing.size
    this.keysSize = separateChainingHashTableDoubleProbing.keysSize
  }

  get(key) {
    if (!key) {
      throw new Error('Argument to get() cannot be null')
    }
    key = new Key(key)
    const hash1 = this.hash1(key)
    const hash2 = this.hash2(key)

    let value
    if (this.symbolTable[hash1].size <= this.symbolTable[hash2].size) {
      value = this.symbolTable[hash1].get(key)

      if (value === null && hash1 !== hash2) {
        value = this.symbolTable[hash2].get(key)
      }
    } else {
      value = this.symbolTable[hash2].get(key)
      if (value === null) {
        value = this.symbolTable[hash1].get(key)
      }
    }

    return value
  }

  put(key, value) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    if (value === null) {
      this.delete(key)
      return
    }

    key = new Key(key)

    const containsKey = this.contains(key)

    const hash1 = this.hash1(key)
    const hash2 = this.hash2(key)

    if (!containsKey) {
      this.keysSize++

      if (this.symbolTable[hash1].size <= this.symbolTable[hash2].size) {
        this.symbolTable[hash1].put(key, value)
      } else {
        this.symbolTable[hash2].put(key, value)
      }
    } else {
      let isInList1 = false

      for (let keyInList1 of this.symbolTable[hash1].keys()) {
        if (keyInList1.equals(key)) {
          isInList1 = true
          break
        }
      }

      if (isInList1) {
        this.symbolTable[hash1].put(key, value)
      } else {
        this.symbolTable[hash2].put(key, value)
      }
    }

    if (this.getLoadFactor() > this.averageListSize) {
      this.resize(this.size * 2)
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

    this.keysSize--

    const hash1 = this.hash1(key)
    const hash2 = this.hash2(key)

    if (
      (!this.symbolTable[hash1].isEmpty() &&
        this.symbolTable[hash1].size <= this.symbolTable[hash2].size) ||
      this.symbolTable[hash2].isEmpty()
    ) {
      const symbolTableSize = this.symbolTable[hash1].size
      this.symbolTable[hash1].delete(key)

      if (symbolTableSize === this.symbolTable[hash1].size) {
        this.symbolTable[hash2].delete(key)
      }
    } else {
      const symbolTableSize = this.symbolTable[hash2].size

      this.symbolTable[hash2].delete(key)

      if (symbolTableSize === this.symbolTable[hash2].size) {
        this.symbolTable[hash1].delete(key)
      }
    }

    if (this.size > 1 && this.getLoadFactor() <= this.averageListSize / 4) {
      this.resize(this.size / 2)
    }
  }
}

const st = new SeparateChainingHashTableDoubleProbing()
st.put('a', 1)
st.put('b', 2)
st.put('c', 3)

console.log(st)
console.log(st.get('c'))
console.log(st.delete('c'))
console.log(st.keys())
