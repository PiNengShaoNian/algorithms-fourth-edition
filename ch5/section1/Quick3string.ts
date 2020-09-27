class Quick3string {
  static charAt(s: string, d: number): number {
    if (d > s.length - 1) return -1
    return s.charCodeAt(d)
  }

  static sort(a: string[]) {
    this._sort(a, 0, a.length - 1, 0)

    return a
  }
  static exch(a: any[], i: number, j: number) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  static _sort(a: string[], lo: number, hi: number, d: number) {
    if (lo >= hi) return

    const v = this.charAt(a[lo], d)
    let lt = lo
    let gt = hi
    let i = lo + 1

    while (i <= gt) {
      const t = this.charAt(a[i], d)

      if (t < v) this.exch(a, i++, lt++)
      else if (t > v) {
        this.exch(a, gt--, i)
      } else i++
    }

    this._sort(a, lo, lt - 1, d)
    if (v >= 0) this._sort(a, lt, gt, d + 1)
    this._sort(a, gt + 1, hi, d)
  }
}

console.log(Quick3string.sort(['b', 'a', 'c']))
