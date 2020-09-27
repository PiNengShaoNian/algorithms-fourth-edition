const indirectSort = (a) => {
  const index = []

  for (let i = 0; i < a.length; i++) index[i] = i

  for (let i = 0; i < a.length; i++) {
    for (let j = i; j > 0 && a[index[j]] < a[index[j - 1]]; j--) {
      const t = index[j]
      index[j] = index[j - 1]
      index[j - 1] = t
    }
  }

  return index
}

console.log(indirectSort([3, 2, 1]))
