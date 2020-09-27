const BinarySearchST = require('./3.2.js')

const words = require('fs')
  .readFileSync(__dirname + '/tale.txt')
  .toString()
  .split(/\s+/)

class Key {
  constructor(key) {
    this.key = key
  }

  compareTo(that) {
    const min = Math.min(that.key.length, this.key.length)

    for (let i = 0; i < min; i++) {
      if (this.key[i] < that.key[i]) return -1
      else if (this.key[i] > that.key[i]) return 1
    }

    return this.key.length - that.key.length
  }
}

const bs = new BinarySearchST()

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 10) {
    const key = new Key(words[i])
    if (!bs.get(key)) {
      bs.put(key, 1)
    } else bs.put(key, bs.get(key) + 1)
  }
}

console.log(bs)
