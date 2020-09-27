const Digraph = require('./Digraph')
const DirectedCycle = require('./DirectedCycle')

class LCAInDAG {
  constructor(digraph) {
    this.digraph = digraph
    this.maxDistances = Array.from({ length: digraph.V() }, () => -1)
    this.sources = new Set()

    const indegrees = Array.from({ length: digraph.V() }, () => 0)
    for (let vertex = 0; vertex < digraph.V(); vertex++) {
      for (const neighbor of digraph.adj(vertex)) {
        indegrees[neighbor]++
      }
    }

    for (let vertex = 0; vertex < digraph.V(); vertex++) {
      if (indegrees[vertex] === 0) {
        this.sources.add(vertex)
      }
    }

    for (const source of this.sources) {
      const distanceFromCurrentSource = Array.from(
        { length: digraph.V() },
        () => Infinity
      )

      const sourceDistanceQueue = []
      sourceDistanceQueue.push(source)
      distanceFromCurrentSource[source] = 0

      if (distanceFromCurrentSource[source] > this.maxDistances[source]) {
        this.maxDistances[source] = distanceFromCurrentSource[source]
      }

      while (sourceDistanceQueue.length) {
        const currentVertex = sourceDistanceQueue.shift()

        for (const neighbor of digraph.adj(currentVertex)) {
          distanceFromCurrentSource[neighbor] =
            distanceFromCurrentSource[currentVertex] + 1
          sourceDistanceQueue.push(neighbor)

          if (
            distanceFromCurrentSource[neighbor] > this.maxDistances[neighbor]
          ) {
            this.maxDistances[neighbor] = distanceFromCurrentSource[neighbor]
          }
        }
      }
    }
  }
  getLCA(vertex1, vertex2) {
    const directedCycle = new DirectedCycle(this.digraph)

    if (directedCycle.hashCycle()) {
      throw new Error('Digraph is not a DAG')
    }

    const reverseDigraph = this.digraph.reverse()

    const vertex1Ancestors = new Set()

    const queue = []
    queue.push(vertex1)

    while (queue.length) {
      const currentVertex = queue.shift()

      vertex1Ancestors.add(currentVertex)

      for (const neighbor of reverseDigraph.adj(currentVertex)) {
        queue.push(neighbor)
      }
    }

    const commonAncestors = new Set()

    queue.push(vertex2)

    while (queue.length) {
      const currentVertex = queue.shift()

      if (vertex1Ancestors.has(currentVertex)) {
        commonAncestors.add(currentVertex)
      }

      for (const neighbor of reverseDigraph.adj(currentVertex)) {
        queue.push(neighbor)
      }
    }

    let maxDistance = -1
    let lowestCommonAncestor = -1

    for (const commonAncestor of commonAncestors) {
      if (this.maxDistances[commonAncestor] > maxDistance) {
        maxDistance = this.maxDistances[commonAncestor]
        lowestCommonAncestor = commonAncestor
      }
    }

    return lowestCommonAncestor
  }
}

const digraph1 = new Digraph(5)
digraph1.addEdge(0, 1)
digraph1.addEdge(1, 2)
digraph1.addEdge(0, 3)
digraph1.addEdge(3, 4)

const lcaInDAG1 = new LCAInDAG(digraph1)
const lca1 = lcaInDAG1.getLCA(2, 4)
console.log(lca1)
