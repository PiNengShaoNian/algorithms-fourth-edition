const SeparateChainningHashTable = require('../../lib/SeparateChainingHashTable')
const Graph = require('../../lib/Graph')

class SymbolGraph {
  constructor(graphStr, separator) {
    this.vertexNameToIdMap = new SeparateChainningHashTable()

    const lines = graphStr.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const vertexs = lines[i].split(separator)

      for (let j = 0; j < vertexs.length; j++) {
        if (!this.vertexNameToIdMap.contains(vertexs[j])) {
          this.vertexNameToIdMap.put(vertexs[j], this.vertexNameToIdMap.size())
        }
      }
    }

    this.keys = []

    for (const key of this.vertexNameToIdMap.keys()) {
      this.keys[this.vertexNameToIdMap.get(key)] = key
    }

    this.graph = new Graph(this.vertexNameToIdMap.size())

    for (let i = 0; i < lines.length; i++) {
      const vertexs = lines[i].split(separator)

      const vertex = this.vertexNameToIdMap.get(vertexs[0])
      for (let j = 1; j < vertexs.length; j++) {
        this.graph.addEdge(vertex, this.vertexNameToIdMap.get(vertexs[j]))
      }
    }
  }
}
