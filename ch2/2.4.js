class Merge {
  aux = []

  less(a, b) {
    return a < b
  }
  merge(a, lo, mid, hi) {
    let i = lo,
      j = mid + 1

    console.log({
      lo,
      hi,
      mid,
      len: hi - lo + 1,
    })

    for (let k = lo; k <= hi; k++) {
      this.aux[k] = a[k]
    }

    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = this.aux[j++]
      else if (j > hi) a[k] = this.aux[i++]
      else if (this.less(this.aux[j], this.aux[i])) a[k] = this.aux[j++]
      else a[k] = this.aux[i++]
    }
  }

  _sort(a, lo, hi) {
    debugger
    if (hi <= lo) return
    let mid = Math.floor(lo + (hi - lo) / 2)
    this._sort(a, lo, mid)
    this._sort(a, mid + 1, hi)
    this.merge(a, lo, mid, hi)
  }

  sort(a) {
    this._sort(a, 0, a.length - 1)

    return a
  }
}

class MergeBU {
  aux = []

  merge(a, lo, mid, hi) {
    let i = lo,
      j = mid + 1

    for (let k = lo; k <= hi; k++) {
      this.aux[k] = a[k]
    }

    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = this.aux[j++]
      else if (j > hi) a[k] = this.aux[i++]
      else if (this.less(this.aux[j], this.aux[i])) a[k] = this.aux[j++]
      else a[k] = this.aux[i++]
    }
  }

  less(a, b) {
    return a < b
  }

  sort(a) {
    let N = a.length
    for (let sz = 1; sz < N; sz = sz + sz) {
      for (let lo = 0; lo < N - sz; lo += sz + sz) {
        this.merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1))
      }
    }

    return a
  }
}

const length = 39
console.log(new Merge().sort(Array.from({ length }, (_, i) => length - i)))
console.log('--------------------------------')
console.log(new MergeBU().sort(Array.from({ length }, (_, i) => length - i)))
