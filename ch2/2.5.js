class Quick {
  sort(a) {
    this._sort(a, 0, a.length - 1)
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return
    const j = partition(a, lo, hi)
    this._sort(a, lo, j - 1)
    this._sort(a, j + 1, hi)
  }
}

class Quick3way {
  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  sort(a) {
    this._sort(a, 0, a.length - 1)
    return a
  }
  _sort(a, lo, hi) {
    if (hi <= lo) return

    let lt = lo,
      i = lo + 1,
      gt = hi
    const v = a[lo]
    while (i <= gt) {
      const cmp = a[i] - v
      if (cmp < 0) this.exch(a, lt++, i++)
      else if (cmp > 0) this.exch(a, i, gt--)
      else i++
    }

    this._sort(a, lo, lt - 1)
    this._sort(a, gt + 1, hi)
  }
}

function _sort(a, lo, hi) {
  if (hi <= lo) return
  let lt = lo,
  i = lo + 1,
  gt = hi

  const v = a[lo]
  while(i <= gt) {
  const cmp = a[i] - v
  if(cmp < 0) {

  }
  else if(cmp > 0) {
    
  }
  }
}

const shuffle = (a) => {
  const uniform = (a, b) => {
    return Math.floor((b - a) * Math.random() + a)
  }
  for (let i = 0; i < a.length - 1; i++) {
    const index = uniform(i + 1, a.length)
    const t = a[i]
    a[i] = a[index]
    a[index] = t
  }

  return a
}
// console.log(shuffle([5, 4, 3, 2, 1]))
console.log(new Quick3way().sort([3, 1, 4, 5, 2]))
// const partition = (a, lo, hi) => {
//   let i = lo,
//     j = hi + 1
//   const v = a[lo]
//   while (true) {
//     while (a[++i] < v) if (i >= hi) break
//     while (a[--j] > v) if (j <= lo) break

//     if (i > j) break
//     const t = a[i]
//     a[i] = a[j]
//     a[j] = t
//   }

//   const t = a[i]

// }
