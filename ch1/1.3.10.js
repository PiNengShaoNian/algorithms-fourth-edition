const stack = []

const prec = {
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  '(': 1,
}

const infixToPostfix = (infixexpr) => {
  const opStack = []
  const postfixList = []
  const tokenList = [...infixexpr]

  for (let token of tokenList) {
    if (/^\w$/.test(token)) {
      postfixList.push(token)
    } else if (token === '(') {
      opStack.push(token)
    } else if (token === ')') {
      topToken = opStack.pop()
      while (topToken !== '(') {
        postfixList.push(topToken)
        topToken = opStack.pop()
      }
    } else {
      while (stack.length && prec[opStack[opStack.length - 1]] >= prec[token]) {
        postfixList.push(opStack.pop())
      }
      opStack.push(token)
    }
  }

  while (stack.length) {
    postfixList.push(opStack.pop())
  }

  return postfixList.join(' ')
}

const result = infixToPostfix('1+2*3-4/2+(1+4)')
console.log(result)
