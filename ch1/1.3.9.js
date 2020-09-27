let str = '1+2)*3-4)*5-6)))'
const stack = []
while (str.length) {
  const s = str[0]
  str = str.slice(1)
  if (s === ')') {
    const num1 = stack.pop()
    const operator = stack.pop()
    const num2 = stack.pop()
    stack.push('(' + num1 + operator + num2 + ')')
  } else {
    stack.push(s)
  }
}

console.log(stack)