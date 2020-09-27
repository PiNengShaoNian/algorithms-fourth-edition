import DirectedEdge from './DirectedEdge'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class SP {
  private _distTo: number[]
  private _edgeTo: DirectedEdge[] = []
  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    this._distTo = Array.from(
      { length: edgeWeightedDigraph.V() },
      () => Infinity
    )
  }
  distTo(v: number): number {
    return this._distTo[v]
  }

  hasPathTo(v: number) {
    return this._distTo[v] < Infinity
  }

  pathTo(v: number) {
    const paths = []

    for (let x = this._edgeTo[v]; x; x = this._edgeTo[x.from()]) {
      paths.push(x)
    }

    return paths
  }
}
