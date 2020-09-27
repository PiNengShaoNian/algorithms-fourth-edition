class Quick3way {
  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  sort(a, lo, hi) {
    if (hi <= lo) return
    let lt = lo,
      i = lo + 1,
      gt = hi

    const v = a[lo]

    while (i <= gt) {
      const com = a[i] - v
      if (v > 0) {
        this.exch(a, i++, gt--)
      } else if (v < 0) {
        this.exch(a, i, lt--)
      } else i++
    }
  }
}
