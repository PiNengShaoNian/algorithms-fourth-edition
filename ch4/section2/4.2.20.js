const Digraph = require('./Digraph')

class DirectedEulerianCycle {
  getDirectedEulerianCycle(digraph) {
    if (digraph.E() === 0) return []

    debugger

    for (let vertex = 0; vertex < digraph.V(); vertex++) {
      if (digraph.indegree(vertex) !== digraph.outdegree(vertex)) return null
    }

    const adjacent = Array.from({ length: digraph.V() }, (_, i) =>
      digraph.adj(i)
    )

    const nonIsolatedVertex = this.nonIsolatedVertex(digraph)

    const dfsStack = []
    dfsStack.push(nonIsolatedVertex)

    const eulerCycle = []

    while (dfsStack.length) {
      const vertex = dfsStack.pop()

      for (const neighbor of adjacent[vertex]) {
        dfsStack.push(neighbor)
      }

      adjacent[vertex] = []

      eulerCycle.push(vertex)
    }

    if (eulerCycle.length === digraph.E() + 1) {
      return eulerCycle
    } else return null
  }

  nonIsolatedVertex(digraph) {
    let nonIsolatedVertex = -1

    for (let vertex = 0; vertex < digraph.V(); vertex++) {
      if (digraph.outdegree(vertex) > 0) nonIsolatedVertex = vertex
    }

    return nonIsolatedVertex
  }
}

const directedEulerianCycle = new DirectedEulerianCycle()

const digraphWithDirectedEulerPath1 = new Digraph(4)

digraphWithDirectedEulerPath1.addEdge(0, 1)
digraphWithDirectedEulerPath1.addEdge(1, 2)
digraphWithDirectedEulerPath1.addEdge(2, 3)
digraphWithDirectedEulerPath1.addEdge(3, 0)
digraphWithDirectedEulerPath1.addEdge(3, 2)

const digraphWithDirectedEulerCycle1 = new Digraph(4)
digraphWithDirectedEulerCycle1.addEdge(0, 1)
digraphWithDirectedEulerCycle1.addEdge(1, 2)
digraphWithDirectedEulerCycle1.addEdge(2, 3)
digraphWithDirectedEulerCycle1.addEdge(3, 0)

debugger
console.log(
  directedEulerianCycle.getDirectedEulerianCycle(digraphWithDirectedEulerCycle1)
)
