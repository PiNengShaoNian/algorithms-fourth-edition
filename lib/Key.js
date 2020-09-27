const hash = require('./hash')

class Key {
  constructor(key) {
    if (key instanceof new.target) return key
    this.key = key
  }

  compareTo(that) {
    if (typeof this.key === 'number' && typeof that.key === 'number')
      return this.key - that.key

    let thisKey = this.key
    let thatKey = that.key

    if (
      (typeof that.key === 'number' && typeof this.key === 'string') ||
      (typeof this.key === 'number' && typeof that.key === 'string')
    ) {
      thatKey += ''
      thisKey += ''
    }

    const min = Math.min(thatKey.length, thisKey.length)

    for (let i = 0; i < min; i++) {
      if (thisKey[i] < thatKey[i]) return -1
      else if (thisKey[i] > thatKey[i]) return 1
    }

    return thisKey.length - thatKey.length
  }

  equals(that) {
    return this.key === that.key
  }

  hashCode() {
    return hash(this.key)
  }

  toString() {
    return this.key
  }

  valueOf() {
    return this.key
  }
}

module.exports = Key
