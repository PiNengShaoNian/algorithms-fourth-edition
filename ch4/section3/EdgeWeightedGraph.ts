import Edge from './Edge'
import LinkedList from '../../lib/LinkedList'

class EdgeWeightedGraph {
  private _E: number = 0
  private _adj: LinkedList<Edge>[]
  constructor(private _V: number) {
    this._adj = Array.from({ length: _V }, () => new LinkedList())
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  addEdge(e: Edge) {
    const v = e.either()
    const w = e.other(v)

    this._adj[v].addFirst(e)
    this._adj[w].addFirst(e)
    this._E++
  }

  adj(v: number): LinkedList<Edge> {
    return this._adj[v]
  }

  edges(): Edge[] {
    const res = []

    for (let i = 0; i < this.V(); i++) {
      for (const e of this.adj(i)) {
        res.push(e)
      }
    }

    return res
  }
}

export default EdgeWeightedGraph
