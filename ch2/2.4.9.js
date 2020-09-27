const Permutation = (str) => {
  if (str === '') return []
  const chars = [...str].sort()
  const set = new Set()
  const vis = []
  const temp = []
  permutation(0, temp, chars, set, vis)
  return Array.from(set)
}

const permutation = (index, temp, chars, set, vis) => {
  if (index === chars.length) return set.add(temp.join(''))
  for (let i = 0; i < chars.length; i++) {
    if (!vis[i]) {
      temp[index] = chars[i]
      vis[i] = true
      permutation(index + 1, temp, chars, set, vis)
      vis[i] = false
    }
  }
}

class MaxPQ {
  pq = []
  N = 0
  less(i, j) {
    return this.pq[i] < this.pq[j]
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  insert(v) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  deleteMax() {
    const max = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N + 1] = undefined
    this.sink(1)
    return max
  }

  sink(k) {
    let j
    while (2 * k < this.N) {
      j = 2 * k
      if (this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.exch(j, k)
      k = j
    }
  }

  swim(k) {
    let i
    while (k > 1 && (i = Math.floor(k / 2))) {
      if (this.less(i, k)) this.exch(i, k)
      k = i
    }
  }
}

const maxPQ = new MaxPQ()

const test = (N) => {
  const maxPQ = new MaxPQ()
  for (let i = 0; i < N; i++) {
    maxPQ.insert(Math.floor((N + 1) * Math.random()))
  }

  for (let i = 0; i < N; i++) {
    console.log(maxPQ.deleteMax())
  }
}

// test(100)
const set = new Set()
Permutation('AAABB').forEach((v) => {
  const maxPQ = new MaxPQ()
  ;[...v].forEach((v) => {
    maxPQ.insert(v)
  })
  set.add(maxPQ.pq.join(''))
})

console.log(set)
