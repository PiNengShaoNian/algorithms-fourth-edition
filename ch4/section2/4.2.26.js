const Digraph = require('./Digraph')

class TwoSATSolver {
  solve2SAT(formula) {
    const variables = new Set()
    const charsInFormula = [...formula]

    for (let i = 0; i < charsInFormula.length; i++) {
      if (
        charsInFormula[i] != '(' &&
        charsInFormula[i] != ')' &&
        charsInFormula[i] != 'V' &&
        charsInFormula[i] != '^' &&
        charsInFormula[i] != ' ' &&
        charsInFormula[i] != '!'
      ) {
        variables.add(charsInFormula[i])
      }
    }

    const digraph = new Digraph(variables.size * 2)

    const values = formula.split(' ')

    const variableToIdMap = {}
    const idToVariableMap = {}

    for (let i = 0; i < values.length; i += 2) {
      let isVariable1Negation
      let isVariable2Negation
      let variable1
      let variable2
      let variable1Negation
      let variable2Negation

      if (values[i].charAt(1) === '!') {
        variable1 = values[i].substring(2, 3)
        isVariable1Negation = true
      } else {
        variable1 = values[i].charAt(1)
        isVariable1Negation = false
      }
      variable1Negation = '!' + variable1

      i += 2
    }
  }
}
