const SequentialSearchST = require('../lib/SequentialSearchST')
const Key = require('../lib/Key')

class SeparateChainningHashST {
  constructor(M) {
    this.M = M
    this.st = []

    for (let i = 0; i < M; i++) {
      this.st[i] = new SequentialSearchST()
    }
  }

  hash(key) {
    if (typeof key !== 'object') key = new Key(key)
    return (key.hashCode() & 0x7fffffff) % this.M
  }

  get(key) {
    this.st[this.hash(key)].get(key)
  }

  put(key, val) {
    this.st[this.hash(key)].put(key, val)
  }
}

const st = new SeparateChainningHashST(97)

st.put('a', 1)
st.put('b', 1)
st.put('c', 1)
st.put('d', 1)
st.put('e', 1)
st.put('f', 1)
st.put('g', 1)
st.put('h', 1)
st.put('i', 1)
st.put('f', 1)
console.log(st)
