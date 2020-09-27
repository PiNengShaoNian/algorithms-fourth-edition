import LoopQueue from '../../lib/LoopQueue'
import Edge from './Edge'
import MinPQ from '../../lib/MinPQ'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class LazyPrimMST {
  private marked: boolean[] = []
  private mst: LoopQueue<Edge> = new LoopQueue()
  private pq: MinPQ<Edge> = new MinPQ()

  constructor(G: EdgeWeightedGraph) {
    this.visit(G, 0)

    while (!this.pq.isEmpty()) {
      const e = this.pq.deleteMin()

      const v = e.either()
      const w = e.other(v)

      if (this.marked[v] && this.marked[w]) continue

      this.mst.enqueue(e)

      if (!this.marked[v]) this.visit(G, v)

      if (!this.marked[w]) this.visit(G, w)
    }
  }

  visit(G: EdgeWeightedGraph, v: number) {
    this.marked[v] = true

    for (const e of G.adj(v)) {
      if (!this.marked[e.other(v)]) {
        this.pq.insert(e)
      }
    }
  }

  edges() {
    return this.mst
  }
}

const graph = new EdgeWeightedGraph(8)

const edges = [
  '4 5 .35',
  '4 7 .37',
  '5 7 .28',
  '0 7 .16',
  '1 5 .32',
  '0 4 .38',
  '2 3 .17',
  '1 7 .19',
  '0 2 .26',
  '1 2 .36',
  '1 3 .29',
  '2 7 .34',
  '6 2 .40',
  '3 6 .52',
  '6 0 .58',
  '6 4 .93',
].map((v) => v.split(' ').map(Number))

for (let i = 0; i < edges.length; i++) {
  const [v, w, weight] = edges[i]

  graph.addEdge(new Edge(v, w, weight))
}
const lazyPrimMST = new LazyPrimMST(graph)

// console.log(lazyPrimMST.edges());
for (const edge of lazyPrimMST.edges()) {
  console.log(edge.toString())
}
