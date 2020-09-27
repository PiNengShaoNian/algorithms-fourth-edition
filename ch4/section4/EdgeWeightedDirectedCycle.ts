import ArrayStack from '../../lib/Stack'
import DirectedEdge from './DirectedEdge'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class EdgeWeightedDirectedCycle {
  private visited: boolean[] = []
  private edgeTo: DirectedEdge[] = []
  private _cycle: ArrayStack<DirectedEdge> | null = null

  private onStack: boolean[] = []

  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    for (let vertex = 0; vertex < edgeWeightedDigraph.V(); vertex++) {
      if (!this.visited[vertex]) {
        this.dfs(edgeWeightedDigraph, vertex)
      }
    }
  }

  dfs(edgeWeightedDigraph: EdgeWeightedDigraph, vertex: number) {
    this.onStack[vertex] = true
    this.visited[vertex] = true

    for (const edge of edgeWeightedDigraph.adj(vertex)) {
      const neighbor = edge.to()

      if (this.hasCycle()) {
        return
      } else if (!this.visited[neighbor]) {
        this.edgeTo[neighbor] = edge
        this.dfs(edgeWeightedDigraph, neighbor)
      } else if (this.onStack[neighbor]) {
        this._cycle = new ArrayStack()

        let edgeInCycle = edge

        while (edgeInCycle.from() !== neighbor) {
          this._cycle.push(edgeInCycle)
          edgeInCycle = this.edgeTo[edgeInCycle.from()]
        }
        this._cycle.push(edgeInCycle)
        return
      }
    }

    this.onStack[vertex] = false
  }

  hasCycle() {
    return !!this._cycle
  }

  cycle() {
    return this._cycle
  }
}

export default EdgeWeightedDirectedCycle
