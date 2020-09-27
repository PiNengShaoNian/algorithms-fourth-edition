const Graph = require('../../lib/Graph')

class BreadthFirstPathsDistTo {
  visited = []
  edgeTo = []

  source
  _distTo = []

  constructor(graph, source) {
    this._distTo[source] = 0
    this.source = source
    this.bfs(graph, source)
  }

  bfs(graph, sourceVertex) {
    const queue = []

    this.visited[sourceVertex] = true

    queue.push(sourceVertex)

    while (queue.length) {
      const currentVertex = queue.shift()

      for (const neighbor of graph.adjacent(currentVertex)) {
        if (!this.visited[neighbor]) {
          this.visited[neighbor] = true

          this.edgeTo[neighbor] = currentVertex
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
    return this.edgeTo(vertex)
  }

  hasPathTo(vertex) {
    return this.visited[vertex]
  }

  pathTo(vertex) {
    if (!this.hasPathTo(vertex)) return null

    const path = []

    for (
      let currentVertex = vertex;
      currentVertex != this.source;
      currentVertex = this.edgeTo[currentVertex]
    ) {
      path.push(currentVertex)
    }

    path.push(this.source)
    return path
  }
}

const graph = new Graph(12, 16, [
  '8 4',
  '2 3',
  '1 11',
  '0 6',
  '3 6',
  '10 3',
  '7 11',
  '7 8',
  '11 8',
  '2 0',
  '6 2',
  '5 2',
  '5 10',
  '5 0',
  '8 1',
  '4 1',
])

const breadthFirstPathsDistTo = new BreadthFirstPathsDistTo(graph, 0)

console.log({
  0: breadthFirstPathsDistTo.distTo(0),
  6: breadthFirstPathsDistTo.distTo(6),
  10: breadthFirstPathsDistTo.distTo(10),
  9: breadthFirstPathsDistTo.distTo(9)
})
