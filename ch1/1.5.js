class UF {
  id = []
  n

  constructor(N) {
    this.count = N
    for (let i = 0; i < N; i++) this.id[i] = i
  }

  get count() {
    return this.n
  }

  set count(v) {
    this.n = v
  }

  connected(p, q) {
    return this.find(p) === this.find(q)
  }

  find(p) {
    return this.id[p]
  }

  union(p, q) {
    const pId = this.find(p)
    const qId = this.find(q)
    if (pId === qId) return

    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pId) this.id[i] = qId
    }

    this.count--
  }
}

class quickUF {
  id = []
  n

  constructor(N) {
    this.count = N
    for (let i = 0; i < N; i++) this.id[i] = i
  }

  get count() {
    return this.n
  }

  set count(v) {
    this.n = v
  }

  connected(p, q) {
    return this.find(p) === this.find(q)
  }

  find(p) {
    while (p !== this.id[p]) p = this.id[p]
    return p
  }

  union(p, q) {
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    if (pRoot === qRoot) return

    id[pRoot] = qRoot

    this.count--
  }
}

class WeightedQuickUnionUF {
  id = []
  sz = []
  count

  constructor(N) {
    this.count = N
    for (let i = 0; i < N; i++) this.id[i] = i
    this.sz.length = N
    this.sz.fill(1)
  }

  connected(p, q) {
    return this.find(p) === this.find(q)
  }

  find(p) {
    while (p !== this.id[p]) p = this.id[p]

    return p
  }

  union(p, q) {
    const i = this.find(p)
    const j = this.find(q)
    if (i === j) return

    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j
      this.sz[j] += this.sz[i]
    } else {
      this.id[j] = this.id[i]
      this.sz[i] += this.sz[j]
    }

    this.count--
  }
}

const exec = (a) => {
  const N = +a[0]
  let i = 1
  const uf = new WeightedQuickUnionUF(N)
  for (; i < a.length; i++) {
    const [p, q] = a[i].split(' ').map((v) => +v)

    if (uf.connected(p, q)) continue
    uf.union(p, q)
    console.log(`${p} ${q}`)
  }

  console.log(uf.count + 'components')
  console.log(uf.id)
}

exec([10, '9 0', '3 4', '5 8', '7 2', '2 1', '5 7', '0 3', '4 2'])
