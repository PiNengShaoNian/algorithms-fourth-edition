import IndexMinPQ from '../../lib/IndexMinPQ'
import LoopQueue from '../../lib/LoopQueue'
import MinPQ from '../../lib/MinPQ'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class LazyPrimMSTWeight {
  private marked: boolean[] = []
  private minimumSpanningTree: LoopQueue<Edge> = new LoopQueue()

  private priorityQueue: MinPQ<Edge> = new MinPQ()

  private _weight = 0

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    this.visit(edgeWeightedGraph, 0)

    while (!this.priorityQueue.isEmpty()) {
      const edge = this.priorityQueue.deleteMin()

      const vertex1 = edge.either()
      const vertex2 = edge.other(vertex1)

      if (this.marked[vertex1] && this.marked[vertex2]) {
        continue
      }

      this.minimumSpanningTree.enqueue(edge)
      this._weight += edge.weight()

      if (!this.marked[vertex1]) this.visit(edgeWeightedGraph, vertex1)

      if (!this.marked[vertex2]) this.visit(edgeWeightedGraph, vertex2)
    }
  }

  visit(edgeWeightedGraph: EdgeWeightedGraph, vertex: number) {
    this.marked[vertex] = true

    for (const edge of edgeWeightedGraph.adj(vertex)) {
      if (!this.marked[edge.other(vertex)]) {
        this.priorityQueue.insert(edge)
      }
    }
  }

  lazyWeight() {
    let weight = 0

    for (const edge of this.minimumSpanningTree) {
      weight += edge.weight()
    }

    return weight
  }
}

class PrimMSTWeight {
  private edgeTo: Edge[] = []
  private distTo: number[] = []
  private marked: boolean[] = []
  private priorityQueue: IndexMinPQ<number>
  private _weight = 0

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    this.distTo = Array.from({ length: edgeWeightedGraph.V() }, () => Infinity)

    this.priorityQueue = new IndexMinPQ(edgeWeightedGraph.V())

    this.distTo[0] = 0

    this.priorityQueue.insert(0, 0)

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
          this._weight -= this.distTo[otherVertex]
        }

        this._weight += edge.weight()

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
}
