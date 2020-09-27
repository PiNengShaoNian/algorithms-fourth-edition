const Bag = require('../../lib/Bag')

class Graph {
  _E = 0
  _V = 0
  constructor([V, E, lines]) {
    this.initGraph(V)

    for (let i = 0; i < E; i++) {
      debugger
      const [v, w] = lines[i].split(' ')
      this.addEdge(v, w)
      this._E++
    }
  }

  V() {
    return this._V
  }

  E() {
    return this._E
  }

  initGraph(V) {
    this._V = V
    this._adj = Array.from({ length: V }, () => new Bag())
  }
  addEdge(v, w) {
    debugger
    this._adj[w].add(v)
    this._adj[v].add(w)
  }

  adj(v) {
    return this._adj[v]
  }

  toString() {
    let s = this._V + ' vertices, ' + this._E + ' edges\n'

    for (let v = 0; v < this._V; v++) {
      s += v + ': '
      for (let w of this.adj(v)) {
        s += w + ' '
      }
      s += '\n'
    }

    return s
  }
}

class GraphUtil {
  static degree(G, v) {
    let degree = 0
    for (let w of G.adj(v)) degree++

    return degree
  }

  static maxDegree(G) {
    let max = 0
    for (let v = 0; v < G.V(); v++) {
      if (this.degree(G, v) > max) {
        max = this.degree(G, v)
      }
    }

    return max
  }

  static numberOfSelfLoops(G) {
    let count = 0
    for (let v = 0; v < G.V(); v++) {
      for (let w of G.adj(v)) {
        if (w === v) count++
      }
    }

    return count / 2
  }
}

class DepthFirstSearch {
  constructor(G, s) {
    this._marked = []
    this._count = 0
    this.dfs(G, s)
  }

  count() {
    return this._count
  }

  dfs(G, v) {
    this._marked[v] = true

    this._count++

    for (const w of G.adj(v)) {
      if (!this._marked[w]) {
        this.dfs(G, w)
      }
    }
  }

  marked(v) {
    return this._marked[v]
  }
}

class DepthFirstPaths {
  constructor(G, s) {
    this.marked = []
    this.edgeTo = []
    this.s = s
    this.dfs(G, s)
  }

  dfs(G, v) {
    this.marked[v] = true

    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(G, w)
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v]
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) return null

    const path = []

    for (let x = v; x != this.s; x = this.edgeTo[x]) {
      path.push(x)
    }

    path.push(this.s)

    return path
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

const graph = new Graph([+V, +E, lines])
// console.log(graph.adj(0))
// console.log(graph.toString())

const testSearch = (G, s) => {
  const search = new DepthFirstSearch(G, s)

  let str = ''
  for (let v = 0; v < G.V(); v++) {
    if (search.marked(v)) str += v + ' '
  }
  console.log(str)
}

const testPath = (G, s) => {
  const search = new DepthFirstPaths(G, s)
  for (let v = 0; v < G.V(); v++) {
    let str = ''
    if (!search.hasPathTo(v)) continue
    for (const x of search.pathTo(v)) {
      if (x === s) str += x
      else str += '-' + x
    }
    console.log(str)
    str = ''
  }
}

class BreadthFirstSearch {
  constructor(G, s) {
    this.marked = []
    this.edgeTo = []

    this.s = s
    this.bfs(G, s)
  }

  bfs(G, s) {
    const queue = []

    this.marked[v] = true
    queue.unshift(s)

    while (queue.length) {
      const v = queue.shift()
      for (const w of G.adj(v)) {
        if (!this.marked[w]) {
          this.edgeTo[w] = v
          this.marked[w] = true
          queue.push(w)
        }
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v]
  }

  pathTo(v) {
    if (!this.hasPathTo(v)) return null

    const path = []

    for (let x = v; x != this.s; x = this.edgeTo[x]) {
      path.push(x)
    }

    path.push(this.s)

    return path
  }
}

// testSearch(graph, 0)
// testPath(graph, 0)

class Cycle {
  marked = []
  _hasCycle = false

  constructor(G) {
    for (let s = 0; s < G.V(); s++) {
      if (!this.marked[s]) {
        this.dfs(G, s, s)
      }
    }
  }

  dfs(G, v, u) {
    this.marked[v] = true

    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w, v)
      } else if (w !== u) this._hasCycle = true
    }
  }

  hasCycle() {
    return this._hasCycle
  }
}

class TwoColor {
  marked = []
  color = []
  isTwoColorable = true

  constructor(G) {
    for (let s = 0; s < G.V(); s++) {
      if (!this.marked[s]) this.dfs(G, s)
    }
  }

  dfs(G, v) {
    this.marked[v] = true
    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.color[w] = !this.color[v]
        this.dfs(G, w)
      } else if (this.color[w] === this.color[v]) this.isTwoColorable = false
    }
  }
}
