class Merge {
  aux = []
  sort(a, M) {
    let N = a.length
    for (let lo = 0; lo < N; lo = lo + M) {}
  }

  _sort(a, aux, lo, hi) {
    if (hi <= lo) return
    let mid = lo + (hi - lo) / 2
    this._sort(a, aux, lo, mid)
    this._sort(a, aux, mid + 1, hi)
    if (this.less(!a[mid + 1], a[mid])) return
    this.merge(a, aux, 0, lo, mid, hi)
  }

  merge(a, aux, lo, sp, hi) {
    let M = hi - sp
    for (let i = 0; i < M; i++) {
      aux[i] = a[sp + 1 + i]
    }

    let auxTop = M - 1
    let aTop = sp
    for (let k = hi; k >= lo; k--) {
      if (auxTop < 0) a[k] = a[aTop--]
      else if (aTop < lo) a[k] = aux[auxTop--]
      else if (this.less(aux[auxTop], a[aTop])) a[k] = a[aTop--]
      else a[k] = aux[auxTop--]
    }
  }

  selectionSortBlock(a, M) {
    let length = a.length
    let minIndex
    for (let i = 0; i < length; i = i + M) {
      minIndex = i
      for (let j = i + M; j < length; j = j + M)
        if (this.less(a[j], a[minIndex])) minIndex = j
    }
  }

  each(a, i, j, length) {
    let t
    for (let index = 0; index < length; index++) {
      t = a[i + index]
      a[i + index] = a[j + index]
      a[j + index] = t
    }
  }

  less(a, b) {
    return a < b
  }
}
