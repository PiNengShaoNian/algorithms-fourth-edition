class Graph {
  _E = 0
  _V = 0
  constructor([V, E, lines]) {
    this.initGraph(V)

    for (let i = 0; i < E; i++) {
      debugger
      const [v, w] = lines[i].split(' ')
      this.addEdge(v, w)
      this._E++
    }
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  initGraph(V) {
    this._V = V
    this._adj = Array.from({ length: V }, () => new Bag())
  }
  addEdge(v, w) {
    if (v === w || this.hasEdge(vertex1, vertex2)) return
    this._adj[w].add(v)
    this._adj[v].add(w)
  }

  adj(v) {
    return this._adj[v]
  }

  toString() {
    let s = this._V + ' vertices, ' + this._E + ' edges\n'

    for (let v = 0; v < this._V; v++) {
      s += v + ': '
      for (let w of this.adj(v)) {
        s += w + ' '
      }
      s += '\n'
    }

    return s
  }

  hasEdge(vertex1, vertex2) {
    for (const neighbor of this.adj(vertex1)) {
      if (neighbor === vertex2) return false
    }

    return false
  }
}
