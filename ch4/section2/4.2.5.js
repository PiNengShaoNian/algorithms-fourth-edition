const Diagraph = require('./Digraph')

class DiagraphNoParallelEdgesOrSelfLoops extends Diagraph {
  addEdge(vertex1, vertex2) {
    if (vertex1 === vertex2 || this.hasEdge(vertex1, vertex2)) return

    super.addEdge(vertex1, vertex2)
  }

  hasEdge(vertex1, vertex2) {
    for (const neighbor of this.adj(vertex1)) {
      if (neighbor === vertex2) {
        return true
      }
    }

    return false
  }
}

const diagraphNoParallelEdgesOrSelfLoops = new DiagraphNoParallelEdgesOrSelfLoops(
  5
)

diagraphNoParallelEdgesOrSelfLoops.addEdge(0, 1)
diagraphNoParallelEdgesOrSelfLoops.addEdge(1, 4)
diagraphNoParallelEdgesOrSelfLoops.addEdge(2, 3)

console.log(diagraphNoParallelEdgesOrSelfLoops.E())
