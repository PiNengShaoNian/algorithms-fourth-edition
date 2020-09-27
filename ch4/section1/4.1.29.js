class Edge {
  constructor(vertex1, vertex2) {
    this.vertex1 = vertex1
    this.vertex2 = vertex2
    isUsed = false
  }

  otherVertex(vertex) {
    if (vertex === this.vertex1) {
      return this.vertex2
    } else {
      return this.vertex1
    }
  }
}

class EulerCycle {
  getEulerCycle(graph) {
    if (graph.edges() === 0) {
      return []
    }

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (graph.degree(vertex) % 2 !== 0) {
        return null
      }
    }

    const adjacent = Array.from({ length: graph.vertices() }, () => [])
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      let selfLoops = 0

      for (const neighbor of graph.adjacent(vertex)) {
        if (vertex === neighbor) {
          if (selfLoops % 2 === 0) {
            const edge = new Edge(vertex, neighbor)
            adjacent[vertex].push(edge)
            adjacent[neighbor].push(edge)
          }

          selfLoops++
        } else {
          if (vertex < neighbor) {
            const edge = new Edge(vertex, neighbor)
            adjacent[vertex].push(edge)
            adjacent[neighbor].push(edge)
          }
        }
      }
    }

    const nonIsolatedVertex = nonIsolatedVertex(graph)
    const dfsStack = []
    dfsStack.push(nonIsolatedVertex)

    const eulerCycle = []

    while (dfsStack.length) {
      const vertex = dfsStack.pop()

      while (adjacent[vertex].length) {
        const edge = adjacent[vertex].shift()
        if (edge.isUsed) {
          continue
        }
        edge.isUsed = true

        dfsStack.push(vertex)
        vertex = edge.otherVertex(vertex)
      }

      eulerCycle.push(vertex)
    }

    if (eulerCycle.length === graph.edges + 1) {
      return eulerCycle
    } else {
      return null
    }
  }

  nonIsolatedVertex(graph) {
    const nonIsolatedVertex = -1

    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (graph.degree(vertex) > 0) {
        nonIsolatedVertex = vertex
        break
      }
    }

    return nonIsolatedVertex
  }
}
