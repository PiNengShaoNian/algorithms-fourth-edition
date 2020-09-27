class DirectedCycle {
  marked = []
  edgeTo = []
  _cycle
  onStack = []

  constructor(G) {
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v)
      }
    }
  }

  dfs(G, v) {
    this.onStack[v] = true
    this.marked[v] = true

    for (let w of G.adj(v)) {
      if (this.hashCycle()) return
      else if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(G, w)
      } else if (this.onStack[w]) {
        this._cycle = []
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this._cycle.push(x)
        }

        this._cycle.push(w)
        this._cycle.push(v)
      }
    }

    this.onStack[v] = false
  }

  hashCycle() {
    return !!this._cycle
  }

  cycle() {
    return this._cycle
  }
}

module.exports = DirectedCycle
