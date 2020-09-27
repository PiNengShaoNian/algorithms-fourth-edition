import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class EdgeWeightedCycle {
  private visited: boolean[] = []
  private edgeTo: Edge[] = []
  private _cycle: Edge[] = []
  private onStack: boolean[] = []
  private visitedEdges: Set<Edge> = new Set()
  private cycleFound: boolean = false

  constructor(edgeWeightedGraph: EdgeWeightedGraph) {
    for (let vertex = 0; vertex < edgeWeightedGraph.V(); vertex++) {
      if (this.cycleFound) break

      if (!this.visited[vertex]) {
        this.dfs(edgeWeightedGraph, vertex)
      }
    }
  }

  dfs(edgeWeightedGraph: EdgeWeightedGraph, vertex: number) {
    this.onStack[vertex] = true
    this.visited[vertex] = true

    for (const neighbor of edgeWeightedGraph.adj(vertex)) {
      if (this.visitedEdges.has(neighbor)) continue

      this.visitedEdges.add(neighbor)
      const neighborVertex = neighbor.other(vertex)

      if (this.cycleFound) return
      else if (!this.visited[neighborVertex]) {
        this.edgeTo[neighborVertex] = neighbor
        this.dfs(edgeWeightedGraph, neighborVertex)
      } else if (this.onStack[neighborVertex]) {
        this.cycleFound = true

        for (
          let currentVertex = vertex;
          currentVertex !== neighborVertex;
          currentVertex = this.edgeTo[currentVertex].other(currentVertex)
        ) {
          this._cycle.push(this.edgeTo[currentVertex])
        }

        this._cycle.push(neighbor)
      }
    }
  }

  hasCycle() {
    return this.cycleFound
  }

  cycle() {
    return this._cycle
  }
}

export default EdgeWeightedCycle
