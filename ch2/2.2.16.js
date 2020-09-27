class Merge {
  sort(a) {
    let N = a.length
    if (N <= 1) return
    const aux = []
    let lo = 0
    let sp = -1
    let hi = 0
    while (!(lo === 0 && sp === N - 1)) {
      lo = 0
      while (lo < N - 1) {
        sp = this.findAscIndex(a, lo)
        hi = this.findAscIndex(a, sp + 1)
        if (sp === hi) {
          break
        } else {
          this.merge(a, aux, lo, sp, hi)
          lo = hi + 1
        }
      }
    }

    return a
  }

  findAscIndex(a, lo) {
    let N = a.length
    if (lo === N - 1) return lo
    else if (lo > N - 1) return lo - 1
    let i
    for (i = lo + 1; i < N && !this.less(a[i], a[i - 1]); i++);
    return i - 1
  }

  less(a, b) {
    return a < b
  }

  merge(a, aux, lo, sp, hi) {
    for (let k = lo; k <= hi; k++) aux[k] = a[k]

    let i = lo
    let j = sp + 1
    for (let k = lo; k <= hi; k++) {
      if (i > sp) a[k] = aux[j++]
      else if (j > hi) a[k] = aux[i++]
      else if (this.less(a[i], a[j])) a[k] = aux[i++]
      else a[k] = aux[j++]
    }
  }
}

console.log(new Merge().sort([5, 4, 3, 2, 1]))
