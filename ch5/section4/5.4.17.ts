import DirectedDFS from '../../ch4/section2/DirectedDFS'
import Bag from '../../lib/Bag'
import RegularExpressionMatcher from './RegularExpressionMatcher'

class RegularExpressionMatcherWildcard extends RegularExpressionMatcher {
  constructor(regularExpressionString: string) {
    super(regularExpressionString)
  }

  recognizes(text: string): boolean {
    let allPossibleStates = new Bag<number>()
    let directedDFS = new DirectedDFS(this.digraph, 0)

    for (let vertex = 0; vertex < this.digraph.V(); vertex++) {
      if (directedDFS.marked(vertex)) {
        allPossibleStates.add(vertex)
      }
    }

    for (let i = 0; i < text.length; i++) {
      const states = new Bag<number>()

      for (const vertex of allPossibleStates) {
        if (vertex < this.numberOfStates) {
          if (
            this.regularExpression[vertex] === text[i] ||
            this.regularExpression[vertex] === '.'
          ) {
            states.add(vertex + 1)
          }
        }
      }

      allPossibleStates = new Bag<number>()
      directedDFS = new DirectedDFS(this.digraph, states)

      for (let vertex = 0; vertex < this.digraph.V(); vertex++) {
        if (directedDFS.marked(vertex)) {
          allPossibleStates.add(vertex)
        }
      }

      if (allPossibleStates.size() === 0) {
        return false
      }
    }
    for (const vertex of allPossibleStates)
      if (vertex === this.numberOfStates) return true

    return false
  }
}

const wildcardMatcher = new RegularExpressionMatcherWildcard('.*NEEDLE.*')

debugger
console.log(wildcardMatcher.recognizes('AANEEDLEsdfsa'))
