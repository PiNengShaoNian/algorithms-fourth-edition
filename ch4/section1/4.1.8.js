const WeightedQuickUnion = require('../../lib/WeightedQuickUnion')
const Graph = require('../../lib/Graph')

class SearchUnionFind {
  constructor(graph, sourceVertex) {
    this.weightedQuickUnion = new WeightedQuickUnion(graph.vertices())

    this.sourceVertex = sourceVertex

    debugger
    for (let vertex = 0; vertex < graph.vertices(); vertex++) {
      for (let neighbor of graph.adjacent(vertex)) {
        this.weightedQuickUnion.union(vertex, neighbor)
      }
    }
  }

  marked(vertex) {
    return this.weightedQuickUnion.connected(this.sourceVertex, vertex)
  }

  count() {
    const sourceVertexLeader = this.weightedQuickUnion.find(this.sourceVertex)

    return this.weightedQuickUnion.getSizes()[sourceVertexLeader]
  }
}

const tinyG = `13
13
0 5
4 3
0 1
9 12
6 4
5 4
0 2
11 12
9 10
0 6
7 8
9 11
5 3`

const [V, E, ...lines] = tinyG.split(/\n/)

const graph = new Graph(V, E, lines)

const searchUnionFind = new SearchUnionFind(graph, 0)

console.log(searchUnionFind.weightedQuickUnion)
console.log(searchUnionFind.count())
