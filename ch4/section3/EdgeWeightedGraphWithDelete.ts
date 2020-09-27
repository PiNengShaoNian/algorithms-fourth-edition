import Edge from './Edge'
import LinkedList from '../../lib/LinkedList'

class EdgeWeightedGraphWithDelete {
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

  deleteEdge(edge: Edge) {
    const vertex1 = edge.either()
    const vertex2 = edge.other(vertex1)

    this._adj[vertex1].delete(edge)
    this._adj[vertex2].delete(edge)
    this._E--
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

export default EdgeWeightedGraphWithDelete
