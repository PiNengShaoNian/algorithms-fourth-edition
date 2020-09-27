const hashCodeFunction = (a, k, m) => {
  return (a * k) % m
}

const perfectHashFunction = () => {
  const values = []
  const letterValues = [19, 5, 1, 18, 3, 8, 24, 13, 16, 12]

  for (let m = 2; m <= 100; m++) {
    for (let a = 1; a < 1000; a++) {
      const hashes = new Set()

      for (let i = 0; i < letterValues.length; i++) {
        const hash = hashCodeFunction(a, letterValues[i], m)
        hashes.add(hash)
      }

      if (hashes.size === 10) {
        values[0] = a
        values[1] = m
        return values
      }
    }
  }

  return null
}

console.log(perfectHashFunction())
