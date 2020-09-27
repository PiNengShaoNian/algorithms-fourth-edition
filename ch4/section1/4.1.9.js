class DepthFirstSearchConnected {
  visited = []
  count = 0
  vertexThatCanBeRemoved

  graph
  sourceVertex

  constructor(graph, sourceVertex) {
    this.graph = graph
    this.sourceVertex = sourceVertex
  }

  findVertexThatCanBeRemoved() {
    this.dfs(this.graph, this.sourceVertex)

    return this.vertexThatCanBeRemoved
  }

  dfs(graph, vertex) {
    this.visited[vertex] = true

    this.count++
    let areAllNeighborsMarked = false
    for (const neighbor of graph.adjacent(vertex)) {
      if (!this.visited[neighbor]) {
        areAllNeighborsMarked = false
        this.dfs(graph, neighbor)
      }
    }

    if (areAllNeighborsMarked) {
      this.vertexThatCanBeRemoved = vertex
    }
  }
}
