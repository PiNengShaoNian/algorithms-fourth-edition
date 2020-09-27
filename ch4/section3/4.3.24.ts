import LoopQueue from '../../lib/LoopQueue'
import ConnectedComponentsEdgeWeightedGraph from './ConnectedComponentsEdgeWeightedGraph'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'
import EdgeWeightedGraphWithDelete from './EdgeWeightedGraphWithDelete'

class ReverseDeleteAlgorithm {
  minimumSpanningTreeWithReverseDelete(
    edgeWeightedGraph: EdgeWeightedGraphWithDelete
  ) {
    const edgesList = []

    for (const edge of edgeWeightedGraph.edges()) {
      edgesList.push(edge)
    }

    let edges = []

    for (const edge of edgeWeightedGraph.edges()) {
      edges.push(edge)
    }

    edges = edges.sort((a, b) => a.weight() - b.weight()).reverse()

    for (const edge of edges) {
      edgeWeightedGraph.deleteEdge(edge)

      const connectedComponentsEdgeWeightedGraph = new ConnectedComponentsEdgeWeightedGraph(
        (edgeWeightedGraph as unknown) as EdgeWeightedGraph
      )

      if (connectedComponentsEdgeWeightedGraph.count() > 1) {
        edgeWeightedGraph.addEdge(edge)
      }
    }

    const minimumSpanningTree = new LoopQueue<Edge>()

    for (const edge of edgeWeightedGraph.edges()) {
      minimumSpanningTree.enqueue(edge)
    }

    return minimumSpanningTree
  }
}
