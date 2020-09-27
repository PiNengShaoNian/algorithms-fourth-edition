const rank = (a, key) => {
  let fn = 1
  let fn1 = 1
  while (fn < a.length) {
    fn = fn + fn1
    fn1 = fn - fn1
  }

  let lo = 0
  let hi = a.length - 1
  let mid

  while (lo <= hi) {
    mid = lo + (fn - fn1) - 1
    console.log({
      fn,
      fn1,
      mid,
      lo,
      hi,
    })
    if (key < a[mid]) {
      fn = fn - fn1
      fn1 = fn1 - fn
      hi = mid - 1
    } else if (key > a[mid]) {
      lo = mid + 1
      fn1 = fn - fn1
      fn = fn - fn1
    } else return mid
  }

  return -1
}

console.log(
  rank(
    Array.from({ length: 10000 }, (_, i) => i),
    45
  )
)
