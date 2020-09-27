class Edge {
  constructor(vertex1, vertex2) {
    this.vertex1 = vertex1
    this.vertex2 = vertex2
  }
}

class TwoEdgeConnectivity {
  findBridges(graph) {
    const bridges = []
    this.low = Array.from({ length: graph.vertices() }, () => -1)
    this.time = Array.from({ length: graph.vertices() }, () => -1)
    this.count = 0
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      if (this.time[vertex] === -1) {
        this.dfs(graph, vertex, vertex, bridges)
      }
    }

    return bridges
  }

  dfs(graph, currentVertex, sourceVertex, bridges) {
    this.time[currentVertex] = this.count
    this.low[currentVertex] = this.count
    this.count++

    for (const neighbor of graph.adjacent(currentVertex)) {
      if (this.time[neighbor] === -1) {
        this.dfs(graph, neighbor, currentVertex, bridges)

        this.low[currentVertex] = Math.min(
          this.low[currentVertex],
          this.low[neighbor]
        )

        if (this.low[neighbor] === this.time[neighbor]) {
          bridges.push(new Edge(currentVertex, neighbor))
        }
      } else if (neighbor != sourceVertex) {
        this.low[currentVertex] = Math.min(
          this.low[currentVertex],
          this.time[neighbor]
        )
      }
    }
  }
}
