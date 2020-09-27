import LoopQueue from '../../lib/LoopQueue'
import Edge from './Edge'
import EdgeWeightedCycle from './EdgeWeightedCycle'
import EdgeWeightedGraph from './EdgeWeightedGraph'
import EdgeWeightedGraphWithDelete from './EdgeWeightedGraphWithDelete'

class Vyssotsky {
  minimumSpanningTree(edgeWeightedGraph: EdgeWeightedGraph): LoopQueue<Edge> {
    const putativeTree = new EdgeWeightedGraphWithDelete(edgeWeightedGraph.V())

    for (const edge of edgeWeightedGraph.edges()) {
      putativeTree.addEdge(edge)

      const vertexToSearch = new Set<number>()
      vertexToSearch.add(edge.either())

      const edgeWeightedCycle = new EdgeWeightedCycle(edgeWeightedGraph)

      if (edgeWeightedCycle.hasCycle()) {
        const cycle = edgeWeightedCycle.cycle()

        let maxWeightEdge: Edge | null = null

        let maxWeight: number = -Infinity

        for (const edgeInCycle of cycle) {
          if (edgeInCycle.weight() > maxWeight) {
            maxWeight = edgeInCycle.weight()
            maxWeightEdge = edgeInCycle
          }
        }

        if (maxWeightEdge) putativeTree.deleteEdge(maxWeightEdge)
      }
    }

    const minimumSpanningTree = new LoopQueue<Edge>()

    for (const edge of putativeTree.edges()) {
      minimumSpanningTree.enqueue(edge)
    }

    return minimumSpanningTree
  }
}
