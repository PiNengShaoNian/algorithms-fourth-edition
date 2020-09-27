class ShortestAncestralPath {
  constructor(
    commonAncestor,
    shortestPathFromVertex1ToAncestor,
    shortestPathFromVertex2ToAncestor
  ) {
    this.commonAncestor = commonAncestor
    this.shortestPathFromVertex1ToAncestor = shortestPathFromVertex1ToAncestor
    this.shortestPathFromVertex2ToAncestor = shortestPathFromVertex2ToAncestor
  }
}

class BreadthFirstSearchToGetIntersection {
  constructor(digraph, source) {
    this.digraph = digraph
    this.edgeTo = Array.from({ length: digraph.V() }, () => -1)

    this.edgeTo[source] = source
    this.pendingVertices = []
    this.pendingVertices.push(source)
  }

  runStep(otherBFS) {
    let verticesToProcess = this.pendingVertices.length

    while (verticesToProcess > 0) {
      const vertex = this.pendingVertices.shift()

      for (let neighbor of this.digraph.adj(vertex)) {
        if (this.edgeTo[neighbor] !== -1) continue

        this.edgeTo[neighbor] = vertex

        if (otherBFS.edgeTo[neighbor] !== -1) {
          return neighbor
        }
        this.pendingVertices.push(neighbor)
      }
      verticesToProcess--
    }

    return -1
  }
}
