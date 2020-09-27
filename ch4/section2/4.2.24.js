const DirectedCycle = require('./DirectedCycle')
const Topological = require('./Topological')

class HamiltonianPathInDAGs {
  hasHamiltonianPath(digraph) {
    const directedCycle = new DirectedCycle(digraph)

    if (directedCycle.hashCycle()) {
      throw new Error('Digraph is not a DAG')
    }

    const topoligical = new Topological(digraph)

    const topologicalOrder = []
    let arrayIndex = 0

    for (const vertex of topoligical.order()) {
      topologicalOrder[arrayIndex++] = vertex
    }

    for (let i = 0; i < topologicalOrder.length - 1; i++) {
      const hasEdgeToNextVertex = false

      for (let neighbor of digraph.adj(topologicalOrder[i])) {
        if (neighbor == topologicalOrder[i + 1]) {
          hasEdgeToNextVertex = true
          break
        }
      }

      if (!hasEdgeToNextVertex) {
        return false
      }
    }
    return true
  }
}
