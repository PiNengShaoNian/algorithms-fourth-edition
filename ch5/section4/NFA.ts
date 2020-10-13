import Digraph from '../../ch4/section2/Digraph'
import DirectedDFS from '../../ch4/section2/DirectedDFS'
import ArrayStack from '../../lib/ArrayStack'
import Bag from '../../lib/Bag'

class NFA {
  protected re: string[]
  protected G: Digraph
  protected M: number

  constructor(regexp: string) {
    const ops = new ArrayStack<number>()
    this.re = [...regexp]
    this.M = this.re.length
    this.G = new Digraph(this.M + 1)

    for (let i = 0; i < this.M; i++) {
      let lp = i
      if (this.re[i] === '(' || this.re[i] === '|') {
        ops.push(i)
      } else if (this.re[i] === ')') {
        let or = ops.pop()!

        if (this.re[or] === '|') {
          lp = ops.pop()!
          this.G.addEdge(lp, or + 1)
          this.G.addEdge(or, i)
        } else lp = or
      }

      if (i < this.M - 1 && this.re[i + 1] === '*') {
        this.G.addEdge(lp, i + 1)
        this.G.addEdge(i + 1, lp)
      }

      if (this.re[i] === '(' || this.re[i] === '*' || this.re[i] === ')')
        this.G.addEdge(i, i + 1)
    }
  }

  recognizes(txt: string): boolean {
    let pc = new Bag<number>()

    let dfs = new DirectedDFS(this.G, 0)

    for (let v = 0; v < this.G.V(); v++) {
      if (dfs.marked(v)) pc.add(v)
    }

    for (let i = 0; i < txt.length; i++) {
      const match = new Bag<number>()
      for (const v of pc) {
        if (v < this.M) {
          if (this.re[v] === txt[i] || this.re[v] === '.') {
            match.add(v + 1)
          }
        }
      }
      pc = new Bag<number>()
      dfs = new DirectedDFS(this.G, match)

      for (let v = 0; v < this.G.V(); v++) {
        if (dfs.marked(v)) pc.add(v)
      }
    }

    for (const v of pc) if (v == this.M) return true

    return false
  }
}

export default NFA
