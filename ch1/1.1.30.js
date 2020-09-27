const makeArray = (n) => {
  const result = Array.from({ length: n }, () => [])
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (gcd(i, j) === 1) {
        result[i][j] = true
      } else {
        result[i][j] = false
      }
    }
  }

  return result
}

const gcd = (p, q) => {
  let r
  if (q === 0) return 1
  while ((r = p % q) !== 0) {
    p = q
    q = r
  }

  return q
}

const result = makeArray(3)

console.log(result)
