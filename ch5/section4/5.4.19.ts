import Digraph from '../../ch4/section2/Digraph'
import DirectedDFS from '../../ch4/section2/DirectedDFS'
import Bag from '../../lib/Bag'
import SeparateChainingHashTable from '../../lib/SeparateChainingHashTable'
import ArrayStack from '../../lib/Stack'
import RegularExpressionMatcher from './RegularExpressionMatcher'

class RegularExpressionMatcherSpecifiedSet extends RegularExpressionMatcher {
  constructor(regularExpressionString: string) {
    super(regularExpressionString)

    const operators = new ArrayStack<number>()
    this.regularExpression = [...regularExpressionString]
    this.numberOfStates = this.regularExpression.length

    this.setsMatchMap = new SeparateChainingHashTable()

    this.digraph = new Digraph(this.numberOfStates + 1)

    for (let i = 0; i < this.numberOfStates; i++) {
      let leftOperator = i

      if (
        this.regularExpression[i] === '(' ||
        this.regularExpression[i] === '|' ||
        this.regularExpression[i] === '['
      ) {
        operators.push(i)
      } else if (this.regularExpression[i] === ')') {
        const orOperatorIndexes = new Set<number>()

        while (this.regularExpression[operators.peek()!] === '|') {
          const or = operators.pop()!
          orOperatorIndexes.add(or)
        }

        leftOperator = operators.pop()!

        for (const orOperatorIndex of orOperatorIndexes.keys()) {
          this.digraph.addEdge(orOperatorIndex, i)
          this.digraph.addEdge(leftOperator, orOperatorIndex + 1)
        }
      } else if (this.regularExpression[i] === ']') {
        leftOperator = operators.pop()!

        for (
          let indexInsideBrackets = leftOperator + 1;
          indexInsideBrackets < i;
          indexInsideBrackets++
        ) {
          this.digraph.addEdge(leftOperator, indexInsideBrackets)

          this.setsMatchMap.put(indexInsideBrackets, i)
        }
      }

      if (i < this.numberOfStates - 1) {
        if (this.regularExpression[i + 1] === '*') {
          this.digraph.addEdge(leftOperator, i + 1)
          this.digraph.addEdge(i + 1, leftOperator)
        } else if (this.regularExpression[i + 1] === '+') {
          this.digraph.addEdge(i + 1, leftOperator)
        }
      }

      if (
        this.regularExpression[i] === '(' ||
        this.regularExpression[i] === '*' ||
        this.regularExpression[i] === ')' ||
        this.regularExpression[i] === '+' ||
        this.regularExpression[i] === '[' ||
        this.regularExpression[i] === ']'
      ) {
        this.digraph.addEdge(i, i + 1)
      }
    }
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
            this.setsMatchMap.contains(vertex) &&
            (this.regularExpression[vertex] === text[i] ||
              this.regularExpression[vertex] === '.')
          ) {
            const indexOfRightSquareBracket = this.setsMatchMap.get(vertex)!
            states.add(indexOfRightSquareBracket)
          } else if (
            this.regularExpression[vertex] === text[i] ||
            this.regularExpression[vertex] === '.'
          ) {
            states.add(vertex + 1)
          }
        }
      }

      console.log(this.setsMatchMap.keys())
      allPossibleStates = new Bag()
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

const specifiedSet = new RegularExpressionMatcherSpecifiedSet('.*[ABC]Z')

debugger
specifiedSet.recognizes('This is a text AZ')
