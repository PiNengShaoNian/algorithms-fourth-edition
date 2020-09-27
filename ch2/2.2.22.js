class Merge {
  sort(a) {
    const aux = []
    this._sort(a, aux, 0, a.length - 1)
    return a
  }

  _sort(a, aux, lo, hi) {
    if (hi <= lo) return
    let m1 = Math.floor(lo + (hi - lo) / 2)
    let m2 = Math.floor(m1 + 1 + (hi - m1 - 1) / 2)

    this._sort(a, aux, lo, m1)
    this._sort(a, aux, m1 + 1, m2)
    this._sort(a, aux, m2 + 1, hi)

    this.merge(a, aux, lo, m1, m2, hi)
  }

  merge(a, aux, lo, m1, m2, hi) {
    for (let k = lo; k <= hi; k++) aux[k] = a[k]

    let aIndex = lo
    let bIndex = m1 + 1
    let cIndex = m2 + 1

    let A, B, C

    const maxValue = Number.MAX_SAFE_INTEGER
    for (let k = lo; k <= hi; k++) {
      if (aIndex <= m1) A = aux[aIndex]
      else A = maxValue
      if (bIndex <= m2) B = aux[bIndex]
      else B = maxValue
      if (cIndex <= hi) C = aux[cIndex]
      else C = maxValue

      if (this.less(A, B) && this.less(A, C)) {
        a[k] = A
        aIndex++
      } else if (this.less(B, A) && this.less(B, C)) {
        a[k] = B
        bIndex++
      } else if (this.less(C, A) && this.less(C, B)) {
        a[k] = C
        cIndex++
      } else {
        a[k] = A
        aIndex++
      }
    }
  }

  less(a, b) {
    return a < b
  }
}

console.log(new Merge().sort([5, 4, 3, 2, 1]))
