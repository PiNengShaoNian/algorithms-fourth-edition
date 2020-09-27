const DepthFirstOrder = require('./DepthFirstOrder')

class KosarjuSCC {
  marked = []
  _id = []
  _count = 0

  constructor(G) {
    const depthFirstOrder = new DepthFirstOrder(G.reverse())

    for (const v of depthFirstOrder.reversePost()) {
      if (!this.marked[v]) {
        this.dfs(G, v)
        this._count++
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true
    this._id[v] = this._count

    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w)
      }
    }
  }

  strongly(v, w) {
    return this._id[v] === this._id[w]
  }

  id(v) {
    return this.id[v]
  }

  count() {
    return this._count
  }
}
