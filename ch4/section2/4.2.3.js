const Bag = require('../../lib/Bag')

const copyDiagraph = (diagraph) => {
  if (!diagraph) return null

  const vertices = diagraph.vertices()
  const edges = diagraph.edges()
  const adjacent = Array.from({ length: vertices }, () => new Bag())

  for (let vertex = 0; vertex < diagraph.vertices(); vertex++) {
    const stack = []

    for (const neighbor of diagraph.adj(vertex)) {
      stack.push(neighbor)
    }

    for (const neighbor of stack) {
      adjacent[vertex].add(neighbor)
    }
  }
}
