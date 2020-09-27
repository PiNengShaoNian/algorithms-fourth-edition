const isClose = (a, b) => {
  return (a === '(' && b === ')') || (a === '[' && b === ']')
}

function parentheses(str) {
  let i = 0
  const stack = []
  for (let x = str[i]; x; x = str[++i]) {
    const last = stack[stack.length - 1]
    if (isClose(last, x)) {
      stack.pop()
    } else {
      stack.push(x)
    }
  }

  if (stack.length) return false
  else return true
}

const result = parentheses('()')
console.log(result)
