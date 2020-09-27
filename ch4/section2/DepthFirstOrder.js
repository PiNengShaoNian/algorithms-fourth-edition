class DepthFirstOrder {
  marked = []
  _pre = []
  _post = []
  _reversePost = []

  constructor(G) {
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(G, v)
      }
    }
  }

  dfs(G, v) {
    this._pre.unshift(v)
    this.marked[v] = true

    for (const w of G.adj(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w)
      }
    }

    this._post.unshift(v)
    this._reversePost.push(v)
  }

  pre() {
    return this._pre
  }

  post() {
    return this._post
  }

  reversePost() {
    return this._reversePost
  }
}

module.exports = DepthFirstOrder
