import ArrayStack from '../../lib/Stack'
import DepthFirstOrder from './DepthFirstOrder'
import DirectedEdge from './DirectedEdge'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class EdgeWeightedDirectedCycle {
  private visited: boolean[] = []
  private edgeTo: DirectedEdge[] = []
  private cycle: ArrayStack<DirectedEdge> | null = null
  private onStack: boolean[] = []

  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    for (let vertex = 0; vertex < edgeWeightedDigraph.V(); vertex++) {
      if (!this.visited[vertex]) {
        this.dfs(edgeWeightedDigraph, vertex)
      }
    }
  }

  dfs(edgeWeightedDigraph: EdgeWeightedDigraph, vertex: number) {
    this.onStack[vertex] = true
    this.visited[vertex] = true

    for (const edge of edgeWeightedDigraph.adj(vertex)) {
      const neighbor = edge.to()

      if (this.hasCycle()) return
      else if (!this.visited[neighbor]) {
        this.edgeTo[neighbor] = edge
        this.dfs(edgeWeightedDigraph, neighbor)
      } else if (this.onStack[neighbor]) {
        this.cycle = new ArrayStack()

        let edgeInCycle = edge

        while (edgeInCycle.from() != neighbor) {
          this.cycle.push(edgeInCycle)
          edgeInCycle = this.edgeTo[edgeInCycle.from()]
        }

        this.cycle.push(edgeInCycle)
        return
      }
    }
  }

  hasCycle() {
    return this.cycle !== null
  }
}

class Topological {
  private topologicalOrder: null | Iterable<number> = null

  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    const cycleFinder = new EdgeWeightedDirectedCycle(edgeWeightedDigraph)

    if (!cycleFinder.hasCycle()) {
      const depthFirstOrder = new DepthFirstOrder(edgeWeightedDigraph)

      this.topologicalOrder = depthFirstOrder.reversePostOrder()
    }
  }
}
