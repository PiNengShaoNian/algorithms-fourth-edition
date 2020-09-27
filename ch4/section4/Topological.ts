import DepthFirstOrder from './DepthFirstOrder'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'
import EdgeWeightedDirectedCycle from './EdgeWeightedDirectedCycle'

class Topological {
  private topologicalOrder: Iterable<number> | null = null

  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    const cycleFinder = new EdgeWeightedDirectedCycle(edgeWeightedDigraph)

    if (!cycleFinder.hasCycle()) {
      const depthFirstOrder = new DepthFirstOrder(edgeWeightedDigraph)

      this.topologicalOrder = depthFirstOrder.reversePostOrder()
    }
  }

  order() {
    return this.topologicalOrder
  }

  isDAG() {
    return !!this.topologicalOrder
  }
}
