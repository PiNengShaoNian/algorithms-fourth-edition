class ConnectedComponentsRecursiveDFS {
  visited = []
  _id = []
  _count = 0

  constructor(graph) {
    for (let source = 0; source < graph.vertices(); source++) {
      if (!this.visited[source]) {
        this.dfs(graph, source)
        this._count++
      }
    }
  }

  dfs(graph, vertex) {
    this.visited[vertex] = true
    this._id[vertex] = this._count

    for (const neighbor of graph.adjacent(vertex)) {
      if (!this.visited[neighbor]) {
        this.dfs(graph, neighbor)
      }
    }
  }

  connected(vertex1, vertex2) {
    return this._id[vertex1] === this._id[vertex2]
  }

  id(vertex) {
    return this._id[vertex]
  }

  count() {
    return this._count
  }
}

module.exports = ConnectedComponentsRecursiveDFS
