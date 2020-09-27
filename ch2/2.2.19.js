const count = (a) => {
  let N = a.length
  let j
  let count = 0

  for (let i = 0; i < N; i++) {
    j = i
    while (j--) {
      if (a[i] < a[j]) count++
    }
  }

  return count
}

