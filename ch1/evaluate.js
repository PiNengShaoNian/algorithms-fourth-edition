const evaluate = (args) => {
  const ops = []
  const vals = []
  while (args.length) {
    const s = args[0] === 's' ? 'sqrt' : args[0]
    args = args.slice(s.length)
    if (s === '(');
    else if (s === '+') ops.push(s)
    else if (s === '-') ops.push(s)
    else if (s === '*') ops.push(s)
    else if (s === '/') ops.push(s)
    else if (s === 'sqrt') ops.push(s)
    else if (s === ')') {
      const op = ops.pop()
      let v = vals.pop()
      if (op === '+') v = vals.pop() + v
      else if (op === '-') v = vals.pop() - v
      else if (op === '*') v = vals.pop() * v
      else if (op === '/') v = vals.pop() / v
      else if (op === 'sqrt') v = Math.sqrt(v)
      vals.push(v)
    } else vals.push(+s)
  }

  console.log(vals.pop())
}

evaluate('(1+((2+3)*(4*5)))')
