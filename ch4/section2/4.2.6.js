const Diagraph = require('./Digraph')

const assert = require('assert')

const testDiagraph = () => {
  const diagraph = new Diagraph(5)

  diagraph.addEdge(0, 1)
  diagraph.addEdge(0, 2)
  diagraph.addEdge(0, 3)
  diagraph.addEdge(1, 2)
  diagraph.addEdge(1, 4)
  diagraph.addEdge(2, 3)

  assert.equal(diagraph.V(), 5, '能正常返回顶点数')
  assert.equal(diagraph.E(), 6, '能正常返回边数')

  diagraph.addEdge(0, 4)

  assert.equal(diagraph.E(), 7, '能正常的添加边')

  console.log(diagraph)
}

testDiagraph()
