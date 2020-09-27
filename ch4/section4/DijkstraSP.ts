import IndexMinPQ from '../../lib/IndexMinPQ'
import DirectedEdge from './DirectedEdge'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class DijkstraSP {
  private edgeTo: DirectedEdge[] = []
  private _distTo: number[]
  private pq: IndexMinPQ<number>

  constructor(G: EdgeWeightedDigraph, s: number) {
    this._distTo = Array.from({ length: G.V() }, () => Infinity)
    this.pq = new IndexMinPQ<number>(G.V())

    this._distTo[s] = 0

    this.pq.insert(s, 0)
    while (!this.pq.isEmpty()) {
      this.relax(G, this.pq.deleteMin())
    }
  }

  relax(G: EdgeWeightedDigraph, v: number) {
    for (const e of G.adj(v)) {
      const w = e.to()

      if (this._distTo[w] > e.weight() + this._distTo[v]) {
        this._distTo[w] = e.weight() + this._distTo[v]
        this.edgeTo[w] = e
        if (this.pq.contains(w)) this.pq.changeKey(w, this._distTo[w])
        else this.pq.insert(w, this._distTo[w])
      }
    }
  }

  distTo(vertex: number) {
    return this._distTo[vertex]
  }
}

export default DijkstraSP
