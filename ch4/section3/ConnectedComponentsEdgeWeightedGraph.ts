import EdgeWeightedGraph from './EdgeWeightedGraph'

class ConnectedComponentsEdgeWeightedGraph {
  private visited: boolean[] = []
  private _id: number[] = []
  private _count: number = 0

  constructor(graph: EdgeWeightedGraph) {
    for (let source = 0; source < graph.V(); source++) {
      if (!this.visited[source]) {
        this.dfs(graph, source)
        this._count++
      }
    }
  }

  dfs(gragh: EdgeWeightedGraph, vertex: number) {
    this.visited[vertex] = true
    this._id[vertex] = this._count

    for (const neighbor of gragh.adj(vertex)) {
      const neighborVertex = neighbor.other(vertex)

      if (!this.visited[neighborVertex]) {
        this.dfs(gragh, neighborVertex)
      }
    }
  }

  connected(vertex1: number, vertex2: number) {
    return this._id[vertex1] === this._id[vertex2]
  }

  id(vertex: number) {
    return this._id[vertex]
  }

  count() {
    return this._count
  }
}

export default ConnectedComponentsEdgeWeightedGraph
