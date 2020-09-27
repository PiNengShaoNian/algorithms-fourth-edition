const twoSumFaster = (a) => {
  let i = 0
  let j = a.length - 1
  let cnt = 0
  let sum
  while (i < j) {
    sum = a[i] + a[j]
    if (sum === 0) {
      i++
      j--
      cnt++
    } else if (sum > 0) {
      j--
    } else {
      i++
    }
  }

  return cnt
}

const a = Array.from({ length: 10 }, (_, i) => i - 3)
// console.log(a)
// console.log(twoSumFaster(a))

const threeSumFaster = (a) => {
  let j
  let k
  let cnt = 0
  let sum

  for (let i = 0; i < a.length; i++) {
    j = i + 1
    k = a.length - 1
    while (j < k) {
      sum = a[i] + a[j] + a[k]
      if (sum === 0) {
        j++
        k--
        cnt++
      } else if (sum > 0) {
        k--
      } else {
        j++
      }
    }
  }
}
