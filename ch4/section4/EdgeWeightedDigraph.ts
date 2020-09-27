import LinkedList from '../../lib/LinkedList'
import DirectedEdge from './DirectedEdge'

class EdgeWeightedDigraph {
  private _V: number
  private _E: number
  private _adj: LinkedList<DirectedEdge>[]

  constructor(V: number) {
    this._V = V

    this._E = 0

    this._adj = Array.from({ length: V }, () => new LinkedList())
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  addEdge(e: DirectedEdge) {
    this._adj[e.from()].addFirst(e)
    this._E++
  }

  adj(v: number) {
    return this._adj[v]
  }

  edges() {
    const res = []

    for (let vertex = 0; vertex < this.V(); vertex++) {
      for (const e of this._adj[vertex]) {
        res.push(e)
      }
    }

    return res
  }
}

export default EdgeWeightedDigraph
