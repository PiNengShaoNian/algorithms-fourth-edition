const Bag = require('../../lib/Bag')

class CopyGraph {
  vertices = 0
  edges = 0

  constructor(vertices) {
    this.vertices = vertices
    this.edges = 0

    this.adjacent = Array.from({ length: vertices }, () => new Bag())
  }

  copyGraph(graph) {
    if (!graph) {
      this.vertices - 0
    } else {
      this.vertices = graph.V()
      this.edges = graph.E()

      this.adjacent = Array.from({ length: this.vertices }, () => new Bag())

      for (let vertex = 0; vertex < graph.V(); vertex++) {
        const stack = []

        for (const neighbor of graph.adj(vertex)) {
          stack.push(neighbor)
        }

        for (const neighbor of stack) {
          this.adjacent[vertex].add(neighbor)
        }
      }
    }
  }
}
