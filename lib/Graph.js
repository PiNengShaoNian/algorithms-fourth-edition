const Bag = require('./Bag')

class Graph {
  _vertices
  _edges
  _adjacent

  constructor(vertices, edges, lines) {
    this._vertices = +vertices
    this._edges = 0
    this._adjacent = Array.from({ length: vertices }, () => new Bag())

    if (edges !== undefined) {
      for (let i = 0; i < edges; i++) {
        const [vertex1, vertex2] = lines[i].split(' ')
        this.addEdge(+vertex1, +vertex2)
      }
    }
  }

  vertices() {
    return this._vertices
  }

  edges() {
    return this._edges
  }

  addEdge(vertex1, vertex2) {
    this._adjacent[vertex1].add(vertex2)
    this._adjacent[vertex2].add(vertex1)
    this._edges++
  }

  adjacent(vertex) {
    return this._adjacent[vertex]
  }

  degree(vertex) {
    return this._adjacent[vertex].size()
  }

  toString() {
    let str = ''

    for (let vertex = 0; vertex < this.vertices(); vertex++) {
      str += vertex + ': '

      for (const neighbor of this.adjacent(vertex)) {
        str += neighbor + ' '
      }
      str += '\n'
    }

    return str
  }
}

module.exports = Graph
