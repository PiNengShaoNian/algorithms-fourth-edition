import Edge from './Edge'

class EdgeWeightedGraphAdjacencyMatrix {
  private _vertices: number
  private _edges: number
  private _adjacent: number[][]

  constructor(vertices: number) {
    this._vertices = vertices
    this._edges = 0

    this._adjacent = Array.from({ length: vertices }, () =>
      Array.from({ length: vertices }, () => Infinity)
    )
  }

  vertices() {
    return this._vertices
  }

  edgesCount() {
    return this._edges
  }

  addEdge(edge: Edge) {
    const vertex1 = edge.either()
    const vertex2 = edge.other(vertex1)

    const weight = edge.weight()

    if (this.hasEdge(vertex1, vertex2)) return

    this._adjacent[vertex2][vertex1] = weight
    this._adjacent[vertex1][vertex2] = weight

    this._edges++
  }

  adjacent(vertex: number) {
    const edges: Edge[] = []

    for (let i = 0; i < this._vertices; i++) {
      if (this.hasEdge(vertex, i)) {
        edges.push(new Edge(vertex, i, this._adjacent[vertex][i]))
      }
    }

    return edges
  }

  edges() {
    const res: Edge[] = []

    for (let vertex = 0; vertex < this._vertices; vertex++) {
      for (const edge of this.adjacent(vertex)) {
        if (edge.other(vertex) > vertex) {
          res.push(edge)
        }
      }
    }

    return res
  }

  hasEdge(vertex1: number, vertex2: number) {
    return Infinity > this._adjacent[vertex1][vertex2]
  }
}
