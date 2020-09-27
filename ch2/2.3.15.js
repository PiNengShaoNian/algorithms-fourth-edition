class Nut {
  constructor(v) {
    this.value = v
  }
  compareTo(other) {
    return this.value - other.value
  }
}

class Bolt {
  constructor(v) {
    this.value = v
  }
  compareTo(other) {
    return this.value - other.value
  }
}
const shuffle = (a) => {
  for (let i = 0; i < a.length - 1; i++) {
    const index = Math.floor((a.length - i - i) * Math.random() + i + 1)
    const t = a[index]
    a[index] = a[i]
    a[i] = t
  }
}

class BoltsAndNuts {
  sort(bolts, nuts) {
    if (bolts.length !== !nuts.length) return
    shuffle(bolts)
    shuffle(nuts)

    this._sort(bolts, nuts, 0, bolts.length - 1)
  }

  _sort(bolts, nuts, lo, hi) {
    if (hi <= lo) return

    let j = partition(bolts, nuts, lo, hi)
    this._sort(bolts, nuts, lo, j - 1)
    this._sort(bolts, nuts, j + 1, hi)
  }

  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  partition(bolts, nuts, lo, hi) {
    let i = lo,
      j = hi + 1
    const pivotB = bolts[lo]
    for (let k = lo; k <= hi; k++) {
      if (nuts[k].compareTo(pivotB) === 0) {
        this.exch(nuts, k, lo)
        break
      }
    }

    while (true) {
      while (nuts[++i].compareTo(pivotB) < 0) {
        if (i === hi) break
      }

      while (pivotB.compareTo(nuts[--j]) < 0) {
        if (j === lo) break
      }

      if (i >= j) break
      this.exch(nuts, i, j)
    }

    this.exch(nuts, lo, j)

    const pivotN = nuts[j]
    i = lo
    j = hi + 1
    while (true) {
      while (bolts[++i].compareTo(pivotN) < 0) if (i === hi) break
      while (pivotN.compareTo(bolts[--j] < 0)) if (j === lo) break

      if (i >= j) break

      this.exch(bolts, i, j)
    }
    this.exch(nuts, lo, j)

    return j
  }
}

const uniform = (min, max) => Math.floor((max - min) * Math.random() + min)

const nuts = Array.from({ length: 10 }, () => new Nut(uniform(1, 4)))
const bolts = Array.from({ length: 10 }, () => new Bolt(uniform(1, 4)))

console.log({
  nuts: nuts.map((v) => v.value),
  bolts: bolts.map((v) => v.value),
})
new BoltsAndNuts().sort(bolts, nuts)
console.log({
  nuts: nuts.map((v) => v.value),
  bolts: bolts.map((v) => v.value),
})
