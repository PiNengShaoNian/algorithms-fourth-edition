const farest = (a) => {
  let minIndex = 0
  let maxIndex = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] < a[minIndex]) {
      minIndex = i
    } else if (a[i] > a[maxIndex]) {
      maxIndex = i
    }
  }

  return [minIndex, maxIndex]
}

console.log(farest([1, 2, 3, 4, 5, 100, 1, 2, 3, 10000, -1]))
