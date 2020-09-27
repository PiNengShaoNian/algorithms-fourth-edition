const DirectedCycle = require('./DirectedCycle')
const DepthFirstOrder = require('./DepthFirstOrder')

class Topological {
  constructor(G) {
    const cycleFinder = new DirectedCycle(G)

    if (!cycleFinder.hashCycle()) {
      const dfs = new DepthFirstOrder(G)

      this._order = dfs.reversePost()
    }
  }

  order() {
    return this._order
  }

  isDAG() {
    return !!this._order
  }
}

module.exports = Topological
