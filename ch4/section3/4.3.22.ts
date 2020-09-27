import IndexMinPQ from '../../lib/IndexMinPQ'
import LoopQueue from '../../lib/LoopQueue'
import MinPQ from '../../lib/MinPQ'
import WeightedQuickUnion from '../../lib/WeightedQuickUnion'
import ConnectedComponentsEdgeWeightedGraph from './ConnectedComponentsEdgeWeightedGraph'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class PrimMinimumSpanningForest {
  private edgeTo: Edge[] = []
  private distTo: number[] = []

  private marked: boolean[] = []
  private priorityQueue: IndexMinPQ<number>
  private weight: number = 0

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    this.distTo = Array.from({ length: edgeWeightedGraph.V() }, () => Infinity)
    this.priorityQueue = new IndexMinPQ(edgeWeightedGraph.V())

    const connectedComponents = new ConnectedComponentsEdgeWeightedGraph(
      edgeWeightedGraph
    )

    for (
      let connectedComponent = 0;
      connectedComponent < connectedComponents.count();
      connectedComponent++
    ) {
      for (let vertex = 0; vertex < edgeWeightedGraph.V(); vertex++) {
        if (connectedComponents.id(vertex) === connectedComponent) {
        }
      }
    }
  }

  prim(edgeWeightedGraph: EdgeWeightedGraph, sourceVertex: number) {
    this.distTo[sourceVertex] = 0
    this.priorityQueue.insert(sourceVertex, 0)

    while (!this.priorityQueue.isEmpty()) {
      this.visit(edgeWeightedGraph, this.priorityQueue.deleteMin())
    }
  }

  visit(edgeWeightedGraph: EdgeWeightedGraph, vertex: number) {
    this.marked[vertex] = true

    for (const edge of edgeWeightedGraph.adj(vertex)) {
      const otherVertex = edge.other(vertex)

      if (this.marked[otherVertex]) continue

      if (edge.weight() < this.distTo[otherVertex]) {
        if (this.distTo[otherVertex] < Infinity) {
          this.weight -= this.distTo[otherVertex]
        }

        this.weight += edge.weight()

        this.edgeTo[otherVertex] = edge
        this.distTo[otherVertex] = edge.weight()

        if (this.priorityQueue.contains(otherVertex)) {
          this.priorityQueue.changeKey(otherVertex, this.distTo[otherVertex])
        } else {
          this.priorityQueue.insert(otherVertex, this.distTo[otherVertex])
        }
      }
    }
  }
  eagerWeight() {
    return this.weight
  }
}

class KruskalMinimumSpanningForest {
  private minimumSpanningForest: LoopQueue<Edge> = new LoopQueue()
  private weight: number = 0

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    const priorityQueue = new MinPQ<Edge>()

    for (const edge of edgeWeightedGraph.edges()) {
      priorityQueue.insert(edge)
    }

    const unionFind = new WeightedQuickUnion(edgeWeightedGraph.V())

    while (
      !priorityQueue.isEmpty() &&
      this.minimumSpanningForest.size() < edgeWeightedGraph.V() - 1
    ) {
      const edge = priorityQueue.deleteMin()

      const vertex1 = edge.either()
      const vertex2 = edge.other(vertex1)

      if (unionFind.connected(vertex1, vertex2)) continue

      unionFind.union(vertex2, vertex1)

      this.minimumSpanningForest.enqueue(edge)

      this.weight += edge.weight()
    }
  }
}
