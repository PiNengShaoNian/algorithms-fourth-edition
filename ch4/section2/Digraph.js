const Bag = require('../../lib/Bag')

class Digraph {
  constructor(v) {
    this._V = v
    this._E = 0

    this._adj = Array.from({ length: v }, () => new Bag())
    this.indegrees = Array.from({ length: v }, () => 0)
    this.outdegrees = Array.from({ length: v }, () => 0)
  }

  indegree(vertex) {
    return this.indegrees[vertex]
  }

  outdegree(vertex) {
    return this.outdegrees[vertex]
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  addEdge(v, w) {
    this._adj[v].add(w)
    this._E++
    this.outdegrees[v]++
    this.indegrees[w]++
  }

  adj(v) {
    return this._adj[v]
  }

  reverse() {
    const R = new Digraph(this._V)

    for (let v = 0; v < this._V; v++) {
      for (const w of this._adj[v]) {
        R.addEdge(w, v)
      }
    }

    return R
  }
}

module.exports = Digraph
