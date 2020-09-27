import IndexMinPQ from '../../lib/IndexMinPQ'
import Edge from './Edge'
import EdgeWeightedGraph from './EdgeWeightedGraph'

class PrimMST {
  private edgeTo: Edge[] = []
  private distTo: number[]

  private marked: boolean[] = []
  private pq: IndexMinPQ<number>

  constructor(G: EdgeWeightedGraph) {
    this.pq = new IndexMinPQ(G.V())

    this.distTo = Array.from({ length: G.V() }, () => Infinity)
    this.distTo[0] = 0

    this.pq.insert(0, 0)

    while (!this.pq.isEmpty()) {
      debugger
      this.visit(G, this.pq.deleteMin())
    }
  }

  visit(G: EdgeWeightedGraph, v: number) {
    this.marked[v] = true
    for (const e of G.adj(v)) {
      const w = e.other(v)

      if (this.marked[w]) continue

      if (e.weight() < this.distTo[w]) {
        this.edgeTo[w] = e

        this.distTo[w] = e.weight()

        if (this.pq.contains(w)) this.pq.changeKey(w, this.distTo[w])
        else this.pq.insert(w, this.distTo[w])
      }
    }
  }

  edges() {
    return this.edgeTo
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
const lazyPrimMST = new PrimMST(graph)

// console.log(lazyPrimMST.edges());
for (const edge of lazyPrimMST.edges()) {
  console.log(edge)
}
