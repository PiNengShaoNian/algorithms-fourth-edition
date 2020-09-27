import LoopQueue from '../../lib/LoopQueue'
import ArrayStack from '../../lib/Stack'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

class DepthFirstOrder {
  private visited: boolean[] = []
  private _preOrder: LoopQueue<number> = new LoopQueue()
  private _postOrder: LoopQueue<number> = new LoopQueue()
  private _reversePostOrder: ArrayStack<number> = new ArrayStack()

  constructor(edgeWeightedDigraph: EdgeWeightedDigraph) {
    for (let vertex = 0; vertex < edgeWeightedDigraph.V(); vertex++) {
      if (!this.visited[vertex]) {
        this.dfs(edgeWeightedDigraph, vertex)
      }
    }
  }

  dfs(edgeWeightedDigraph: EdgeWeightedDigraph, vertex: number) {
    this._preOrder.enqueue(vertex)

    this.visited[vertex] = true

    for (const edge of edgeWeightedDigraph.adj(vertex)) {
      const neighbor = edge.to()

      if (!this.visited[neighbor]) {
        this.dfs(edgeWeightedDigraph, neighbor)
      }
    }

    this._postOrder.enqueue(vertex)

    this._reversePostOrder.push(vertex)
  }

  preOrder() {
    return this._preOrder
  }

  postOrder() {
    return this._postOrder
  }

  reversePostOrder() {
    return this._reversePostOrder
  }
}

export default DepthFirstOrder
