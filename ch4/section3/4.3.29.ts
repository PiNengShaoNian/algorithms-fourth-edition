import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class PrimMSTDenseGraphs {
  private edgeTo: Edge[] = []
  private distTo: number[] = []
  private marked: boolean[] = []

  private _weight = 0

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    this.distTo = Array.from({ length: edgeWeightedGraph.V() }, () => Infinity)

    this.distTo[0] = 0

    let visitedVertices = 0
    let nextVertexToVisit = 0

    while (visitedVertices !== edgeWeightedGraph.V()) {
      nextVertexToVisit = this.visit(edgeWeightedGraph, nextVertexToVisit)
      visitedVertices++
    }
  }

  visit(edgeWeightedGraph: EdgeWeightedGraph, vertex: number): number {
    this.marked[vertex] = true

    for (const edge of edgeWeightedGraph.adj(vertex)) {
      const otherVertex = edge.other(vertex)

      if (this.marked[otherVertex]) continue

      if (edge.weight() < this.distTo[otherVertex]) {
        if (this.distTo[otherVertex] < Infinity) {
          this._weight -= this.distTo[otherVertex]
        }

        this._weight += edge.weight()

        this.edgeTo[otherVertex] = edge
        this.distTo[otherVertex] = edge.weight()
      }
    }

    let nextVertexToVisit = -1
    let minEdgeWeight = Infinity

    for (
      let vertexToVisit = 0;
      vertexToVisit < edgeWeightedGraph.V();
      vertexToVisit++
    ) {
      if (
        !this.marked[vertexToVisit] &&
        this.distTo[vertexToVisit] < minEdgeWeight
      ) {
        nextVertexToVisit = vertexToVisit
        minEdgeWeight = this.distTo[vertexToVisit]
      }
    }

    return nextVertexToVisit
  }
}
