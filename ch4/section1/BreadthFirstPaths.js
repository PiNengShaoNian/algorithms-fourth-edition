class BreadthFirstPaths {
  visited = []
  _edgeTo = []
  _distTo = []
  constructor(graph, source) {
    this.source = source

    this._distTo[source] = 0

    this.bfs(graph, source)
  }

  bfs(graph, sourceVertex) {
    const queue = []

    this.visited[sourceVertex] = true

    queue.push(sourceVertex)

    while (queue.length) {
      const currentVertex = queue.shift()

      for (let neighbor of graph.adjacent(currentVertex)) {
        if (!this.visited[neighbor]) {
          this.visited[neighbor] = true

          this._edgeTo[neighbor] = currentVertex
          this._distTo[neighbor] = this._distTo[currentVertex] + 1

          queue.push(neighbor)
        }
      }
    }
  }

  distTo(vertex) {
    return this._distTo[vertex]
  }

  edgeTo(vertex) {
    return this._edgeTo[vertex]
  }

  hashPathTo(vertex) {
    return this.visited[vertex]
  }

  pathTo(vertex) {
    if (!this.hashPathTo(vertex)) {
      return null
    }

    const path = []

    for (
      let currentVertex = vertex;
      currentVertex !== this.source;
      currentVertex = this._edgeTo[currentVertex]
    ) {
      path.push(currentVertex)
    }

    path.push(this.source)

    return path
  }
}

module.exports = BreadthFirstPaths
