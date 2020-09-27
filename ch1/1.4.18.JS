const min = (a) => {
  let lo = 1
  let hi = a.length - 2
  let mid
  let localMinIndex = -1

  while (lo <= hi && localMinIndex == -1) {
    mid = Math.floor((lo + hi) / 2)
    console.log({ mid, lo, hi })
    if (a[mid] < a[mid - 1] && a[mid] < a[mid + 1]) {
      localMinIndex = mid
    } else if (a[mid - 1] < a[mid + 1]) {
      hi = mid - 1
    } else if (a[mid - 1] > a[mid + 1]) {
      lo = mid + 1
    }
  }

  lo = 1
  hi = a.length - 2
  while (lo <= hi && localMinIndex === -1) {
    mid = Math.floor((lo + hi) / 2)
    console.log({ mid, lo, hi })
    if (a[mid] < a[mid - 1] && a[mid] < a[mid + 1]) {
      localMinIndex = mid
    } else if (a[mid - 1] < a[mid + 1]) {
      lo = mid + 1
    } else if (a[mid - 1] > a[mid + 1]) {
      hi = mid - 1
    }
  }

  return localMinIndex
}

console.log(min([1, 3, 10, 6, 11, 13, 14, 0]))
 