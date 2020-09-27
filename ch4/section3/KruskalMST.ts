import LoopQueue from '../../lib/LoopQueue'
import MinPQ from '../../lib/MinPQ'
import WeightedQuickUnion from '../../lib/WeightedQuickUnion'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class KruskalMST {
  private mst: LoopQueue<Edge> = new LoopQueue()

  constructor(G: EdgeWeightedGraph) {
    const pq = new MinPQ<Edge>()
    for (const e of G.edges()) {
      pq.insert(e)
    }

    const uf = new WeightedQuickUnion(G.V())

    while (!pq.isEmpty() && this.mst.size() < G.V() - 1) {
      const e = pq.deleteMin()
      const v = e.either()
      const w = e.other(v)

      if (uf.connected(v, w)) continue

      uf.union(v, w)
      this.mst.enqueue(e)
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
const lazyPrimMST = new KruskalMST(graph)

// console.log(lazyPrimMST.edges());
for (const edge of lazyPrimMST.edges()) {
  console.log(edge)
}
