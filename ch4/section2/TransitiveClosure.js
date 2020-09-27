const DirectedDFS = require('./DirectedDFS')

class TransitiveClosure {
  all = []

  constructor(G) {
    for (let v = 0; v < G.V(); v++) {
      const dfs = new DirectedDFS()
      dfs.directedDFS(G, v)
      this.all[v] = dfs
    }
  }

  reachable(v, w) {
    return this.all[v].marked(w)
  }
}
