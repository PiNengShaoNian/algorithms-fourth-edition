class Degrees {
  constructor(diagraph) {
    this.indegrees = Array.from({ length: diagraph.V() }, () => 0)
    this.outdegrees = Array.from({ length: diagraph.V() }, () => 0)
    this._sources = []
    this._sinks = []
    this.isMap = true

    for (let vertex = 0; vertex < diagraph.vertices(); vertex++) {
      for (const neighbor of diagraph.adj(vertex)) {
        this.indegrees[neighbor]++
        this.outdegrees[vertex]++
      }
    }

    for (let vertex = 0; vertex < diagraph.V(); vertex++) {
      if (this.indegrees[vertex] === 0) {
        this._sources.push(vertex)
      }

      if (this.outdegrees[vertex] === 0) {
        this._sinks.push(vertex)
      }

      if (this.outdegrees[vertex] !== 1) {
        this.isMap = false
      }
    }
  }

  indegree(vertex) {
    return this.indegrees[vertex]
  }

  outdegree(vertex) {
    this.outdegrees[vertex]
  }

  sources() {
    return this._sources
  }

  sinks() {
    return this._sinks
  }
}
