const DirectedCycle = require('./DirectedCycle')

class CheckTopologicalOrder {
  isTopologicalOrder(diagraph, topologicalOrder) {
    const directedCycle = new DirectedCycle(diagraph)

    if (directedCycle.hashCycle()) {
      throw new Error('Diagraph, is not a DAG')
    }

    if (topologicalOrder.length !== diagraph.V()) {
      return false
    }

    const visited = []

    for (let i = topologicalOrder.length - 1; i >= 0; i--) {
      const vertex = topologicalOrder[i]

      if (visited[vertex]) return false

      visited[vertex] = true

      for (const neighbor of diagraph.adj(vertex)) {
        if (!visited[neighbor]) return false
      }
    }

    return true
  }
}
