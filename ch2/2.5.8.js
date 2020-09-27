class Quick {
  partiton(a, lo, hi) {
    let j = hi + 1,
      i = lo

    const v = a[lo]

    while (true) {
      while (this.less(a[++i], v)) if (i === hi) break
      while (this.less(v, a[--j])) if (j === lo) break

      if (i >= j) break

      this.exch(a, i, j)
    }

    this.exch(a, lo, j)

    return j
  }

  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  less(a, b) {
    if (typeof a === 'number') {
      return a < b
    } else return a.compareTo(b) < 0
  }

  sort(a) {
    this.shuffle(a)
    this._sort(a, 0, a.length - 1)

    return a
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return

    const j = this.partiton(a, lo, hi)

    this._sort(a, lo, j - 1)
    this._sort(a, j + 1, hi)
  }

  select(a, k) {
    return this._select(a, k, 0, a.length - 1)
  }

  _select(a, k, lo, hi) {
    if (hi <= lo) return a[lo]

    const j = this.partiton(a, lo, hi)

    if (j > k) {
      return this._select(a, k, lo, j - 1)
    } else if (j < k) {
      return this._select(a, k, j + 1, hi)
    }

    return a[j]
  }

  shuffle = (a) => {
    for (let i = 0; i < a.length - 1; i++) {
      const index = Math.floor((a.length - i - 1) * Math.random() + i + 1)
      const t = a[index]
      a[index] = a[i]
      a[i] = t
    }
    return a
  }

  select1(a, k) {
    this.shuffle(a)
    let lo = 0,
      hi = a.length - 1

    while (true) {
      const j = this.partiton(a, lo, hi)

      if (j > k) {
        hi = j - 1
      } else if (j < k) {
        lo = j + 1
      } else return a[j]
    }
  }
}

const frequency = (a) => {
  new Quick().sort(a)

  const record = []
  debugger

  for (let i = 0; i < a.length; i++) {
    const v = a[i]
    let count = 1
    while (v === a[++i]) {
      count++
    }

    i--

    record.push(count)
  }

  return new Quick().sort(record)
}

module.exports = Quick
