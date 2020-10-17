import Digraph from '../../ch4/section2/Digraph'
import DirectedDFS from '../../ch4/section2/DirectedDFS'
import Bag from '../../lib/Bag'
import SeparateChainingHashTable from '../../lib/SeparateChainingHashTable'
import ArrayStack from '../../lib/Stack'

class RangeComplement {
  constructor(public leftCharacter: string, public rightCharacter: string) {}
}

class RegularExpressionMatcherComplement {
  private regularExpression: string[]
  private digraph: Digraph
  private numberOfStates: number

  private setsMatchMap: SeparateChainingHashTable<number, number>
  private setsComplementMap: SeparateChainingHashTable<number, Set<string>>
  private setsComplementRangesMap: SeparateChainingHashTable<
    number,
    RangeComplement[]
  >

  constructor(regularExpressionString: string) {
    const operators = new ArrayStack<number>()
    this.regularExpression = [...regularExpressionString]
    this.numberOfStates = this.regularExpression.length

    this.setsMatchMap = new SeparateChainingHashTable()
    this.setsComplementMap = new SeparateChainingHashTable()
    this.setsComplementRangesMap = new SeparateChainingHashTable()

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
        leftOperator = this.handleRightParenthesis(operators, i)
      } else if (this.regularExpression[i] === ']') {
        leftOperator = operators.pop()!

        this.handleSets(leftOperator, i)
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

  handleSets(leftSquareBracket: number, index: number): void {
    let isComplementSet = false

    let charactersToComplement: Set<string> | null = null
    let rangesToComplement: RangeComplement[] | null = null

    if (this.regularExpression[leftSquareBracket + 1] === '^') {
      isComplementSet = true
      leftSquareBracket++
      charactersToComplement = new Set()
      rangesToComplement = []

      for (
        let indexInsideBrackets = leftSquareBracket + 1;
        indexInsideBrackets < index;
        indexInsideBrackets++
      ) {
        if (this.regularExpression[indexInsideBrackets + 1] === '-') {
          const leftCharacter = this.regularExpression[indexInsideBrackets]
          const rightCharacter = this.regularExpression[indexInsideBrackets + 2]

          rangesToComplement.push(
            new RangeComplement(leftCharacter, rightCharacter)
          )
          indexInsideBrackets += 2
        } else {
          charactersToComplement.add(
            this.regularExpression[indexInsideBrackets]
          )
        }
      }

      for (
        let indexInsideBrackets = leftSquareBracket + 1;
        indexInsideBrackets < index;
        indexInsideBrackets++
      ) {
        this.digraph.addEdge(leftSquareBracket, indexInsideBrackets)
        this.setsMatchMap.put(indexInsideBrackets, index)

        if (isComplementSet) {
          this.setsComplementMap.put(
            indexInsideBrackets,
            charactersToComplement
          )
          if (rangesToComplement.length > 0) {
            this.setsComplementRangesMap.put(
              indexInsideBrackets,
              rangesToComplement
            )
          }
        }

        if (this.regularExpression[indexInsideBrackets + 1] === '-') {
          indexInsideBrackets += 2
        }
      }
    }
  }

  handleRightParenthesis(operators: ArrayStack<number>, index: number): number {
    const orOperatorIndexes = new Set<number>()

    while (this.regularExpression[operators.peek()!] === '|') {
      const or = operators.pop()!
      orOperatorIndexes.add(or)
    }

    const leftOperator = operators.pop()!

    for (const orOperatorIndex of orOperatorIndexes.keys()) {
      this.digraph.addEdge(orOperatorIndex, index)
      this.digraph.addEdge(leftOperator, orOperatorIndex + 1)
    }

    return leftOperator
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
          if (this.setsMatchMap.contains(vertex)) {
            this.recognizeSet(text, i, vertex, states)
          } else if (
            this.regularExpression[vertex] === text[i] ||
            this.regularExpression[vertex] === '.'
          ) {
            states.add(vertex + 1)
          }
        }
      }

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

    for (const vertex of allPossibleStates) {
      if (vertex === this.numberOfStates) return true
    }

    return false
  }

  private recognizeSet(
    text: string,
    index: number,
    vertex: number,
    states: Bag<number>
  ): void {
    const indexOfRightSquareBracket = this.setsMatchMap.get(vertex)!

    if (this.regularExpression[vertex + 1] === '-') {
      const leftRangeIndex = this.regularExpression[vertex]
      const rightRangeIndex = this.regularExpression[vertex + 2]

      if (leftRangeIndex <= text[index] && text[index] <= rightRangeIndex) {
        if (!this.isCharPartOfComplementSet(text, index, vertex)) {
          states.add(indexOfRightSquareBracket)
        }
      } else if (
        this.setsComplementMap.contains(vertex) &&
        !this.isCharPartOfComplementSet(text, index, vertex)
      ) {
        states.add(indexOfRightSquareBracket)
      }
    } else if (
      this.regularExpression[vertex] === text[index] ||
      this.regularExpression[vertex] === '.'
    ) {
      if (!this.isCharPartOfComplementSet(text, index, vertex)) {
        states.add(indexOfRightSquareBracket)
      }
    } else if (
      this.setsComplementMap.contains(vertex) &&
      !this.isCharPartOfComplementSet(text, index, vertex)
    ) {
      states.add(indexOfRightSquareBracket)
    }
  }

  private isCharPartOfComplementSet(
    text: string,
    index: number,
    vertex: number
  ): boolean {
    if (
      this.setsComplementMap.contains(vertex) &&
      this.setsComplementMap.get(vertex)!.has(text[index])
    ) {
      return true
    }

    if (this.setsComplementRangesMap.contains(vertex)) {
      for (const rangeComplement of this.setsComplementRangesMap.get(vertex)!) {
        if (
          rangeComplement.leftCharacter <= text[index] &&
          text[index] <= rangeComplement.rightCharacter
        ) {
          return true
        }
      }
    }

    return false
  }
}

const regularExpressionMatcherComplement1 = new RegularExpressionMatcherComplement(
  'RENE[^ABC]'
)

debugger
console.log(regularExpressionMatcherComplement1.recognizes('RENEA'))
