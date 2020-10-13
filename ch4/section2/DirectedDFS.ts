import Digraph from './Digraph'

class DirectedDFS {
  private _marked: boolean[] = []

  constructor(g: Digraph, s: number | Iterable<number>) {
    if (typeof s === 'number') {
      this.dfs(g, s)
    } else {
      this.sourcesDirectedDFS(g, s)
    }
  }

  dfs(g: Digraph, s: number) {
    this._marked[s] = true

    for (const w of g.adj(s)) {
      if (!this._marked[w]) {
        this.dfs(g, w)
      }
    }
  }

  sourcesDirectedDFS(g: Digraph, sources: Iterable<number>) {
    this._marked = []

    for (const v of sources) {
      if (!this._marked[v]) {
        this.dfs(g, v)
      }
    }
  }
  marked(v: number) {
    return this._marked[v]
  }
}

export default DirectedDFS
