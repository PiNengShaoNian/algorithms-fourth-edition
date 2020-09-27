const Key = require('../lib/Key')

class LinearProbingHashST {
  M = 16
  N = 0
  constructor() {
    this.keys = []
    this.vals = []
  }

  hash(key) {
    return (key.hashCode() & 0x7fffffff) % this.M
  }

  put(key, val) {
    key = new Key(key)
    let i
    for (i = this.hash(key); this.keys[i]; i = (i + 1) % this.M) {
      if (key.equals(this.keys[i])) {
        this.vals[i] = val
        return
      }
    }

    this.keys[i] = key
    this.vals[i] = val
    this.N++
  }

  get(key) {
    key = new Key(key)

    let i
    for (i = this.hash(key); this.keys[i]; i = (i + 1) % this.M) {
      if (key.equals(this.keys[i])) return this.vals[i]
    }

    return null
  }

  contains(key) {
    key = new Key(key)
    for (let i = this.hash(); this.keys[i]; i = (i + 1) % this.M) {
      if (key.equals(this.keys[i])) return true
    }

    return false
  }

  delete(key) {
    if (!this.contains(key)) return

    key = new Key(key)
    let i = this.hash(key)
    while (this.keys[i]) {
      if (this.keys[i].equals(key)) break

      i = (i + 1) % this.M
    }

    this.keys[i] = null
    this.vals[i] = null

    i = (i + 1) % this.M
    while (this.keys[i]) {
      const keytoRedo = this.keys[i]
      const valtoRedo = this.vals[i]

      this.keys[i] = null
      this.vals[i] = null
      this.N--

      this.put(keytoRedo.key, valtoRedo)
      i = (i + 1) % this.M
    }

    this.N--
  }
}

const st = new LinearProbingHashST()
st.put('a', 1)
st.put('b', 2)
st.put('c', 3)
st.put('d', 4)
st.put('e', 6)
st.put('f', 7)

console.log(st)
console.log(st.get('e'))
