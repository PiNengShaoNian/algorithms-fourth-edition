class Quick {
  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  sort(a) {
    shuffle(a)
    let maxIndex = 0
    for (let i = 0; i < a.length; i++) {
      if (a[maxIndex] < a[i]) {
        maxIndex = i
      }
    }
    this.exch(a, maxIndex, a.length - 1)
    this._sort(a, 0, a.length - 1)
    return a
  }

  portition = (a, lo, hi) => {
    let i = lo,
      j = hi + 1

    const v = a[lo]
    while (true) {
      while (a[++i] < v);
      while (a[--j] > v);
      if (i >= j) break
      this.exch(a, i, j)
    }

    this.exch(a, j, lo)

    return j
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return
    const j = this.portition(a, lo, hi)
    this._sort(a, lo, j - 1)
    this._sort(a, j + 1, hi)
  }
}

const shuffle = (a) => {
  for (let i = 0; i < a.length - 1; i++) {
    const index = Math.floor((a.length - i - 1) * Math.random() + i + 1)
    const t = a[index]
    a[index] = a[i]
    a[i] = t
  }
}

console.log(new Quick().sort([3, 2, 1]))
