import IndexMinPQ from '../../lib/IndexMinPQ'
import DirectedEdge from './DirectedEdge'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class DijkstraSPSourceSink {
  private edgeTo: DirectedEdge[] = []

  private distTo: number[]
  private priorityQueue: IndexMinPQ<number>
  private target: number

  constructor(
    edgeWeightedDigraph: EdgeWeightedDigraph,
    source: number,
    target: number
  ) {
    this.priorityQueue = new IndexMinPQ(edgeWeightedDigraph.V())
    this.target = target
    this.distTo = Array.from(
      { length: edgeWeightedDigraph.V() },
      () => Infinity
    )
    this.priorityQueue.insert(source, 0)

    while (!this.priorityQueue.isEmpty()) {
      const vertexToRelax = this.priorityQueue.deleteMin()

      this.relax(edgeWeightedDigraph, vertexToRelax)

      if (vertexToRelax === target) {
        break
      }
    }
  }
  relax(edgeWeightedDigraph: EdgeWeightedDigraph, vertex: number) {
    for (const edge of edgeWeightedDigraph.adj(vertex)) {
      const neighbor = edge.to()

      if (this.distTo[neighbor] > this.distTo[vertex] + edge.weight()) {
        this.distTo[neighbor] = this.distTo[vertex] + edge.weight()

        if (this.priorityQueue.contains(neighbor)) {
          this.priorityQueue.changeKey(neighbor, this.distTo[neighbor])
        } else {
          this.priorityQueue.insert(neighbor, this.distTo[neighbor])
        }
      }
    }
  }
}
