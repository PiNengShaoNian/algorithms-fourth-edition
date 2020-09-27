import LoopQueue from '../../lib/LoopQueue'
import WeightedQuickUnion from '../../lib/WeightedQuickUnion'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

const check = (
  edgeWeightedGraph: EdgeWeightedGraph,
  proposedMinimumSpanningTree: LoopQueue<Edge>
) => {
  let unionFind = new WeightedQuickUnion(edgeWeightedGraph.V())

  for (const edge of proposedMinimumSpanningTree) {
    const vertex1 = edge.either()
    const vertex2 = edge.other(vertex1)

    if (unionFind.connected(vertex1, vertex2)) {
      return false
    }

    unionFind.union(vertex2, vertex1)

    if (unionFind.count() !== 1) return false

    for (const edgeInMST of proposedMinimumSpanningTree) {
      unionFind = new WeightedQuickUnion(edgeWeightedGraph.V())

      for (const edge of proposedMinimumSpanningTree) {
        if (edge !== edgeInMST) {
          const vertex1 = edge.either()
          const vertex2 = edge.other(vertex1)

          unionFind.union(vertex1, vertex2)
        }
      }

      for (const edge of edgeWeightedGraph.edges()) {
        const vertex1 = edge.either()
        const vertex2 = edge.other(vertex1)

        if (!unionFind.connected(vertex1, vertex2)) {
          if (edge.weight() < edgeInMST.weight()) {
            return false
          }
        }
      }
    }
  }

  return true
}
