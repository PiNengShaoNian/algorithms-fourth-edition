const Diagraph = require('./Digraph')

class DiagraphWithHasEdge extends Diagraph {
  hasEdge(vertex1, vertex2) {
    for (const neighbor of this.adj(vertex1))
      if (neighbor === vertex2) return true

    return false
  }
}
