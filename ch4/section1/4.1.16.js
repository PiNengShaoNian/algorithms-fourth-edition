const BreadthFirstPaths = require('./BreadthFirstPaths')
const Graph = require('../../lib/Graph')
const ConnectedComponentsRecursiveDFS = require('./ConnectedComponentsRecursiveDFS.js')

class GraphProperties {
  constructor(graph) {
    const connectedComponents = new ConnectedComponentsRecursiveDFS(graph)
    this.eccentricities = Array.from({ length: graph.vertices() }, () => 0)

    if (connectedComponents.count() !== 1) {
      throw new Error('Graph must be connected')
    }

    this.getProperties(graph)
  }

  getProperties(graph) {
    this._wienerIndex = 0
    this._diameter = 0
    this._radius = Number.MAX_SAFE_INTEGER
    this._center = 0
    this._girth = Number.MAX_SAFE_INTEGER
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      const breadthFirstPaths = new BreadthFirstPaths(graph, vertex)

      for (let otherVertex = 0; otherVertex < graph.vertices(); otherVertex++) {
        if (otherVertex === vertex) {
          continue
        }

        let shortestDistanceFromOtherVertex = breadthFirstPaths.distTo(
          otherVertex
        )
        this._wienerIndex += shortestDistanceFromOtherVertex

        this.eccentricities[vertex] = Math.max(
          this.eccentricities[vertex],
          shortestDistanceFromOtherVertex
        )
      }

      if (this.eccentricities[vertex] > this._diameter) {
        this._diameter = this.eccentricities[vertex]
      }

      if (this.eccentricities[vertex] < this._radius) {
        this._radius = this.eccentricities[vertex]
        this._center = vertex
      }
    }

    this.computeGirth(graph)
  }

  computeGirth(graph) {
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      const shortestCycle = this.bfsToGetShortestCycle(graph, vertex)
      this._girth = Math.min(this._girth, shortestCycle)
    }
  }

  bfsToGetShortestCycle(graph, sourceVertex) {
    let shortestCycle = Number.MAX_SAFE_INTEGER

    const distTo = []
    const edgeTo = []

    distTo[sourceVertex] = 0

    const breadthFirstPaths = new BreadthFirstPaths(graph, sourceVertex)

    for (let otherVertex = 0; otherVertex < graph.vertices(); otherVertex++) {
      if (otherVertex === sourceVertex) {
        continue
      }

      distTo[otherVertex] = breadthFirstPaths.distTo(otherVertex)
      edgeTo[otherVertex] = breadthFirstPaths.edgeTo(otherVertex)
    }

    const queue = []
    const visited = []

    visited[sourceVertex] = true

    queue.push(sourceVertex)

    while (queue.length) {
      const currentVertex = queue.shift()
      for (const neighbor of graph.adjacent(currentVertex)) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        } else if (neighbor !== edgeTo[currentVertex]) {
          const cycleLength = distTo[currentVertex] + distTo[neighbor] + 1
          shortestCycle = Math.min(shortestCycle, cycleLength)
        }
      }
    }

    return shortestCycle
  }

  wienerIndex() {
    return this._wienerIndex
  }

  diameter() {
    return this._diameter
  }

  radius() {
    return this._radius
  }

  center() {
    return this._center
  }

  girth() {
    return this._girth
  }
}

// const graph = new Graph(11, 10, [
//   '0 1',
//   '1 2',
//   '2 3',
//   '3 4',
//   '4 5',
//   '5 6',
//   '6 7',
//   '7 8',
//   '8 9',
//   '9 10',
// ])

// const graphProperties = new GraphProperties(graph)
// console.log({
//   diameter: graphProperties.diameter(),
//   radius: graphProperties.radius(),
//   center: graphProperties.center(),
// })

const graph1 = new Graph(6, 9, [
  '2 3',
  '0 1',
  '3 1',
  '5 3',
  '2 0',
  '1 2',
  '4 2',
  '4 5',
  '4 0',
])
const graph2 = new Graph(4, 4, ['0 1', '1 0', '1 2', '2 3'])
const graphProperties1 = new GraphProperties(graph1)
const graphProperties2 = new GraphProperties(graph2)

console.log({
  girth1: graphProperties1.girth(),
  girth2: graphProperties2.girth(),
})
