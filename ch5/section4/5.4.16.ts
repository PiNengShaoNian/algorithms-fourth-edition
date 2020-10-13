import Digraph from '../../ch4/section2/Digraph'
import ArrayStack from '../../lib/Stack'
import RegularExpressionMatcher from './RegularExpressionMatcher'

class RegularExpressionMatcherMultiwayOr extends RegularExpressionMatcher {
  constructor(regularExpressionString: string) {
    super(regularExpressionString)

    const operators = new ArrayStack<number>()
    this.regularExpression = [...regularExpressionString]
    this.numberOfStates = this.regularExpression.length

    this.digraph = new Digraph(this.numberOfStates + 1)

    for (let i = 0; i < this.numberOfStates; i++) {
      let leftParenthesis = i

      if (
        this.regularExpression[i] === '(' ||
        this.regularExpression[i] === '|'
      ) {
        operators.push(i)
      } else if (this.regularExpression[i] === ')') {
        const orOperatorIndexes = new Set<number>()

        while (this.regularExpression[operators.peek()!] === '|') {
          const or = operators.pop()!
          orOperatorIndexes.add(or)
        }

        leftParenthesis = operators.pop()!

        for (let orOperatorIndex of orOperatorIndexes.keys()) {
          this.digraph.addEdge(orOperatorIndex, i)
          this.digraph.addEdge(leftParenthesis, orOperatorIndex + 1)
        }
      }

      if (
        i < this.numberOfStates - 1 &&
        this.regularExpression[i + 1] === '*'
      ) {
        this.digraph.addEdge(leftParenthesis, i + 1)
        this.digraph.addEdge(i + 1, leftParenthesis)
      }

      if (
        this.regularExpression[i] === '(' ||
        this.regularExpression[i] === '*' ||
        this.regularExpression[i] === ')'
      ) {
        this.digraph.addEdge(i, i + 1)
      }
    }
  }
}

const multiwayOr = new RegularExpressionMatcherMultiwayOr('(A|B)(C|D)*')

debugger
console.log(multiwayOr.recognizes('ACCD'))

console.log((() => true)())
