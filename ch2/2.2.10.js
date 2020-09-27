class Merge {
  aux = []
  sort(a) {
    this._sort(a, 0, a.length - 1)
    return a
  }

  merge(a, lo, mid, hi) {
    let i = lo,
      j = hi

    for (let k = lo; k <= hi; k++) {
      this.aux[k] = a[k]
    }

    for (let k = mid + 1; k <= hi; k++) {
      this.aux[k] = a[hi - k + mid + 1]
    }
    for (let k = lo; k <= hi; k++) {
      if (this.less(this.aux[j], this.aux[i])) a[k] = this.aux[j--]
      else a[k] = this.aux[i++]
    }
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return
    const mid = Math.floor(lo + (hi - lo) / 2)

    this._sort(a, lo, mid)
    this._sort(a, mid + 1, hi)

    this.merge(a, lo, mid, hi)
  }

  less(a, b) {
    return a < b
  }
}

console.log(new Merge().sort([5, 4, 3, 2, 1]))
