class DirectedDFS {
  _marked = []

  directedDFS(g, s) {
    this.dfs(g, s)
  }

  dfs(g, s) {
    this._marked[s] = true

    for (const w of g.adj(s)) {
      if (!this._marked[w]) {
        this.dfs(g, w)
      }
    }
  }

  sourcesDirectedDFS(g, sources) {
    this._marked = []

    for (const v of sources) {
      if (!this._marked[v]) {
        this.dfs(g, v)
      }
    }
  }
  marked(v) {
    return this._marked[v]
  }
}

module.exports = DirectedDFS
