class QuickBest {
  best(n) {
    const a = []
    for (let i = 0; i < n; i++) {
      a[i] = i
    }

    this._best(a, 0, n - 1)
    return a
  }

  _best(a, lo, hi) {
    if (hi <= lo) return
    let mid = Math.floor(lo + (hi - lo) / 2)
    this._best(a, lo, mid - 1)
    this._best(a, mid + 1, hi)
    const t = a[mid]
    a[mid] = a[lo]
    a[lo] = t
  }
}

console.log(new QuickBest().best(5))
