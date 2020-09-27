const Key = require('../lib/Key')

class BinarySearchSet {
  constructor() {
    this.keys = []
    this.capacity = 0
  }

  size() {
    return this.capacity
  }

  isEmpty() {
    return this.capacity === 0
  }

  rank(key) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)

    let low = 0
    let high = this.size() - 1

    while (low <= high) {
      const middle = low + Math.floor((high - low) / 2)

      const compare = key.compareTo(this.keys[middle])

      if (compare < 0) {
        high = middle - 1
      } else if (compare > 0) low = middle + 1
      else return middle
    }

    return low
  }

  add(key) {
    if (!key) {
      throw new Error('Key cannot be null')
    }

    key = new Key(key)
    const rank = this.rank(key)

    if (rank < this.size() && this.keys[rank].compareTo(key) === 0) {
      this.keys[rank] = key
      return
    }

    for (let i = this.size(); i > rank; i--) {
      this.keys[i] = this.keys[i - 1]
    }

    this.keys[rank] = key
    this.capacity++
  }
}

const set = new BinarySearchSet()
set.add('a')
set.add('b')
set.add('c')
set.add(1)
set.add(2)
set.add(3)
console.log(set)
