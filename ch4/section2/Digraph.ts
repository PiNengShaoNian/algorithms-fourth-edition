import Bag from '../../lib/Bag'

class Digraph {
  private _V: number
  private _E: number
  private _adj: Bag<number>[]
  private indegrees: number[]
  private outdegrees: number[]

  constructor(v: number) {
    this._V = v
    this._E = 0

    this._adj = Array.from({ length: v }, () => new Bag())
    this.indegrees = Array.from({ length: v }, () => 0)
    this.outdegrees = Array.from({ length: v }, () => 0)
  }

  indegree(vertex: number): number {
    return this.indegrees[vertex]
  }

  outdegree(vertex: number): number {
    return this.outdegrees[vertex]
  }

  V(): number {
    return this._V
  }

  E(): number {
    return this._E
  }

  addEdge(v: number, w: number): void {
    this._adj[v].add(w)
    this._E++
    this.outdegrees[v]++
    this.indegrees[w]++
  }

  adj(v: number): Bag<number> {
    return this._adj[v]
  }

  reverse(): Digraph {
    const R = new Digraph(this._V)

    for (let v = 0; v < this._V; v++) {
      for (const w of this._adj[v]) {
        R.addEdge(w, v)
      }
    }

    return R
  }
}

export default Digraph
