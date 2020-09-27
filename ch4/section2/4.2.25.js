const DirectedCycle = require('./DirectedCycle')
const Topological = require('./Topological')

class UniqueTopologicalOrdering {
  hasUniqueTopologicalOrdering(digraph) {
    const directedCycle = new DirectedCycle(digraph)

    if (directedCycle.hashCycle()) {
      throw new Error('Digraph is not a DAG')
    }

    const topological = new Topological(digraph)
    const topologicalOrder = []
    let arrayIndex = 0

    for (const vertex of topological.order()) {
      topologicalOrder[arrayIndex++] = vertex
    }

    for (let i = 0; i < topologicalOrder.length - 1; i++) {
      const hasEdgeToNextVertex = false

      for (const neighbor of digraph.adj(topologicalOrder[i])) {
        if (neighbor === topologicalOrder[i + 1]) {
          hasEdgeToNextVertex = true
          break
        }
      }

      if (!hasEdgeToNextVertex) return false
    }

    return true
  }
}
