import DirectedEdge from './DirectedEdge'

class EdgeWeightedDigraphAdjacencyMatrix {
  private _vertices: number
  private edges: number
  private _adjacent: number[][]

  constructor(vertices: number) {
    this._vertices = vertices
    this.edges = 0

    this._adjacent = Array.from({ length: vertices }, () =>
      Array.from({ length: vertices }, () => Infinity)
    )
  }

  vertices() {
    return this._vertices
  }

  edgesCount() {
    return this.edges
  }

  addEdge(edge: DirectedEdge) {
    const fromVertex = edge.from()
    const toVertex = edge.to()

    if (this.hasEdge(fromVertex, toVertex)) {
      return
    }

    this._adjacent[fromVertex][toVertex] = edge.weight()
    this.edges++
  }

  hasEdge(vertex1: number, vertex2: number) {
    return this._adjacent[vertex1][vertex2] < Infinity
  }

  adjacent(vertex: number): DirectedEdge[] {
    const adjacentEdges = []

    for (let i = 0; i < this.adjacent.length; i++) {
      if (this.hasEdge(vertex, i)) {
        adjacentEdges.push(
          new DirectedEdge(vertex, i, this._adjacent[vertex][i])
        )
      }
    }

    return adjacentEdges
  }
}
