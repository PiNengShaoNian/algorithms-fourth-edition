const Key = require('./Key')

class Node {
  constructor(key, val, next) {
    this.key = key
    this.val = val
    this.next = next
  }
}

class SequentialSearchST {
  n = 0
  first

  size() {
    return this.n
  }

  isEmpty() {
    return this.size() === 0
  }

  put(key, val) {
    key = new Key(key)
    if (val === null) {
      this.delete(key)
    }

    for (let x = this.first; x; x = x.next) {
      if (key.equals(x.key)) {
        x.val = val
        return
      }
    }

    this.first = new Node(key, val, this.first)
    this.n++
  }

  delete(key) {
    this.first = this._delete(this.first, key)
  }

  _delete(x, key) {
    if (!x) return null
    if (key.equals(x.key)) {
      this.n--
      return x.next
    }

    x.next = this._delete(x.next, key)
    return x
  }

  get(key) {
    key = new Key(key)
    for (let x = this.first; x; x = x.next) {
      if (key.equals(x.key)) {
        return x.val
      }
    }

    return null
  }
}

module.exports = SequentialSearchST
