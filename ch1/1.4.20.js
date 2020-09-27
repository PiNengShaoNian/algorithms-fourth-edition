const localMax = (a) => {
  let low = 0
  let high = a.length - 1

  while (low < high) {
    const mid = Math.floor(low + high)

    if (a[mid] > a[mid - 1] && a[mid] > a[mid + 1]) {
      return mid
    } else if (a[mid] > a[mid - 1]) {
      low = mid + 1
    } else if (a[mid] < a[mid - 1]) {
      high = mid - 1
    }
  }
}

const find = (a, x) => {
  low = 0
  high = localMax(a)
  while (low < high) {
    const mid = Math.floor(low + high)

    if (a[mid] === x) return mid
    else if (a[mid] < x) low = mid + 1
    else if (a[mid] > x) high = mid - 1
  }
}

console.log(find([0, 1, 3, 5, 7, 9, 10, 8, 6, 4, 2, -1], 9))
